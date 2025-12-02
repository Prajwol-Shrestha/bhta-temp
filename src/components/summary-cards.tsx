import { Card, CardContent } from "@/components/ui/card";
import type { Transaction } from "@/types/types";

interface SummaryCardsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function SummaryCards({ transactions, isLoading }: SummaryCardsProps) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <Card className="card-elevated">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Total Income
              </p>
              <p className="text-3xl md:text-4xl font-bold text-green-600">
                {isLoading ? "Loading..." : "$" + totalIncome.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-elevated">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Total Expenses
              </p>
              <p className="text-3xl md:text-4xl font-bold text-red-600">
                {isLoading ? "Loading..." : "$" + totalExpenses.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-elevated">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Current Balance
              </p>
              <p
                className={`text-3xl md:text-4xl font-bold ${
                  balance >= 0 ? "text-blue-600" : "text-red-600"
                }`}
              >
                {isLoading ? "Loading..." : "$" + balance.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
