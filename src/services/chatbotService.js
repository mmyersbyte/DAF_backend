import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { prismaInstance } from '../lib/prismaInstance.js';
import { groq } from '../lib/groqClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const systemPrompt = fs.readFileSync(
  path.join(__dirname, '../prompts/systems.txt'),
  'utf-8',
);

export async function sendMessageToBot({ userId, conversationId, content }) {
  if (!userId) {
    throw new Error('userId é obrigatório.');
  }

  if (!content || typeof content !== 'string') {
    throw new Error('Mensagem inválida.');
  }

  const user = await prismaInstance.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user) {
    throw new Error('Usuário não encontrado.');
  }

  let conversation;

  if (conversationId) {
    conversation = await prismaInstance.conversation.findFirst({
      where: {
        id: Number(conversationId),
        userId: Number(userId),
      },
    });

    if (!conversation) {
      throw new Error('Conversa não encontrada para este usuário.');
    }
  } else {
    conversation = await prismaInstance.conversation.create({
      data: {
        userId: Number(userId),
        title: content.slice(0, 50),
      },
    });
  }

  await prismaInstance.message.create({
    data: {
      conversationId: conversation.id,
      sender: 'USER',
      content,
    },
  });

  const conversationMessages = await prismaInstance.message.findMany({
    where: {
      conversationId: conversation.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 20,
  });

  const groqMessages = conversationMessages.map((message) => ({
    role: message.sender === 'BOT' ? 'assistant' : 'user',
    content: message.content,
  }));

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...groqMessages,
    ],
  });

  const botContent = completion.choices[0]?.message?.content ?? 'Sem resposta.';

  const botMessage = await prismaInstance.message.create({
    data: {
      conversationId: conversation.id,
      sender: 'BOT',
      content: botContent,
    },
  });

  return {
    conversationId: conversation.id,
    content: botMessage.content,
  };
}

export async function getUserConversations(userId) {
  if (!userId) {
    throw new Error('userId é obrigatório.');
  }

  const conversations = await prismaInstance.conversation.findMany({
    where: {
      userId: Number(userId),
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  return conversations;
}
