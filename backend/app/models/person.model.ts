import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import IPerson from "../interfaces/IPerson";
import connection from "./connection";

const findAll = async (): Promise<IPerson[]> => {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      'SELECT * FROM people;',
    );

    return rows as IPerson[];
};

const findById = async (idToSearch: number): Promise<IPerson | null> => {
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      `SELECT * FROM people
        WHERE id = ?;
      `,
      [idToSearch]
    );
  
    if (!rows[0] || rows.length === 0) return null;
  
    return rows[0] as IPerson;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const findByUserName = async (userName: string): Promise<IPerson | null> => {
    try {
      const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
        `SELECT * FROM people WHERE user_name = ?;
        `,
        [userName],
      );

      if (!rows[0] || rows.length === 0) return null;
      
      return rows[0] as IPerson;
    } catch (error) {
      throw new Error((error as Error).message);
    }
};

const createNewPerson = async (person: IPerson) => {
  try {
    const { name, userName, password } = person;

    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      `INSERT INTO people (name, user_name, password)
        VALUES (?, ?, ?);
      `,
      [name, userName, password]
    );

    if (!result) return null

    return {
      id: result.insertId,
      ...person,
    };
  } catch (error) {
    throw new Error((error as Error).message)
  }
};

const updatePerson = async (personToUpdate: IPerson, id: number): Promise<ResultSetHeader | null> => {
  try {
    const { name, userName, password } = personToUpdate;

    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      `
        UPDATE people
        SET name = ?, user_name = ?, password = ?
        WHERE id = ?;
      `,
      [name, userName, password, id]
    );

    if (!result) return null;

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const deletePerson = async (id: number): Promise<ResultSetHeader | null> => {
  try {
    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
      `
        DELETE FROM people
        WHERE id = ?
      `,
      [id]
    );

    if (!result) return null;

    return result;
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
