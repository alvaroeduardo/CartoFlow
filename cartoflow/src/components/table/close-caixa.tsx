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
import { Button } from "@/components/ui/button"
import { getOpenCaixa } from "@/lib/req";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input";
import { z } from "zod";
import { api } from "@/lib/axios";

export function FecharCaixa() {
    const { data: caixas } = useQuery({ queryFn: getOpenCaixa, queryKey: ['caixas'] });

    const fecharCaixaFormSchema = z.object({
        sealValue: z.preprocess((a) => parseFloat(z.string().parse(a)),
            z.number().positive().min(1)
        ),
        cashValue: z.preprocess((a) => parseFloat(z.string().parse(a)),
            z.number().positive().min(1)
        )
    });

    const onSubmit = async (values: z.infer<typeof fecharCaixaFormSchema>) => {
        try {
            const idCaixa = caixas?.id;

            await api.put(`/caixas/fechar/${idCaixa}`, {
                cashValue: values.cashValue,
                sealValue: values.cashValue
            });

            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const form = useForm<z.infer<typeof fecharCaixaFormSchema>>({
        resolver: zodResolver(fecharCaixaFormSchema),
        defaultValues: {
            cashValue: 0,
            sealValue: 0
        }
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Fechar Caixa</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <FormField
                            control={form.control}
                            name="cashValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor do Caixa</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Valor do Caixa" {...field} />
                                    </FormControl>
                                    <FormDescription>Insira o valor do Caixa.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />

                        <FormField
                            control={form.control}
                            name="sealValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor do Selo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Valor do Selo" {...field} />
                                    </FormControl>
                                    <FormDescription>Insira o valor do selo.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction type="submit">Fechar</AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>

            </AlertDialogContent>
        </AlertDialog>
    )
}