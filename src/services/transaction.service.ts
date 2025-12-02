import type { Transaction } from "@/types/types"
import apiClient from "../lib/axios-client"

class TransactionService {
  async getTransactions(): Promise<Transaction[]> {
    const response = await apiClient.get<Transaction[]>("/transactions")
    return response.data
  }

  async createTransaction(transaction: Omit<Transaction, "id">): Promise<Transaction> {
    const response = await apiClient.post<Transaction>("/transactions", transaction)
    return response.data
  }
}

export default new TransactionService()
