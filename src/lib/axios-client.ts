import type { Transaction } from "@/types/types"

let mockTransactions: Transaction[] = []
let isLoaded = false

const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms))

type ApiRes<T> = { data: T }

async function loadIfNeeded() {
  if (isLoaded) return
  try {
    const res = await fetch("/data/transactions.json")
    if (res.ok) {
      const raw = (await res.json()) as any[]
      mockTransactions = raw.map((t) => ({ ...t, id: t.id ?? Date.now() + Math.random() }))
      mockTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
  } catch (err) {
    console.error("Failed to load transactions:", err)
  }
  isLoaded = true
}

const apiClient = {
  async get<T = any>(url: string): Promise<ApiRes<T>> {
    await loadIfNeeded()
    await delay()
    if (url === "/transactions") {
      return { data: mockTransactions as unknown as T }
    }
    throw new Error(`GET ${url} not implemented`)
  },

  async post<T = any>(url: string, payload?: any): Promise<ApiRes<T>> {
    await loadIfNeeded()
    await delay()
    if (url === "/transactions") {
      const newTx: Transaction = { ...(payload as Omit<Transaction, "id">), id: Date.now() + Math.random() }
      mockTransactions.unshift(newTx)
      return { data: newTx as unknown as T }
    }
    throw new Error(`POST ${url} not implemented`)
  },
}

export default apiClient