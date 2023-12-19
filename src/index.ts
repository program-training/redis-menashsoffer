import express from "express";
import { createClient } from "redis";
import { config } from "dotenv";
import {
  handleGetUser,
  handlePropsRequest,
  handleRegisterUser,
  handleRegisterUsers,
  handleReturnPassword,
  receiveArrayReturnsObject,
} from "./home/routes";

const app = express();
app.use(express.json());
config();

const { REDIS_PASSWORD, REDIS_PORT, EXPRESS_BASE_URL, EXPRESS_PORT } =
  process.env;

export const client = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: "redis-11875.c323.us-east-1-2.ec2.cloud.redislabs.com",
    port: Number(REDIS_PORT),
  },
});

app.listen(EXPRESS_PORT, () => {
  console.log(`listening on: ${EXPRESS_BASE_URL}${EXPRESS_PORT}`);
  client
    .connect()
    .then(() => console.log("connected successfully to Redis client!!! "))
    .catch((error) => {
      if (error instanceof Error) console.log(error.message);
    });
});

app.get("/", (req, res) => {
  handlePropsRequest(req, res);
});

app.get("/user", (req, res) => {
  handleGetUser(res);
});

app.post("/registerUser", (req, res) => {
  handleRegisterUser(req, res);
});

app.get("/returnPassword", (req, res) => {
  handleReturnPassword(req, res);
});

app.post("/registerUsers", (req, res) => {
  handleRegisterUsers(req, res);
});

app.get("/receiveArrayReturnsObject", (req, res) => {
  receiveArrayReturnsObject(req, res);
});
