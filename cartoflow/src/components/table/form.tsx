import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getAllCategories, getOpenCaixa } from "@/lib/req";
import { useQuery } from "react-query";
import { api } from "@/lib/axios";
import { toast } from "../ui/use-toast";

export function MovimentoForm() {
    const { data: categorias } = useQuery({ queryFn: getAllCategories, queryKey: ['categorias'] });
    const { data: caixas } = useQuery({ queryFn: getOpenCaixa, queryKey: ['caixas'] });

    const criarMovimentacaoFormSchema = z.object({
        idCategoria: z.string(),
        description: z.string(),
        input: z.boolean(),
        value: z.preprocess((a) => parseFloat(z.string().parse(a)),
            z.number().positive().min(1)
        )
    });

    const onSubmit = async (values: z.infer<typeof criarMovimentacaoFormSchema>) => {
        try {
            const idCaixa = caixas?.id;

            await api.post(`/transacoes/${idCaixa}`, {
                idCategoria: values.idCategoria,
                description: values.description,
                input: values.input,
                value: values.value
            });

            toast({
                title: "Nova transação adicionada.",
                description: "Nova transação foi adicionada com sucesso.",
            })

            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const form = useForm<z.infer<typeof criarMovimentacaoFormSchema>>({
        resolver: zodResolver(criarMovimentacaoFormSchema),
        defaultValues: {
            value: 0,
            input: true,
            description: "",
            idCategoria: "",
        }
    })

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Input placeholder="Descrição" {...field} />
                                </FormControl>
                                <FormDescription>Insira a descrição da movimentação.</FormDescription>
                            </FormItem>
                        )
                        }
                    />

                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Valor</FormLabel>
                                <FormControl>
                                    <Input placeholder="Valor" {...field} />
                                </FormControl>
                                <FormDescription>Insira o valor da movimentação.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )
                        }
                    />

                    <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex gap-8 items-center">
                                    <FormLabel>Entrada</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </div>
                                <FormDescription>Deixe selecionado para entrada e não selecionado para saída.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )
                        }
                    />

                    <FormField
                        control={form.control}
                        name="idCategoria"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoria</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a categoria da transação." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            categorias?.map((categoria, index) => (
                                                <SelectItem key={index} value={categoria.id}>{categoria.title}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormDescription>Selecione a categoria da movimentação.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )
                        }
                    />

                    <Button className="w-full" type="submit">Enviar</Button>
                </form>
            </Form>

        </>
    )
}