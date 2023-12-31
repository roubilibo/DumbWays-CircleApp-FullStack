import { AppDataSource } from "./data-source";
import * as express from "express";
import * as cors from "cors";
import router from "./routes/Thread";
import UserRouter from "./routes/User";
import ReplyRouter from "./routes/Reply";
import LikeRouter from "./routes/Like";
import FollowRouter from "./routes/Follow";
import Env from "./utils/Env/Env";

AppDataSource.initialize()
	.then(async () => {
		const app = express();
		const port = Env.PORT;

		const options: cors.CorsOptions = {
			allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
			credentials: true,
			methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
			origin: "*",
			preflightContinue: false,
		};

		app.use(express.json());
		app.use(cors(options));
		app.use("/api/v1", router);
		app.use("/api/v1", UserRouter);
		app.use("/api/v1", ReplyRouter);
		app.use("/api/v1", LikeRouter);
		app.use("/api/v1", FollowRouter);

		app.listen(port, () => console.log(`Server running on port ${port}`));
	})

	.catch((error) => console.log(error));
