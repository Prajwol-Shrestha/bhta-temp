import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCreateTransaction } from "@/hooks/useTransactions";
import { toast } from "sonner";

interface AddTransactionModalProps {
  categories: string[];
}

const DEFAULT_CATEGORIES = [
  "Groceries",
  "Transport",
  "Entertainment",
  "Utilities",
  "Other",
];

export function AddTransactionModal({
  categories = DEFAULT_CATEGORIES,
}: AddTransactionModalProps) {
  const [open, setOpen] = useState(false);
  const categoryList =
    Array.isArray(categories) && categories.length > 0
      ? categories
      : DEFAULT_CATEGORIES;

  const { mutate: addTransaction, isPending } = useCreateTransaction();

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense" as "income" | "expense",
    category: categoryList[0] || "Other",
    date: new Date().toISOString().split("T")[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (value: "income" | "expense") => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      addTransaction(
        {
          description: formData.description,
          amount: Number.parseFloat(formData.amount),
          type: formData.type,
          category: formData.category,
          date: formData.date,
        },
        {
          onSuccess: () => {
            toast.success("Transaction added succssfully!");
          },
          onError: (error) => {
            toast.error("Error adding transaction!");
            console.error("Error adding transaction:", error);
          },
        }
      );

      setFormData({
        description: "",
        amount: "",
        type: "expense",
        category: categoryList[0] || "Other",
        date: new Date().toISOString().split("T")[0],
      });
      setOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <span className="text-lg">+</span>
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Record a new income or expense transaction
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2.5">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              name="description"
              placeholder="e.g., Coffee, Salary, Rent"
              value={formData.description}
              onChange={handleChange}
              disabled={isSubmitting || isPending}
              className="h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2.5">
              <Label htmlFor="amount" className="text-sm font-medium">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                name="amount"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={handleChange}
                disabled={isSubmitting || isPending}
                className="h-10"
              />
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="type" className="text-sm font-medium">
                Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={handleTypeChange}
                disabled={isSubmitting || isPending}
              >
                <SelectTrigger id="type" className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2.5">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
                disabled={isSubmitting || isPending}
              >
                <SelectTrigger id="category" className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryList.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="date" className="text-sm font-medium">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                disabled={isSubmitting || isPending}
                className="h-10"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting || isPending}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              type="submit"
              disabled={isSubmitting || isPending}
              className="min-w-[120px]"
            >
              {isSubmitting ? "Adding..." : "Add Transaction"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
