import { ChainNetwork, ChainPlatformType, OreId, Transaction } from "oreid-js";
import { transferTransactionEosData } from "../tranactionTemplates/transferTransactionEos";
import { transferTransactionEthData } from "../tranactionTemplates/transferTransactionEth";

export const transferTransaction = async ({
  oreId,
  chainNetwork,
  fromAccount,
  toAccount,
  memo,
  permission,
  quantity,
}: {
  oreId: OreId;
  chainNetwork: ChainNetwork;
  fromAccount: string;
  toAccount: string;
  memo: string;
  quantity: string;
  permission?: string;
}): Promise<Transaction> => {
  let transactionData;

  let networkInfo = await oreId.getChainNetworkSettings(chainNetwork);

  if (networkInfo.type === ChainPlatformType.ethereum) {
    transactionData = transferTransactionEthData({
      fromAccount,
      toAccount,
      memo,
      quantity,
    });
  } else if (networkInfo.type === ChainPlatformType.eos) {
    transactionData = transferTransactionEosData({
      fromAccount,
      toAccount,
      permission: permission || "active",
      memo,
      quantity,
    });
  }

  return oreId.createTransaction({
    account: oreId.auth.user.data.accountName,
    chainAccount: fromAccount,
    chainNetwork,
    transaction: { actions: transactionData } as any,
    signOptions: { broadcast: true },
  });
};
