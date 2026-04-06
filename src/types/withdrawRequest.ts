export enum WithdrawRequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export type WithdrawRequestCreatePayload = {
  accountId: string;
  spender: string;
  owner: string;
  value: string;
  deadline: number;
  v: number;
  r: string;
  s: string;
  requestDate: number;
  status: WithdrawRequestStatus;
};
