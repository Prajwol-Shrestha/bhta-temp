import { useState, useMemo } from "react"
import { useTransactions } from "./hooks/useTransactions"
import "./App.css"
import { DashboardHeader } from "./components/dashboard-header"
import { SummaryCards } from "./components/summary-cards"
import { FilterBar } from "./components/filter-bar"
import { TransactionTable } from "./components/transaction-table"
import { ChartSection } from "./components/chart-section"
import { AddTransactionModal } from "./components/add-transaction-modal"

export default function App() {
  const [selectedType, setSelectedType] = useState<"all" | "income" | "expense">("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const { data: transactions = [], isLoading, error } = useTransactions()

  const filteredTransactions = useMemo(() => {
    let filtered = transactions

    if (selectedType !== "all") {
      filtered = filtered.filter((t) => t.type === selectedType)
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((t) => t.category === selectedCategory)
    }

    return filtered
  }, [transactions, selectedType, selectedCategory])

  const categories = useMemo(() => {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return ["Groceries", "Transport", "Entertainment", "Utilities", "Other"]
    }
    return Array.from(new Set(transactions.map((t) => t.category))).sort()
  }, [transactions])

  if (error) {
    return (
      <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <div className="text-destructive text-center max-w-md mx-auto pt-12">
          <h1 className="text-xl font-semibold mb-2">Error Loading Transactions</h1>
          <p>{error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex items-center justify-between mb-8 flex-col md:flex-row">
          <DashboardHeader />
          <AddTransactionModal categories={categories} />
        </div>

        <SummaryCards transactions={filteredTransactions} isLoading={isLoading} />

        <div className="mt-8 md:mt-10 space-y-6">
          <FilterBar
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {isLoading ? (
                <div className="card-elevated flex justify-center items-center h-96">
                  <div className="text-muted-foreground text-sm">Loading transactions...</div>
                </div>
              ) : (
                <TransactionTable transactions={filteredTransactions} />
              )}
            </div>
            <div>
              <ChartSection transactions={filteredTransactions} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}