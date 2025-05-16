import { Request, Response } from "express";
import IGameImage from "../interfaces/IGameImage";
import { gameImagesService } from "../services";


const findAllGameImages = async (req: Request, res: Response) => {
  try {
    const gamesImages: IGameImage[] | string = await gameImagesService
      .findAllGameImages();
  
    if (gamesImages && gamesImages.length > 0) {
      res.status(200).json(gamesImages);
    } else if (typeof gamesImages === "string") {
      res.status(404).json({ message: gamesImages });
    } else {
      res.status(400).json({ message: "Problema na busca por imagens de jogos." });
    }  
  } catch (error) {
    res.status(500).json({
      message: `Erro no servidor ao listar imagens de jogos: ${error}`
    });
  }
};

const findGameImageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const image: IGameImage | string = await gameImagesService
      .findGameImageById(Number(id));
  
    if (image && typeof image === "object") {
      res.status(200).json(image);
    } else if (typeof image === "string") {
      res.status(404).json({ message: image });
    } else {
      res.status(400).json({ message: `Problema na busca pelo id ${id}.` });
    }  
  } catch (error) {
    res.status(500).json({ message: `Erro no servidor ao buscar uma imagem: ${error}` });
  }
};

const createNewImage = async (req: Request, res: Response) => {
  try {
    const receivedImage = req.body;

    const newGameImage = await gameImagesService.createNewImage(receivedImage);

    if (typeof newGameImage === "string") {
      res.status(400).json({ message: newGameImage });
      return;
    }

    res.status(201).json({
      message: "Cadastro realizado com sucesso.",
      game: newGameImage,
    });
  } catch (error) {
    res.status(500).json({ mesage: `Erro ao tentar salvar nova imagem. Erro: ${error}` });
  }
};

const updateGameImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
  
    let receivedGameImage = req.body;
  
    const imageToUpdate = await gameImagesService.findGameImageById(Number(id));
  
    if (typeof imageToUpdate === "string") {
      res.status(404).json({ message: imageToUpdate });
      return;
    }

    receivedGameImage = {
      ...imageToUpdate,
      ...receivedGameImage,
    }
  
    const updatedImage = await gameImagesService
      .updateGameImage(receivedGameImage, Number(id));
  
    if (updatedImage && typeof updatedImage === "string") {
      res.status(400).json({ message: updatedImage });
      return;
    }
  
    res.status(202).json({ message: "Cadastro alterado com sucesso", receivedGameImage });
  } catch (error) {
    res.status(500).json({ mesage: `Erro ao alterar dados da imagem. Erro: ${error}` });
  }
};

const deleteGameImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
  
    const imageToExclude = gameImagesService.findGameImageById(Number(id));

    if (imageToExclude && typeof imageToExclude === "string") {
      res.status(404).json({ message: imageToExclude });
      return;
    }

    const exclusionTry = await gameImagesService.deleteGameImage(Number(id));

    if (exclusionTry && typeof exclusionTry === "string") {
      res.status(400).json({ message: exclusionTry });
      return;
    }

    res.status(202).json({ message: `Dados de imagem com id ${id} apagados com sucesso.` });
  } catch (error) {
    res.status(500).json({ mesage: `Erro ao apagar dados de imagem. Erro: ${error}` });
  }
};

export {
  findAllGameImages,
  findGameImageById,
  createNewImage,
  updateGameImage,
  deleteGameImage,
};