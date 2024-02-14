-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Caixa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cashValue" DECIMAL,
    "sealValue" DECIMAL,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedIn" DATETIME NOT NULL
);
INSERT INTO "new_Caixa" ("createdAt", "finishedIn", "id") SELECT "createdAt", "finishedIn", "id" FROM "Caixa";
DROP TABLE "Caixa";
ALTER TABLE "new_Caixa" RENAME TO "Caixa";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
