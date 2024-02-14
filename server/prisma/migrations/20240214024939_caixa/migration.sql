-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Caixa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cashValue" DECIMAL,
    "sealValue" DECIMAL,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedIn" DATETIME
);
INSERT INTO "new_Caixa" ("cashValue", "closed", "createdAt", "finishedIn", "id", "sealValue") SELECT "cashValue", "closed", "createdAt", "finishedIn", "id", "sealValue" FROM "Caixa";
DROP TABLE "Caixa";
ALTER TABLE "new_Caixa" RENAME TO "Caixa";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
