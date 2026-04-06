import axios from "axios";
import type { WithdrawRequestCreatePayload } from "@/types/withdrawRequest";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
const HOST = process.env.NEXT_PUBLIC_HOST || "";

export const createWithdrawRequest = async (
  values: WithdrawRequestCreatePayload
) => {
  try {
    const { data } = await axios.post(
      `${HOST}/api/mongo/withdraw-request/create`,
      JSON.stringify(values),
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllWithdrawRequestsByAccountId = async (accountId: string) => {
  try {
    const { data } = await axios.get(
      `${HOST}/api/mongo/withdraw-request/getAll`
    );

    return data.filter(
      (withdrawRequest: { accountId?: unknown }) =>
        String(withdrawRequest.accountId) === String(accountId)
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteRequest = async (id: string) => {
  try {
    const { data } = await axios.post(
      `${HOST}/api/mongo/withdraw-request/delete`,
      JSON.stringify({ id }),
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
