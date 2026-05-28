export interface AccountingBook {
  id: string
  name: string
  icon?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface AccountingRecord {
  id: string
  bookId: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  tags: string[]
  date: string
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  name: string
  color: string
  icon?: string
  createdAt: string
}

export interface FilterState {
  startDate: string | null
  endDate: string | null
  selectedTagIds: string[]
}

export interface Budget {
  id: string
  bookId: string
  year: number
  month: number
  totalAmount: number
  categories: Record<string, number>
  createdAt: string
  updatedAt: string
}

export interface BudgetStatus {
  spent: number
  remaining: number
  percentage: number
  isOver: boolean
}

export interface CategoryBudgetStatus {
  category: string
  budget: number
  spent: number
  remaining: number
  percentage: number
  isOver: boolean
}
