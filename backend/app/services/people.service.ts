import { ResultSetHeader } from "mysql2";
import IPerson from "../interfaces/IPerson";
import { personModel } from "../models";
import * as bCrypt from "bcryptjs";
import IPersonToRegister from "../interfaces/IPersonToRegister";
import { generate, verifyToken } from "../helpers/jsonWebToken";
import ILoggedPerson from "../interfaces/ILoggedPerson";
import ILogin from "../interfaces/ILogin";
import IToken from "../interfaces/IToken";

const encryptPassword = async (password: string): Promise<string> => {
  const encryptedPassword = await bCrypt.hash(password, 10);

  return encryptedPassword;
};

const findAllPeople = async (): Promise<IPerson[] | string> => {
  try {
    const response: IPerson[] | null = await personModel.findAll();

    if (!response || response.length === 0) return 'Não encontramos pessoas registradas';

    const people = response.map((person) => {
      delete person.password;
      return person;
    }); 

    return people;
  } catch (error) {
    return `Ocorreu um erro na busca: ${error}`;
  }
};

const findPersonById = async (idToSearch: number): Promise<IPerson | string> => {
  try {
    const person: IPerson | null = await personModel.findById(idToSearch);

    if (!person || person === null) {
      return `Não conseguimos encontrar a pessoa pelo id ${idToSearch}`;
    }

    delete person.password;

    return person;
  } catch (error) {
    return `Ocorreu um erro na busca: ${error}`;
  }
};

const findPersonByUserName = async (userName: string): Promise<IPerson | string> => {
  try {
    const person: IPerson | null = await personModel.findByUserName(userName);

    if (!person || person === null) {
      return `Não conseguimos encontrar a pessoa com o nome de usuária ${userName}`;
    }

    delete person.password;

    return person;
  } catch (error) {
    return `Ocorreu um erro na busca: ${error}`;
  }
};

const findByUserNameToLogin = async (userName: string): Promise<ILogin | string> => {
  try {
    const person: IPerson | null = await personModel.findByUserName(userName);

    if (!person || person === null) {
      return `Não conseguimos encontrar a pessoa com o nome de usuária ${userName}`;
    }

    return person as ILogin;
  } catch (error) {
    return `Ocorreu um erro na busca: ${error}`;
  }
};

const createNewPerson = async (person: IPersonToRegister): Promise<ILoggedPerson | string> => {
  try {
    person = {
      ...person,
      password: await encryptPassword(person.password),
    };

    const newPerson: IPerson | null = await personModel.createNewPerson({
      ...person,
      id: 0
    });

    if (!newPerson || !newPerson.id || newPerson === null) {
      return `Não foi possível cadastrar a pessoa com os seguintes dados:
        nome: ${person.name}
        nome de usuária: ${person.userName}
      `;
    }

    const token: string = await generate({
      id: newPerson.id,
      name: newPerson.name,
      userName: newPerson.userName,
      role: newPerson.role,
    });

    delete newPerson.password;

    const personWithToken: ILoggedPerson = {
      ...newPerson,
      token,
    };

    return personWithToken;
  } catch (error) {
    return `Ocorreu um erro no registro de novo usuário: ${error}`;
  }
};

const updatePerson = async (personToUpdate: IPerson, id: number): Promise<ResultSetHeader | string> => {
  try {
    const updatedPerson: ResultSetHeader | null = await personModel
    .updatePerson(personToUpdate, id);

    if (!updatedPerson) return `Não foi possível alterar os dados da pessoa com o id ${id}`;
    
    return updatedPerson;
  } catch (error) {
    return `Ocorreu um erro na alteração de dados de usuário. ${error}`;
  }
};

const deletePerson = async (id: number): Promise<ResultSetHeader | string> => {
  try {
    const excludedPerson: ResultSetHeader | null = await personModel.deletePerson(id);

    if (!excludedPerson) {
      return `Não foi possível excluir dados da pessoa com o id ${id}`;
    }
    
    return excludedPerson;
  } catch (error) {
    return `Ocorreu um erro ao tentar excluir um usuário do banco de dados. ${error}`;
  }
};

const login = async (personData: ILogin): Promise<ILoggedPerson | string> => {
  try {
    if (
      !personData
      || !personData.userName
      || !personData.password
    ) {
      return "É necessário informar nome de usuário e senha para efetuar login";
    }

    personData = {
      ...personData,
      password: await encryptPassword(personData.password),
    };

    let person: ILogin | string = await findByUserNameToLogin(personData.userName);

    if (!person || person === null) {
      return `Não foi possível encontrar a pessoa com o nome de usuária ${personData.userName}`;
    }

    if (typeof person === "string") return person;

    const passwordMatch = await bCrypt.compare(personData.password, person.password);
    if (!passwordMatch) return "Dados incorretos, tente novamente.";

    const token: string = await generate({
      id: person.id,
      name: person.name,
      userName: person.userName,
      role: person.role,
    });

    const loggedPersonToReturn: ILoggedPerson = {
      id: person.id,
      name: person.name,
      userName: person.userName,
      token,
    }

    return loggedPersonToReturn;
  } catch (error) {
    return `Ocorreu um erro no servidor ao efetuar login. ${error}`;
  }
};

const testTokenIsActive = async (token: string): Promise<IToken | string> => {
  try {
    const decodedToken = await verifyToken(token);
    if (!decodedToken) return "Token inválido.";

    return decodedToken;
  } catch (error) {
    return `Ocorreu um erro ao verificar validade do token. ${error}`;
  }
};

export {
  findAllPeople,
  findPersonById,
  findPersonByUserName,
  createNewPerson,
  updatePerson,
  deletePerson,
  login,
  testTokenIsActive,
};