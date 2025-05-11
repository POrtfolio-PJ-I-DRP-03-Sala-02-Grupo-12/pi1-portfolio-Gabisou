import { ResultSetHeader } from "mysql2";
import { gameModel } from "../models";
import IGame from "../interfaces/IGame";

const findAllGames = async (): Promise<IGame[] | string> => {
  try {
    const games: IGame[] | null = await gameModel.findAll();

    if (!games || games.length === 0) return 'Não encontramos jogos cadastrados'; 

    return games;
  } catch (error) {
    return `Ocorreu um erro na busca: ${error}`;
  }
};

const findGameById = async (idToSearch: number): Promise<IGame | string> => {
  try {
    const game: IGame | null = await gameModel.findById(idToSearch);

    if (!game || game === null) {
      return `Não conseguimos encontrar o jogo pelo id ${idToSearch}`;
    }

    return game;
  } catch (error) {
    return `Ocorreu um erro na busca: ${error}`;
  }
};

const createNewGame = async (game: IGame): Promise<IGame | string> => {
  try {
    const newGame: IGame | null = await gameModel.createNewGame(game);

    if (!newGame || !newGame.id || newGame === null) {
      return `Não foi possível cadastrar o jogo com os seguintes dados:
        título: ${game.title}
        descrição: ${game.description}
        nome do link: ${game.linkName}
        url do link: ${game.linkUrl}
      `;
    }

    return newGame;
  } catch (error) {
    return `Ocorreu um erro no registro de novo jogo: ${error}`;
  }
};

const updateGame = async (gameToUpdate: IGame, id: number): Promise<ResultSetHeader | string> => {
  try {
    const updatedGame: ResultSetHeader | null = await gameModel
    .updateGame(gameToUpdate, id);

    if (!updatedGame) return `Não foi possível alterar os dados do jogo com o id ${id}`;

    console.log(updatedGame);
    
    return updatedGame;
  } catch (error) {
    return `Ocorreu um erro na alteração de dados do jogo. ${error}`;
  }
};

const deleteGame = async (id: number): Promise<ResultSetHeader | string> => {
  try {
    const excludedGame: ResultSetHeader | null = await gameModel.deleteGame(id);

    if (!excludedGame) {
      return `Não foi possível excluir dados do jogo com o id ${id}`;
    }

    console.log(excludedGame);
    
    return excludedGame;
  } catch (error) {
    return `Ocorreu um erro ao tentar excluir o jogo do banco de dados. ${error}`;
  }
};

export {
  findAllGames,
  findGameById,
  createNewGame,
  updateGame,
  deleteGame,
};