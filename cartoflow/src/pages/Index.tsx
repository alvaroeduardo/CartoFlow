import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getOpenCaixa, startNewCaixa } from "@/lib/req";
import { FiDollarSign, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import { calcularSaldo, formatarMoeda, somarTransacoesPorTipo } from "@/lib/conversoes";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/colunas";

export function Index() {
    const { data: caixas } = useQuery({ queryFn: getOpenCaixa, queryKey: ['caixas'] });

    return (
        <div className="container mx-auto pt-4">
            <p>Olá seja bem vindo ao <span className="font-semibold">CartoFlow</span>!</p>

            <hr className="mt-4 mb-4" />

            <p className="text-2xl font-semibold">CAIXAS</p>

            <div className="mt-4">
                {
                    !caixas ? (
                        <div className="w-full flex items-center justify-center">
                            <Button onClick={() => { startNewCaixa() }}>Iniciar um novo Caixa</Button>
                        </div>
                    ) : (
                        <>

                            <div className="w-full">
                                <div className="flex justify-between items-center gap-4 mb-8">
                                    <Card className="flex-1">
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <CardTitle>Entradas</CardTitle>
                                            <CardDescription><FiTrendingUp className="p-0 m-0" /></CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{formatarMoeda(somarTransacoesPorTipo(caixas, "movimento"))}</p>
                                        </CardContent>
                                    </Card>

                                    <Card className="flex-1">
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <CardTitle>Saídas</CardTitle>
                                            <CardDescription><FiTrendingDown className="p-0 m-0" /></CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{formatarMoeda(somarTransacoesPorTipo(caixas, "saida"))}</p>
                                        </CardContent>
                                    </Card>

                                    <Card className="flex-1">
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <CardTitle>Movimento Total</CardTitle>
                                            <CardDescription><FiDollarSign className="p-0 m-0" /></CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{formatarMoeda(calcularSaldo(caixas))}</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <DataTable columns={columns} data={caixas.Transacao} />
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}