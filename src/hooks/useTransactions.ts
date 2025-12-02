import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Transaction } from "@/types/types";
import transactionService from "@/services/transaction.service";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionService.getTransactions(),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newTransaction: Omit<Transaction, "id">) =>
      transactionService.createTransaction(newTransaction),
    // optimisic
    onMutate: async (newTransaction) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] })
      const previousTransactions = queryClient.getQueryData<Transaction[]>(["transactions"])

      queryClient.setQueryData(["transactions"], (old: Transaction[] | undefined) => {
        if (!old) return [newTransaction as Transaction]
        return [{ ...(newTransaction as any), id: Date.now() + Math.random() }, ...old]
      })

      return { previousTransactions }
    },

  });
}
