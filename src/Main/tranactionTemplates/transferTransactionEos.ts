interface TransferParams {
  fromAccount: string;
  permission: string;
  toAccount: string;
  quantity: string; // e.g. "0.0100 TLOS"
  memo: string;
}
export const transferTransactionEosData = ({
  fromAccount,
  permission,
  toAccount,
  memo,
  quantity,
}: TransferParams) => {
  return [
    {
      account: "eosio.token",
      name: "transfer",
      authorization: [
        {
          actor: fromAccount,
          permission,
        },
      ],
      data: {
        from: fromAccount,
        to: toAccount,
        quantity,
        memo,
      },
    },
  ];
};
