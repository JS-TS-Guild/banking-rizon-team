import {
  UserId,
  BankAccountId,
  UserCreationParams,
  BankingError,
  BankingErrorType,
} from "@/types/Common";

export default class User {
  private id: UserId;
  private name: string;
  private accountIds: BankAccountId[];

  private constructor(params: UserCreationParams) {
    this.id = crypto.randomUUID();
    this.name = params.name;
    this.accountIds = params.accountIds || [];
  }

  static create(name: string, accountIds: BankAccountId[] = []): User {
    if (!name || name.trim().length === 0) {
      throw new BankingError(
        BankingErrorType.INVALID_USER,
        "User name cannot be empty"
      );
    }
    return new User({ name, accountIds });
  }

  getId(): UserId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  // Getter for accountID
  getAccountIds(): BankAccountId[] {
    return this.accountIds.slice();
  }

  // Add a new account to the user
  addAccount(accountId: BankAccountId): void {
    if (!accountId) {
      throw new BankingError(
        BankingErrorType.INVALID_ACCOUNT,
        "Account ID cannot be empty"
      );
    }

    // Check if account already exists
    if (this.accountIds.indexOf(accountId) !== -1) {
      throw new BankingError(
        BankingErrorType.INVALID_ACCOUNT,
        "Account already exists for this user"
      );
    }

    this.accountIds.push(accountId);
  }

  // Remove an account from the user
  removeAccount(accountId: BankAccountId): void {
    const index = this.accountIds.indexOf(accountId);
    if (index === -1) {
      throw new BankingError(
        BankingErrorType.INVALID_ACCOUNT,
        "Account does not exist for this user"
      );
    }
    this.accountIds.splice(index, 1);
  }

  // Check if user has a specific account
  hasAccount(accountId: BankAccountId): boolean {
    return this.accountIds.indexOf(accountId) !== -1;
  }
}
