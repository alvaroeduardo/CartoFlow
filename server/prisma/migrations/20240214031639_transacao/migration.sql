/*
  Warnings:

  - Added the required column `description` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idCaixa" TEXT NOT NULL,
    "idCategoria" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transacao_idCaixa_fkey" FOREIGN KEY ("idCaixa") REFERENCES "Caixa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transacao_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transacao" ("createdAt", "id", "idCaixa", "idCategoria", "value") SELECT "createdAt", "id", "idCaixa", "idCategoria", "value" FROM "Transacao";
DROP TABLE "Transacao";
ALTER TABLE "new_Transacao" RENAME TO "Transacao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
