import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface FilterBarProps {
  selectedType: "all" | "income" | "expense"
  setSelectedType: (type: "all" | "income" | "expense") => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  categories: string[]
}

export function FilterBar({
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  categories,
}: FilterBarProps) {
  return (
    <Card className="card-elevated">
      <CardContent className="pt-6">
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
          <div className="space-y-2.5">
            <Label htmlFor="type-select" className="text-sm font-medium text-foreground">
              Filter by Type
            </Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="type-select" className="h-10 text-sm bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="category-select" className="text-sm font-medium text-foreground">
              Filter by Category
            </Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category-select" className="h-10 text-sm bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
