import express from "express";
import morgan from "morgan";
import users from "./routes/users.routes";

const app = express();

//Config
app.set("port", 4000);

//Mid
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/v1/", users); 

export default app;