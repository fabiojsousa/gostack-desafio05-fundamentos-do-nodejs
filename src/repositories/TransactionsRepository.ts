import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTrancationDTO {
  title: string;
  value: number;
  type: 'outcome' | 'income';
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
    let income = 0;
    let outcome = 0;
    let total = 0;

    this.transactions.forEach(transaction => {
      const { value, type } = transaction;

      if (type === 'income') income += value;
      else if (type === 'outcome') outcome += value;
    });

    total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTrancationDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
