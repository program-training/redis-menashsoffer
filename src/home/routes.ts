import { client } from "..";
import { Response, Request } from "express";
import { User } from "./UserInterface";

export const handlePropsRequest = async (req: Request, res: Response) => {
  try {
    const { test } = req.query;

    if (test) {
      await client.set("test", String(test));
    }

    const data = await client.get("test");
    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
};

export const handleGetUser = async (res: Response) => {
  const PASSWORD_PREFIX = "pwd:12345";
  const user: User = {
    name: "John Doe",
    password: "somePassword123",
  };
  try {
    await client.set(`${PASSWORD_PREFIX}${user.name}`, user.password);
    const password = await client.get(`${PASSWORD_PREFIX}${user.name}`);
    res.send(password);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
};

export const handleRegisterUser = async (req: Request, res: Response) => {
  try {
    const { id, name, password } = req.body;
    await client.hSet(`user:${id}`, {
      name: name,
      password: password,
    });
    const regUser = await client.hGetAll(`user:${id}`);
    res.send(regUser);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
};

export const handleReturnPassword = async (req: Request, res: Response) => {
  try {
    const { id, name, password } = req.body;
    await client.hSet(`user:${id}`, {
      name: name,
      password: password,
    });
    const getPassword = await client.hGet(`user:${id}`, "password");
    res.send(getPassword);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
};

export const handleRegisterUsers = async (req: Request, res: Response) => {
  try {
    const users = req.body;
    // users.forEach(async (user: User) => {
    //   await client.hSet(`user:${user.name}`, "password", user.password);
    // });
    const jsonArray = JSON.stringify(users);
    await client.set("users", jsonArray);
    res.send("Users saved to Redis successfully!");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
};

export const receiveArrayReturnsObject = async (
  req: Request,
  res: Response
) => {
  try {
    const users = req.body;
    res.send("Users saved to Redis successfully!");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
};
