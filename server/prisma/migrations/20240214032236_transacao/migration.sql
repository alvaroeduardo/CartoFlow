/*
  Warnings:

  - Added the required column `input` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idCaixa" TEXT NOT NULL,
    "idCategoria" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "input" BOOLEAN NOT NULL,
    "value" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transacao_idCaixa_fkey" FOREIGN KEY ("idCaixa") REFERENCES "Caixa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transacao_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transacao" ("createdAt", "description", "id", "idCaixa", "idCategoria", "value") SELECT "createdAt", "description", "id", "idCaixa", "idCategoria", "value" FROM "Transacao";
DROP TABLE "Transacao";
ALTER TABLE "new_Transacao" RENAME TO "Transacao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
