import IGame from "../interfaces/IGame";
import connection from "./connection";

const findAll = async () => {
    const games = await connection.execute(
      'SELECT * FROM games',
    );

    return games;
};

const findById = async (idToSearch: number) => {
  try {
    const foundGame = await connection.execute(
      `SELECT * FROM games
        WHERE id = ?;
      `,
      [idToSearch]
    );
  
    if (!foundGame) return null;
  
    return foundGame;  
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const createNewGame = async (game: IGame) => {
  try {
    const { title, description, linkName, linkUrl } = game;

    const newGame = await connection.execute(
      `INSERT INTO games (title, description, linkName, linkUrl)
        VALUES (?, ?, ?, ?);
      `,
      [title, description, linkName, linkUrl]
    );

    if (!newGame) return null
  } catch (error) {
    throw new Error((error as Error).message)
  }
};

const updateGame = async (gameToUpdate: IGame, id: number) => {
  try {
    const { title, description, linkName, linkUrl } = gameToUpdate;

    const updatedGame = await connection.execute(
      `
        UPDATE games
        SET title = ?, description = ?, link_name = ?, link_url = ?
        WHERE id = ?;
      `,
      [title, description, linkName, linkUrl, id]
    );

    if (!updatedGame) return null;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const deleteGame = async (id: number) => {
  try {
    const excludedGame = await connection.execute(
      `
        DELETE FROM games
        WHERE id = ?
      `,
      [id]
    );

    if (!excludedGame) return null;

    return excludedGame;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export {
    findAll,
    findById,
    createNewGame,
    updateGame,
    deleteGame,
}
