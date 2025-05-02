import IPerson from "../interfaces/IPerson";
import connection from "./connection";

const findAll = async () => {
    const people = await connection.execute(
      'SELECT * FROM people',
    );

    return people;
};

const findByUserName = async (userName: string) => {
    try {
      const person= await connection.execute(
        `SELECT  FROM PEOPLE
            WHERE user_name = ?
        `,
        [userName],
      );

      if (!person) return null;

      return person;
    } catch (error) {
      throw new Error((error as Error).message);
    }
};

const createNewPerson = async (person: IPerson) => {
  
};

export {
    findAll,
}