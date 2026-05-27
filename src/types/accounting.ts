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
