import { FieldPacket, RowDataPacket } from "mysql2";
import IPerson from "../interfaces/IPerson";
import connection from "./connection";

const findAll = async (): Promise<IPerson[]> => {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      'SELECT * FROM people;',
    );

    return rows as IPerson[];
};

const findById = async (idToSearch: number) => {
  try {
    const foundPerson = await connection.execute(
      `SELECT * FROM people
        WHERE id = ?;
      `,
      [idToSearch]
    );
  
    if (!foundPerson) return null;
  
    return foundPerson;  
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const findByUserName = async (userName: string) => {
    try {
      const person = await connection.execute(
        `SELECT * FROM people WHERE user_name = ?;
        `,
        [userName],
      );

      if (!person) return null;
      
      return person[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
};

const createNewPerson = async (person: IPerson) => {
  try {
    const { name, userName, password } = person;

    const newPerson = await connection.execute(
      `INSERT INTO people (name, user_name, password)
        VALUES (?, ?, ?);
      `,
      [name, userName, password]
    );

    if (!newPerson) return null
  } catch (error) {
    throw new Error((error as Error).message)
  }
};

const updatePerson = async (personToUpdate: IPerson, id: number) => {
  try {
    const { name, userName, password } = personToUpdate;

    const updatedPerson = await connection.execute(
      `
        UPDATE people
        SET name = ?, user_name = ?, password = ?
        WHERE id = ?;
      `,
      [name, userName, password, id]
    );

    if (!updatedPerson) return null;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const deletePerson = async (id: number) => {
  try {
    const excludedPerson = await connection.execute(
      `
        DELETE FROM people
        WHERE id = ?
      `,
      [id]
    );

    if (!excludedPerson) return null;

    return excludedPerson;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export {
    findAll,
    findById,
    findByUserName,
    createNewPerson,
    updatePerson,
    deletePerson,
}
