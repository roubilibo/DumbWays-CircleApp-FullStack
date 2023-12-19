import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "ep-plain-sun-74387267.ap-southeast-1.aws.neon.tech",
	port: 5432,
	username: "roubilibo",
	password: "aiMI3fnq8Kbc",
	database: "ThreadApps",
	synchronize: true,
	logging: false,
	entities: ["src/entities/*.ts"],
	migrations: ["src/migration/*.ts"],
	subscribers: [],
	ssl: true,
});
