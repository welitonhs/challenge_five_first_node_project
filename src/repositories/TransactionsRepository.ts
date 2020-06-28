import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // const income = this.transactions.reduce(
    //   (accumulator, transaction) => {
    //     if (transaction.type === 'income') {
    //       return accumulator + transaction.value;
    //     }
    //     return 0;
    //   },
    //   [0],
    // );
    let income = 0;
    let outcome = 0;
    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') income += transaction.value;
      if (transaction.type === 'outcome') outcome += transaction.value;
    });
    const total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
