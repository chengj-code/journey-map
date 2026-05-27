import { defineStore } from 'pinia';
import type { AccountingBook, AccountingRecord, Tag, FilterState } from '@/types/accounting';

export const useAccountingStore = defineStore('accounting', {
  state: () => ({
    books: [] as AccountingBook[],
    records: [] as AccountingRecord[],
    tags: [] as Tag[],
    currentBookId: '' as string,
    filterState: {
      startDate: (() => {
        const n = new Date();
        return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-01`;
      })(),
      endDate: (() => {
        const n = new Date();
        const y = n.getFullYear();
        const m = n.getMonth() + 1;
        return `${y}-${String(m).padStart(2, '0')}-${new Date(y, m, 0).getDate().toString().padStart(2, '0')}`;
      })(),
      selectedTagIds: [] as string[],
    } as FilterState,
  }),

  getters: {
    currentBook(state): AccountingBook | undefined {
      return state.books.find((book) => book.id === state.currentBookId);
    },

    currentRecords(state): AccountingRecord[] {
      return state.records
        .filter((record) => record.bookId === state.currentBookId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },

    filteredRecords(state): AccountingRecord[] {
      let records = [...this.currentRecords];

      if (state.filterState.startDate) {
        records = records.filter((r) => r.date >= state.filterState.startDate!);
      }

      if (state.filterState.endDate) {
        records = records.filter((r) => r.date <= state.filterState.endDate!);
      }

      if (state.filterState.selectedTagIds.length > 0) {
        records = records.filter((r) =>
          state.filterState.selectedTagIds.some((tagId) => r.tags.includes(tagId))
        );
      }

      return records.sort((a, b) => b.date.localeCompare(a.date));
    },

    monthlySummary(): { totalIncome: number; totalExpense: number; balance: number } {
      const expenses = this.filteredRecords
        .filter((r) => r.type === 'expense')
        .reduce((sum, r) => sum + r.amount, 0);

      const incomes = this.filteredRecords
        .filter((r) => r.type === 'income')
        .reduce((sum, r) => sum + r.amount, 0);

      return {
        totalIncome: incomes,
        totalExpense: expenses,
        balance: incomes - expenses,
      };
    },

    tagsWithCount(state): (Tag & { count: number })[] {
      return state.tags.map((tag) => ({
        ...tag,
        count: state.records.filter((record) => record.tags.includes(tag.id)).length,
      }));
    },
  },

  actions: {
    updateFilter(partial: Partial<FilterState>) {
      this.filterState = { ...this.filterState, ...partial };
    },

    resetFilter() {
      const n = new Date();
      const y = n.getFullYear();
      const m = n.getMonth() + 1;
      this.filterState = {
        startDate: `${y}-${String(m).padStart(2, '0')}-01`,
        endDate: `${y}-${String(m).padStart(2, '0')}-${new Date(y, m, 0).getDate().toString().padStart(2, '0')}`,
        selectedTagIds: [],
      };
    },

    setQuickFilter(type: 'month' | 'lastMonth' | 'threeMonths' | 'year' | 'all') {
      const now = new Date();
      const y = now.getFullYear();
      const m = now.getMonth() + 1;

      switch (type) {
        case 'month': {
          this.filterState = {
            startDate: `${y}-${String(m).padStart(2, '0')}-01`,
            endDate: `${y}-${String(m).padStart(2, '0')}-${new Date(y, m, 0).getDate().toString().padStart(2, '0')}`,
            selectedTagIds: [],
          };
          break;
        }
        case 'lastMonth': {
          const d = new Date(y, now.getMonth(), 0);
          const ly = d.getFullYear();
          const lm = d.getMonth() + 1;
          this.filterState = {
            startDate: `${ly}-${String(lm).padStart(2, '0')}-01`,
            endDate: `${ly}-${String(lm).padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`,
            selectedTagIds: [],
          };
          break;
        }
        case 'threeMonths': {
          const start = new Date(y, now.getMonth() - 2, 1);
          const sy = start.getFullYear();
          const sm = start.getMonth() + 1;
          this.filterState = {
            startDate: `${sy}-${String(sm).padStart(2, '0')}-01`,
            endDate: `${y}-${String(m).padStart(2, '0')}-${new Date(y, m, 0).getDate().toString().padStart(2, '0')}`,
            selectedTagIds: [],
          };
          break;
        }
        case 'year': {
          this.filterState = {
            startDate: `${y}-01-01`,
            endDate: `${y}-12-31`,
            selectedTagIds: [],
          };
          break;
        }
        case 'all':
          this.filterState = {
            startDate: null,
            endDate: null,
            selectedTagIds: [],
          };
          break;
      }
    },

    generateId(): string {
      return crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },

    initDefaultBook() {
      if (this.books.length === 0) {
        const now = new Date().toISOString();
        const defaultBook: AccountingBook = {
          id: this.generateId(),
          name: '日常账本',
          createdAt: now,
          updatedAt: now,
        };
        this.books.push(defaultBook);
        this.currentBookId = defaultBook.id;
      } else if (!this.currentBookId || !this.books.find((b) => b.id === this.currentBookId)) {
        this.currentBookId = this.books[0].id;
      }
    },

    addBook(book: Omit<AccountingBook, 'id' | 'createdAt' | 'updatedAt'>) {
      const now = new Date().toISOString();
      const newBook: AccountingBook = {
        ...book,
        id: this.generateId(),
        createdAt: now,
        updatedAt: now,
      };
      this.books.push(newBook);
      return newBook;
    },

    updateBook(id: string, data: Partial<Omit<AccountingBook, 'id' | 'createdAt'>>) {
      const index = this.books.findIndex((book) => book.id === id);
      if (index !== -1) {
        this.books[index] = {
          ...this.books[index],
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    deleteBook(id: string) {
      const index = this.books.findIndex((book) => book.id === id);
      if (index !== -1) {
        this.books.splice(index, 1);
        this.records = this.records.filter((record) => record.bookId !== id);
        if (this.currentBookId === id) {
          this.currentBookId = this.books.length > 0 ? this.books[0].id : '';
        }
      }
    },

    switchBook(bookId: string) {
      if (this.books.find((book) => book.id === bookId)) {
        this.currentBookId = bookId;
      }
    },

    addRecord(record: Omit<AccountingRecord, 'id' | 'createdAt' | 'updatedAt'>) {
      const now = new Date().toISOString();
      const newRecord: AccountingRecord = {
        ...record,
        id: this.generateId(),
        createdAt: now,
        updatedAt: now,
      };
      this.records.push(newRecord);
      return newRecord;
    },

    updateRecord(id: string, data: Partial<Omit<AccountingRecord, 'id' | 'createdAt'>>) {
      const index = this.records.findIndex((record) => record.id === id);
      if (index !== -1) {
        this.records[index] = {
          ...this.records[index],
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    deleteRecord(id: string) {
      const index = this.records.findIndex((record) => record.id === id);
      if (index !== -1) {
        this.records.splice(index, 1);
      }
    },

    addTag(tag: Omit<Tag, 'id' | 'createdAt'>) {
      const newTag: Tag = {
        ...tag,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
      };
      this.tags.push(newTag);
      return newTag;
    },

    updateTag(id: string, data: Partial<Omit<Tag, 'id' | 'createdAt'>>) {
      const index = this.tags.findIndex((tag) => tag.id === id);
      if (index !== -1) {
        this.tags[index] = {
          ...this.tags[index],
          ...data,
        };
      }
    },

    deleteTag(id: string) {
      const index = this.tags.findIndex((tag) => tag.id === id);
      if (index !== -1) {
        this.tags.splice(index, 1);
      }
    },
  },

  persist: {
    key: 'accounting-store-v2',
  },
});
