import { OreId } from "oreid-js";
import { OreidProvider, useIsLoggedIn, useUser } from "oreid-react";
import { WebPopup } from "oreid-webpopup";
import React, { useEffect, useState } from "react";
import "./App.scss";
import { Main } from "./Main";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoginPage } from "./LoginPage";

const REACT_APP_OREID_APP_ID = "t_737abd6f1be94250ae1b68ddbeb43e28";

// * Initialize OreId
const oreId = new OreId({
	appName: "Telos Developer Demo",
	appId: REACT_APP_OREID_APP_ID,
	oreIdUrl: "https://dev.service.oreid.io",
	plugins: {
		popup: WebPopup(),
	},
});

const LoggedInView: React.FC = () => {
	const user = useUser();
	if (!user) return null;
	return <Main />;
};

const AppWithProvider: React.FC = () => {
	const isLoggedIn = useIsLoggedIn();
	return (
		<div className="App">
			<Header />
			{isLoggedIn ? <LoggedInView /> : <LoginPage />}
			<Footer />
		</div>
	);
};

export const App: React.FC = () => {
	const [oreidReady, setOreidReady] = useState(false);

	useEffect(() => {
		oreId.init().then(() => {
			setOreidReady(true);
		});
	}, []);

	if (!oreidReady) {
		return <>Loading...</>;
	}

	return (
		<OreidProvider oreId={oreId}>
			<AppWithProvider />
		</OreidProvider>
	);
};
