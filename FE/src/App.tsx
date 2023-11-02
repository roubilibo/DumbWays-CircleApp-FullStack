import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Home from "./pages/Home";
import {
	// BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import LoginForm from "./Features/Auth/components/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "./store/type/RootState";
import { API, setAuthToken } from "./libs/API";
import { AUTH_CHECK, AUTH_ERROR } from "./store/RootReducer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./layout/AppLayout";
import ThreadDetail from "./Features/Threads/components/ThreadDetail";

const theme = extendTheme({
	styles: {
		global: {
			body: {
				bg: "darkBackground",
			},
		},
	},
	colors: {
		darkBackground: "#222",
	},
});

function App() {
	const auth = useSelector((state: RootState) => state.auth);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function authCheck() {
		try {
			setAuthToken(localStorage.token);
			const response = await API.get("/auth/check");
			console.log("check auth app", response);

			dispatch(AUTH_CHECK(response.data.user));
			setIsLoading(false);
		} catch (err) {
			dispatch(AUTH_ERROR());
			console.log("auth check error", err);
			setIsLoading(false);
			navigate("/auth/login");
		}
	}
	useEffect(() => {
		if (localStorage.token) {
			authCheck();
		} else {
			setIsLoading(false);
		}
	}, []);

	function IsNotLogin() {
		if (!auth.username) {
			return <Navigate to="/auth/login" />;
		} else {
			return <AppLayout />;
		}
	}

	function IsLogin() {
		if (auth.username) {
			return <Navigate to="/" />;
		} else {
			return <Outlet />;
		}
	}
	return (
		<>
			{isLoading ? null : (
				// <BrowserRouter>
				<ChakraProvider theme={theme}>
					<Routes>
						<Route element={<IsNotLogin />}>
							<Route path="/" element={<Home />} />
							<Route path="/thread/:id" element={<ThreadDetail />} />
						</Route>
						<Route path="/" element={<IsLogin />}>
							<Route path="/" element={<Home />} />
							<Route path="/auth/register" element={<Register />} />
							<Route path="/auth/login" element={<Login />} />
						</Route>
					</Routes>
				</ChakraProvider>
				// </BrowserRouter>
			)}
		</>
	);
}
export default App;
