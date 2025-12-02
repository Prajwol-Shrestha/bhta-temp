import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/types/types"

interface ChartSectionProps {
  transactions: Transaction[]
}

export function ChartSection({ transactions }: ChartSectionProps) {
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, t) => {
        const existing = acc.find((item: any) => item.name === t.category)
        if (existing) {
          existing.value += t.amount
        } else {
          acc.push({ name: t.category, value: t.amount })
        }
        return acc
      },
      [] as any
    )
    .sort((a: any, b: any) => b.value - a.value)

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#6366f1"]

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Expense Breakdown</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Distribution by category</p>
      </CardHeader>
      <CardContent>
        {expensesByCategory.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={expensesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expensesByCategory.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              <Legend className="mt-6"/>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-64 text-muted-foreground">
            <p>No expense data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}