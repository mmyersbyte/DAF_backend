-- CreateTable
CREATE TABLE "TaxComparison" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "profession" TEXT NOT NULL,
    "professionId" TEXT NOT NULL,
    "monthlyIncome" DOUBLE PRECISION NOT NULL,
    "monthlyCosts" DOUBLE PRECISION NOT NULL,
    "pfTotalTax" DOUBLE PRECISION NOT NULL,
    "pjTotalTax" DOUBLE PRECISION NOT NULL,
    "pfNetIncome" DOUBLE PRECISION NOT NULL,
    "pjNetIncome" DOUBLE PRECISION NOT NULL,
    "bestOption" TEXT NOT NULL,
    "resultJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxComparison_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaxComparison" ADD CONSTRAINT "TaxComparison_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
