import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../ui/badge";
import { FiTrash } from "react-icons/fi";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getOpenCaixa } from "@/lib/req";
import { useQuery } from "react-query";

export type Payment = {
    id: string;
    idCaixa: string;
    idCategoria: string;
    description: string;
    input: boolean;
    value: string;
    createdAt: string;
    categoria: {
        id: string;
        title: string;
    };
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "categoria.title",
        header: "Categoria",
        cell: ({ row }) => {
            const type: string = row.getValue("categoria_title");

            return <Badge variant="outline">{type}</Badge>
        }
    },
    {
        accessorKey: "description",
        header: "Descrição",
    },
    {
        accessorKey: "input",
        header: "Tipo",
        cell: ({ row }) => {
            const type = row.getValue("input");

            if (type === true) {
                return <Badge variant="default">Entrada</Badge>
            } else {
                return <Badge variant="destructive">Saída</Badge>
            }

        }
    },
    {
        accessorKey: "value",
        header: () => <div className="text-right">Valor</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("value"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        }
    },

    {
        id: "id",
        accessorKey: "id",
        header: () => <div className="text-right">Deletar</div>,
        cell: ({ row }) => {
            const id: string = row.getValue("id");

            const deletarMovimento = async () => {
                await api.delete(`/transacoes/${id}`)

                window.location.reload()
            }

            return (
                <div className="flex justify-end">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline"><FiTrash /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta ação é irrevercível!
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deletarMovimento()}>Continuar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        }
    },
]
