import IGameImage from "../interfaces/IGameImage";
import connection from "./connection";

const findAll = async () => {
    const games = await connection.execute(
      'SELECT * FROM game_images;'
    );

    return games;
};

const findById = async (idToSearch: number) => {
  try {
    const foundGameImage = await connection.execute(
      `
        SELECT * FROM game_images
        WHERE id = ?;
      `,
      [idToSearch]
    );
  
    if (!foundGameImage) return null;
  
    return foundGameImage;  
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const createNewImage = async (image: IGameImage) => {
  try {
    const { title, description, url, gameId } = image;

    const newImage = await connection.execute(
      `INSERT INTO game_images (title, description, url, game_id)
        VALUES (?, ?, ?, ?);
      `,
      [title, description, url, gameId]
    );

    if (!newImage) return null
  } catch (error) {
    throw new Error((error as Error).message)
  }
};

const updateImage = async (imageToUpdate: IGameImage, id: number) => {
  try {
    const { title, description, url, gameId } = imageToUpdate;

    const updatedImage = await connection.execute(
      `
        UPDATE game_images
        SET title = ?, description = ?, url = ?, game_id = ?
        WHERE id = ?;
      `,
      [title, description, url, gameId, id]
    );

    if (!updatedImage) return null;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const deleteImage = async (id: number) => {
  try {
    const excludedImage = await connection.execute(
      `
        DELETE FROM game_images
        WHERE id = ?
      `,
      [id]
    );

    if (!excludedImage) return null;

    return excludedImage;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export {
    findAll,
    findById,
    createNewImage,
    updateImage,
    deleteImage,
}
