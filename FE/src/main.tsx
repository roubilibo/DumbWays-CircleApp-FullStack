import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/RootReducer.ts";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

const store = configureStore({
	reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Router>
				<Provider store={store}>
					<ChakraProvider>
						<App />
					</ChakraProvider>
				</Provider>
			</Router>
		</QueryClientProvider>
	</React.StrictMode>
);
