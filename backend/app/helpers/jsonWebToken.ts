import * as jwt from "jsonwebtoken";
import * as fileSystem from "fs/promises";
import IToken from "../interfaces/IToken";

const secret = async () => fileSystem.readFile("jwt.evaluation.key", "utf-8");

const config: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export const generate = async (payload: IToken): Promise<string | string> => {
  try {
    const readedSecret = await secret();
    const token = jwt.sign(payload, readedSecret, config);

    return token;
  } catch (error) {
    return `Ocorreu um erro ao tentar gerar um token: ${error as Error}`;
  }
};

export const verifyToken = async (token: string): Promise<IToken | string> => {
  try {
    const readedSecret = await secret();
    const decoded = jwt.verify(token, readedSecret, config);

    return decoded as IToken;
  } catch (error) {
    return `Ocorreu um erro ao verificar o token: ${error as Error}`;
  }
};