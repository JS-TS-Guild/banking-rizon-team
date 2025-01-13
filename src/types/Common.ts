/**
 * Basic ID types used throughout the system.
 */

export type UserId = string;
export type BankAccountId = string;
export type BankId = string;

/**
 * Bank Configuration Options
 */

export interface BankOptions {
  isNegativeAllowed?: boolean;
}

/**
 * Bank Account creation paramters
 */

export interface BankAccountParams {
  initialBalance: number;
  isNegativeAllowed?: boolean;
}

/**
 *  Represents a mapping of bank account ownership
 */

export interface BankAccountOwnership {
  userId: UserId;
  accountId: BankAccountId;
}

/**
 * Bank transfer paramaters
 */

export interface TransferParams {
  fromUserId: UserId;
  toUserId: UserId;
  amount: number;
  toBankId?: BankId;
}

/**
 * Error types for the banking system management
 */

export enum BankingErrorType {
  INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
  INVALID_ACCOUNT = "INVALID_ACCOUNT",
  INVALID_BANK = "INVALID_BANK",
  INVALID_USER = "INVALID_USER",
  INVALID_AMOUNT = "INVALID_AMOUNT",
  INVALID_TRANSFER = "INVALID_TRANSFER",
}

/**
 * Custom Error types for the banking system management
 */

export class BankingError extends Error {
  constructor(public type: BankingErrorType, message: string) {
    super(message);
    this.name = "BankingError";
  }
}

/**
 * Transaction result interface
 */
export interface TransactionResult {
  success: boolean;
  fromAccount: BankAccountId;
  toAccount: BankAccountId;
  amount: number;
  timestamp: Date;
}

/**
 * Account status interface
 */
export interface AccountStatus {
  accountId: BankAccountId;
  bankId: BankId;
  balance: number;
  isNegativeAllowed: boolean;
}

/**
 * User creation parameters
 */
export interface UserCreationParams {
  name: string;
  accountIds?: BankAccountId[];
}
