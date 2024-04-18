-- CreateTable
CREATE TABLE "UserAdress" (
    "address" TEXT NOT NULL,
    "address2" TEXT,
    "firstName" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserAdress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAdress_userId_key" ON "UserAdress"("userId");

-- AddForeignKey
ALTER TABLE "UserAdress" ADD CONSTRAINT "UserAdress_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAdress" ADD CONSTRAINT "UserAdress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
