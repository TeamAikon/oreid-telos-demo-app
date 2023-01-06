import { ChainNetwork, ChainPlatformType } from "oreid-js";
import { useOreId } from "oreid-react";
import React, { useCallback, useState } from "react";
import { Button } from "./ButtonGradient";
import { transferTransaction } from "./helpers/transferTransaction";
import { eosOreIdFundingAccount, ethOreIdFundingAccount } from "src/constants";

let toAccount: string;
let quantity: string = ".01";
const quantityTlos = "0.0100 TLOS";
const quantityEth = "0x01";

interface Props {
  chainAccount: string;
  permission: string | undefined;
  chainNetwork: ChainNetwork;
  amount: string;
  symbol: string;
  memo: string;
}

export const TransferButton: React.FC<Props> = ({
  chainAccount,
  permission,
  chainNetwork,
  amount,
  symbol,
  memo,
}) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
	const [blockExplorerTxUrl, setBlockExplorerTxUrl] = useState("");
  const oreId = useOreId();

  const transferToken = useCallback(async () => {
    let networkInfo = await oreId.getChainNetworkSettings(chainNetwork);
		setBlockExplorerTxUrl(networkInfo.blockExplorerTxUrl)

    if (networkInfo.type === ChainPlatformType.ethereum) {
      quantity = quantityEth;
      toAccount = ethOreIdFundingAccount;
    } else if (networkInfo.type === ChainPlatformType.eos) {
      quantity = quantityTlos;
      toAccount = eosOreIdFundingAccount;
    }

    // transfer to another account
    const transferParams = {
      fromAccount: chainAccount,
      toAccount, // TODO: User should be able to enter this account name
      memo,
      permission: permission || "active",
      oreId,
      chainNetwork,
      quantity,
    };
    console.log("transferParams:", transferParams);
    setIsLoading(true);
    transferTransaction(transferParams)
      .then((transaction) => {
        oreId.popup
          .sign({ transaction })
          .then((result) => {
            setTransactionId(result?.transactionId || "");
          })
          .catch(setError)
          .finally(() => setIsLoading(false));
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [oreId, setError]);

  const onClickTransfer = () => {
    setIsLoading(true);
    transferToken()
      .then(() => {
        // Do something
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  };

  if (error) {
    return <div style={{ color: "#cc0" }}>{`${error}`}</div>;
  }

  if (isLoading) return <>Loading...</>;
  if (transactionId) {
    return (
      <>
        <a
          style={{ color: "#fff" }}
          href={`${blockExplorerTxUrl}/${transactionId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on block explorer
        </a>
      </>
    );
  }

  return (
    <>
      <Button onClick={onClickTransfer}>{`Transfer ${quantity}`}</Button>
    </>
  );
};
