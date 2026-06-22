import {
  sendMessageToBot,
  getUserConversations,
} from '../services/chatbotService.js';

export async function sendMessage(req, res) {
  try {
    const { userId, conversationId, content } = req.body;

    const response = await sendMessageToBot({
      userId,
      conversationId,
      content,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: error.message ?? 'Erro ao enviar mensagem.',
    });
  }
}

export async function listConversations(req, res) {
  try {
    const { userId } = req.params;

    const conversations = await getUserConversations(userId);

    return res.status(200).json(conversations);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: error.message ?? 'Erro ao buscar conversas.',
    });
  }
}
