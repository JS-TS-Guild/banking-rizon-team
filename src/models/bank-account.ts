import {
  BankAccountId,
  BankId,
  BankingError,
  BankingErrorType,
} from "@/types/Common";

export default class BankAccount {
  private id: BankAccountId;
  private bankId: BankId;
  private balance: number;
  private isNegativeAllowed: boolean;

  constructor(
    bankId: BankId,
    initialBalance: number = 0,
    isNegativeAllowed: boolean = false
  ) {
    this.id = crypto.randomUUID();
    this.bankId = bankId;
    this.balance = initialBalance;
    this.isNegativeAllowed = isNegativeAllowed;
  }

  // Getter for accountID
  getId(): BankAccountId {
    return this.id;
  }

  // Getter for current balance
  getBalance(): number {
    return this.balance;
  }

  // Check if an amount can be debited
  canDebit(amount: number): boolean {
    // if negative amount is allowed, return true
    if (this.isNegativeAllowed) {
      return true;
    }
    // check if balance is sufficent
    return this.balance >= amount;
  }

  // Add money to the account
  credit(amount: number): void {
    if (amount <= 0) {
      throw new BankingError(
        BankingErrorType.INVALID_AMOUNT,
        "Amount should be greater than 0"
      );
    }
    this.balance += amount;
  }

  // Debit money from the account
  debit(amount: number): void {
    // Validate amount
    if (amount <= 0) {
      throw new BankingError(
        BankingErrorType.INVALID_AMOUNT,
        "Amount should be greater than 0"
      );
    }

    // Check if debit is possible
    if (!this.canDebit(amount)) {
      throw new BankingError(
        BankingErrorType.INSUFFICIENT_FUNDS,
        "Insufficient funds"
      );
    }
    this.balance -= amount;
  }
}
