import IPerson from "../interfaces/IPerson";
import connection from "./connection";

const findAll = async () => {
    const people = await connection.execute(
        'SELECT * FROM people',
    );

    return people;
};

const createNewPerson = async (person: IPerson) => {
    
};

export {
    findAll,
}