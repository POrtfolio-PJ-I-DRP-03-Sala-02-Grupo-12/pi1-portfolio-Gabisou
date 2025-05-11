import { ResultSetHeader } from "mysql2";
import IPerson from "../interfaces/IPerson";
import { personModel } from "../models";

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

const createNewPerson = async (person: IPerson): Promise<IPerson | string> => {
  try {
    const newPerson: IPerson | null = await personModel.createNewPerson(person);

    if (!newPerson || !newPerson.id || newPerson === null) {
      return `Não foi possível cadastrar a pessoa com os seguintes dados:
        nome: ${person.name}
        nome de usuária: ${person.userName}
      `;
    }

    delete newPerson.password;

    return newPerson;
  } catch (error) {
    return `Ocorreu um erro no registro de novo usuário: ${error}`;
  }
};

const updatePerson = async (personToUpdate: IPerson, id: number): Promise<ResultSetHeader | string> => {
  try {
    const updatedPerson: ResultSetHeader | null = await personModel
    .updatePerson(personToUpdate, id);

    if (!updatedPerson) return `Não foi possível alterar os dados da pessoa com o id ${id}`;

    console.log(updatedPerson);
    
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

    console.log(excludedPerson);
    
    return excludedPerson;
  } catch (error) {
    return `Ocorreu um erro ao tentar excluir um usuário do banco de dados. ${error}`;
  }
};

export {
  findAllPeople,
  findPersonById,
  findPersonByUserName,
  createNewPerson,
  updatePerson,
};