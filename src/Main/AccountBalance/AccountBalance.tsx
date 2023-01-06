import { ChainNetwork } from "oreid-js";
import React, { useEffect, useState } from "react";
import { Card } from "../Card";
import { getBalance } from "../helpers/getBalance";
import styles from "./AccountBalance.module.scss";
import { toEosAsset } from "../helpers/amountHelpers";
import { useOreId } from "oreid-react";
import { TransferButton } from "../TransferButton";

interface AccountBalanceProps {
	chainAccount: string;
	chainNetwork: ChainNetwork;
	symbol: string;
}

export const AccountBalance: React.FC<AccountBalanceProps> = ({
	chainAccount, chainNetwork, symbol
}: AccountBalanceProps) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>();
	const [balance, setBalance] = useState("0");
	const [chainLogoUrl, setChainLogoUrl] = useState("");

	let precision = 4;
	let permission = 'active';
	if(chainNetwork === ChainNetwork.WaxTest || chainNetwork === ChainNetwork.WaxMain) precision= 8

	const oreid = useOreId()

	useEffect(() => {
		setError(undefined);
		getBalance({ oreid, chainAccount, chainNetwork, symbol })
			.then(({ balance, chainLogoUrl }) => {setBalance(balance); setChainLogoUrl(chainLogoUrl) })
			.catch(setError)
			.finally(() => setLoading(false));
	}, []);
	if (loading) return null;
	return (
		<Card className={styles.card}>
			<div className={styles.AccountBalance}>
				<span>Balance:</span> <img width={30} height={30} src={chainLogoUrl} />
				<span>
					{toEosAsset(balance, symbol, precision)}
				</span>
				{error && (
					<div className="App-error-Main">Error: {error.message}</div>
				)}
			</div>
			<div>
					{chainAccount}
			</div>
			<div className={styles.Transferbutton}>
				<TransferButton chainAccount={chainAccount} chainNetwork={chainNetwork} amount={balance} symbol={symbol} permission={permission} memo={'transfer memo'}/>
			</div>
		</Card>
	);
};
