interface TransferParams {
  fromAccount: string;
  toAccount: string;
  quantity: string; // e.g. "0x01"
  memo: string;
}
export const transferTransactionEthData = ({
  fromAccount,
  toAccount,
  memo,
  quantity, // "0x01"
}: TransferParams) => {
  return [
    { from: fromAccount, to: toAccount, value: quantity, gasLimit: 145000, memo },
  ];
};
