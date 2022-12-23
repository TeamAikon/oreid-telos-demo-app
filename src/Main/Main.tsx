import { ChainNetwork } from "oreid-js";
import React, { useState } from "react";
import styles from "./Main.module.scss";
import { AccountBalance } from "./AccountBalance";
import { useUser } from "oreid-react";

export const Main: React.FC = () => {
	const [error, setError] = useState<Error | undefined>();
	const [loading, setLoading] = useState(true);

	let telosAccount: string | undefined
	let telosEvmAccount: string | undefined

	const user = useUser();
	telosAccount = user?.chainAccounts?.find((ca) => ca.chainNetwork === ChainNetwork.TelosTest)?.chainAccount;
	telosEvmAccount = user?.chainAccounts?.find((ca) => ca.chainNetwork === ChainNetwork.TelosEvmTest)?.chainAccount;

	return (
		<div className={styles.Main}>
			<h2 className={styles.welcome}>Welcome to our app!</h2>
			<section className={styles.firstBox}>
				<div className={styles.balance}>
					<AccountBalance chainAccount={telosAccount} chainNetwork={ChainNetwork.TelosTest} symbol={'TLOS'}/>
				</div>

				<div className={styles.balance}>
					<AccountBalance chainAccount={telosEvmAccount} chainNetwork={ChainNetwork.TelosEvmTest} symbol={'TLOS'}/>
				</div>
			</section>
		</div>
	);
};
