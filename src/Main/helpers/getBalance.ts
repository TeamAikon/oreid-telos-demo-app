import { JsonRpc } from "eosjs";
import Web3 from "web3";
import { ChainNetwork, ChainPlatformType, OreId } from "oreid-js";

export async function getEthBalance(
	chainAccount: string | undefined,
	chainNetwork: ChainNetwork,
	symbol: string,
	networkUrl: string
) {
	if (!chainAccount) return "0";
	console.log('getEthBalance:', networkUrl)
	console.log('getEthBalance:', chainAccount)
	chainAccount = '0xe8f3732026de4a8e7a09d1045bbfdda6f53f3ed9'
	// const web3 = new Web3(networkUrl);
	const web3HttpProvider = new Web3.providers.HttpProvider(networkUrl)
	let web3 = new Web3(web3HttpProvider)
	// return "0"
	return await web3.eth.getBalance(chainAccount);
}

export async function getEosBalance(
	chainAccount: string,
	chainNetwork: ChainNetwork,
	symbol: string,
	networkUrl: string
) {
	console.log('getEosBalance:', networkUrl)
	console.log('getEosBalance:', chainAccount)
  // Instantiate a new JsonRpc object, with the Network Api Uri, and a request object
	const rpc = new JsonRpc(networkUrl, { fetch });
	// Request the balance, passing in the token contract, the account name, and the token symbol
	const [balance] = await rpc.get_currency_balance(
		"eosio.token",
		chainAccount,
		symbol.toUpperCase()
	);
	// format '5.0000 EOS' to '5'
	let [amount] = balance?.split(" ");
	amount = amount?.replace(".", "") || "000000000";
	return amount;
}

export const getBalance = async ({
	oreid, chainAccount, chainNetwork, symbol
}: {
	oreid: OreId
	chainAccount: string | undefined;
	chainNetwork: ChainNetwork;
	symbol: string;
}) => {
	let balance = "0"
	let networkInfo = await oreid.getChainNetworkSettings(chainNetwork)
	const {host, port, protocol } = networkInfo.hosts[0]
	let networkUrl =  host.startsWith('http') ? `${host}:${port}` : `${protocol}://${host}:${port}`

	try {
		if(chainAccount) {
			if(networkInfo.type === ChainPlatformType.ethereum) {
				balance = await getEthBalance(chainAccount, chainNetwork, symbol, networkUrl)
			} else if(networkInfo.type === ChainPlatformType.eos) {
				balance = await getEosBalance(chainAccount, chainNetwork, symbol, networkUrl)
			}
		}
	} catch(error) {
		console.log('getBalance error:', error)
	}

	return { balance, chainLogoUrl: networkInfo.logoUrl }
};
