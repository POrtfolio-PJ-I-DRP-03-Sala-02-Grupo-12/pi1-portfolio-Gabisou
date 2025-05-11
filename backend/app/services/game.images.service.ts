import { ResultSetHeader } from "mysql2";
import { gameImageModel } from "../models";
import IGameImage from "../interfaces/IGameImage";

const findAllGameImages = async (): Promise<IGameImage[] | string> => {
  try {
    const gameImages: IGameImage[] | null = await gameImageModel.findAll();

    if (!gameImages || gameImages.length === 0) return 'Não encontramos imagens cadastradas'; 

    return gameImages;
  } catch (error) {
    return `Ocorreu um erro na busca: ${error}`;
  }
};

const findGameImageById = async (idToSearch: number): Promise<IGameImage | string> => {
  try {
    const gameImage: IGameImage | null = await gameImageModel.findById(idToSearch);

    if (!gameImage || gameImage === null) {
      return `Não conseguimos encontrar o jogo pelo id ${idToSearch}`;
    }

    return gameImage;
  } catch (error) {
    return `Ocorreu um erro na busca: ${error}`;
  }
};

const createNewImage = async (gameImage: IGameImage): Promise<IGameImage | string> => {
  try {
    const newGameImage: IGameImage | null = await gameImageModel.createNewImage(gameImage);

    if (!newGameImage || !newGameImage.id || newGameImage === null) {
      return `Não foi possível cadastrar a imagem com os seguintes dados:
        título: ${gameImage.title}
        descrição: ${gameImage.description}
        url: ${gameImage.url}
        id do jogo relacionado: ${gameImage.gameId}
      `;
    }

    return newGameImage;
  } catch (error) {
    return `Ocorreu um erro no registro de nova imagem: ${error}`;
  }
};

const updateGameImage = async (imageToUpdate: IGameImage, id: number): Promise<ResultSetHeader | string> => {
  try {
    const updatedImage: ResultSetHeader | null = await gameImageModel
    .updateImage(imageToUpdate, id);

    if (!updatedImage) return `Não foi possível alterar os dados da imagem com o id ${id}`;

    console.log(updatedImage);
    
    return updatedImage;
  } catch (error) {
    return `Ocorreu um erro na alteração de dados da imagem. ${error}`;
  }
};

const deleteGameImage = async (id: number): Promise<ResultSetHeader | string> => {
  try {
    const excludedImage: ResultSetHeader | null = await gameImageModel.deleteImage(id);

    if (!excludedImage) {
      return `Não foi possível excluir dados da imagem com o id ${id}`;
    }

    console.log(excludedImage);
    
    return excludedImage;
  } catch (error) {
    return `Ocorreu um erro ao tentar excluir a imagem do banco de dados. ${error}`;
  }
};

export {
  findAllGameImages,
  findGameImageById,
  createNewImage,
  updateGameImage,
  deleteGameImage,
};