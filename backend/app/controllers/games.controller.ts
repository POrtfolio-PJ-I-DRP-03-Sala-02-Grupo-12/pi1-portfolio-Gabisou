import { Request, Response } from "express";
import IGame from "../interfaces/IGame";
import { gamesService } from "../services";


const findAllGames = async (req: Request, res: Response) => {
  try {
    const games: IGame[] | string = await gamesService.findAllGames();
  
    if (games && games.length > 0) {
      res.status(200).json(games);
    } else if (typeof games === "string") {
      res.status(404).json({ message: games });
    } else {
      res.status(400).json({ message: "Problema na busca por jogos." });
    }  
  } catch (error) {
    res.status(500).json({ message: `Erro no servidor ao listar jogos: ${error}` });
  }
};

const findGameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game: IGame | string = await gamesService.findGameById(Number(id));
  
    if (game && typeof game === "object") {
      res.status(200).json(game);
    } else if (typeof game === "string") {
      res.status(404).json({ message: game });
    } else {
      res.status(400).json({ message: `Problema na busca pelo id ${id}.` });
    }  
  } catch (error) {
    res.status(500).json({ message: `Erro no servidor ao buscar um jogo: ${error}` });
  }
};

const createNewGame = async (req: Request, res: Response) => {
  try {
    const receivedGame = req.body;

    const newGame = await gamesService.createNewGame(receivedGame);

    if (typeof newGame === "string") {
      res.status(400).json({ message: newGame });
      return;
    }

    res.status(201).json({
      message: "Cadastro realizado com sucesso.",
      game: newGame,
    });
  } catch (error) {
    res.status(500).json({ mesage: `Erro ao tentar salvar novo jogo. Erro: ${error}` });
  }
};

const updateGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
  
    let receivedGame = req.body;
  
    const gameToUpdate = await gamesService.findGameById(Number(id));
  
    if (typeof gameToUpdate === "string") {
      res.status(404).json({ message: gameToUpdate });
      return;
    }

    receivedGame = {
      ...gameToUpdate,
      ...receivedGame,
    }
  
    const updatedGame = await gamesService.updateGame(receivedGame, Number(id));
  
    if (updatedGame && typeof updatedGame === "string") {
      res.status(400).json({ message: updatedGame });
      return;
    }
  
    res.status(202).json({ message: "Cadastro alterado com sucesso", receivedGame });
  } catch (error) {
    res.status(500).json({ mesage: `Erro ao alterar dados de jogo. Erro: ${error}` });
  }
};

const deleteGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
  
    const gameToExclude = gamesService.findGameById(Number(id));

    if (gameToExclude && typeof gameToExclude === "string") {
      res.status(404).json({ message: gameToExclude });
      return;
    }

    const exclusionTry = await gamesService.deleteGame(Number(id));

    if (exclusionTry && typeof exclusionTry === "string") {
      res.status(400).json({ message: exclusionTry });
      return;
    }

    res.status(202).json({ message: `Dados de jogo com id ${id} apagados com sucesso.` });
  } catch (error) {
    res.status(500).json({ mesage: `Erro ao apagar dados de jogo. Erro: ${error}` });
  }
};

export {
  findAllGames,
  findGameById,
  createNewGame,
  updateGame,
  deleteGame,
};