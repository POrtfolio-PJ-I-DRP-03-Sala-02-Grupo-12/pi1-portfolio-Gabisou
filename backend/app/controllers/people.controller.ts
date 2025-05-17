import { Request, Response } from "express";
import { peopleService } from "../services";
import IPerson from "../interfaces/IPerson";
import ILogin from "../interfaces/ILogin";

const findAllPeople = async (req: Request, res: Response) => {
  try {
    const people: IPerson[] | string = await peopleService.findAllPeople();
  
    if (people && people.length > 0) {      
      res.status(200).json(people);
    } else if (typeof people === "string") {
      res.status(404).json({ message: people });
    } else {
      res.status(400).json({ message: "Problema na busca por pessoas." });
    }  
  } catch (error) {
    res.status(500).json({ message: `Erro no servidor: ${error}` });
  }
};

const findPersonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const person: IPerson | string = await peopleService.findPersonById(Number(id));
  
    if (person && typeof person === "object") {      
      res.status(200).json(person);
    } else if (typeof person === "string") {
      res.status(404).json({ message: person });
    } else {
      res.status(400).json({ message: `Problema na busca pelo id ${id}.` });
    }  
  } catch (error) {
    res.status(500).json({ message: `Erro no servidor: ${error}` });
  }
};

const findPersonByUserName = async (req: Request, res: Response) => {
  try {
    let { userName } = req.query;
    
    
    userName = JSON.stringify(userName);

    if (!userName || userName.length === 0) {
      res.status(400).json({ message: "Você precisa informar um nome de usuário para realizar a busca." });
      return;
    }

    const person: IPerson | string = await peopleService.findPersonByUserName(userName);

    if (!person) {
      res.status(400).json({ message: `Ocorreu um erro na busca pelo nome de usuário ${userName}` });
      return;
    } else if (typeof person === "string") {
      res.status(404).json({ message: person });
    } else {
      res.status(200).json(person);
    }
  } catch (error) {
    res.status(500).json({ message: `Erro no servidor ao buscar por nome: ${error}` });
  }
};

const createNewPerson = async (req: Request, res: Response) => {
  try {
    const receivedPerson = req.body;
    
    const existingPerson = await peopleService.findPersonByUserName(receivedPerson.userName);

    if (
      existingPerson
      && typeof existingPerson === "object"
    ) {
      res.status(403).json({ message: `Já existe pessoa cadastrada com o nome de usuária ${receivedPerson.userName}` });
      return;
    }
    
    const newPerson = await peopleService.createNewPerson(receivedPerson);

    res.status(201).json({
      message: "Cadastro realizado com sucesso.",
      person: newPerson,
    });
  } catch (error) {
    res.status(500).json({ mesage: `Erro ao tentar salvar nova pessoa. Erro: ${error}` });
  }
};

const updatePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
  
    let receivedPerson = req.body;
  
    const personToUpdate = await peopleService.findPersonById(Number(id));
  
    if (typeof personToUpdate === "string") {
      res.status(404).json({ message: personToUpdate });
      return;
    }
  
    if (!receivedPerson.userName || receivedPerson.userName.length === 0) {
      receivedPerson = {
        ...receivedPerson,
        userName: personToUpdate.user_name,
      }
    }
  
    const personWithSameUserName = await peopleService.findPersonByUserName(receivedPerson.userName);
    if (
      personWithSameUserName
      && typeof personWithSameUserName === "object"
      && personWithSameUserName.id !== Number(id)
    ) {
      res.status(403).json({ message: `Nome de usuário já utilizado por outra pessoa, id ${personWithSameUserName.id}` });
      return;
    }
  
    if (personToUpdate && typeof personToUpdate === "object") {
      receivedPerson = {
        ...personToUpdate,
        ...receivedPerson,
      };
    }
  
    const updatedPerson = await peopleService.updatePerson(receivedPerson, Number(id));
  
    if (updatedPerson && typeof updatedPerson === "string") {
      res.status(400).json({ message: updatedPerson });
      return;
    }
  
    res.status(202).json({ message: "Cadastro alterado com sucesso", receivedPerson });
  } catch (error) {
    res.status(500).json({ mesage: `Erro ao alterar dados de pessoa. Erro: ${error}` });
  }
};

const deletePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
  
    const personToExclude = peopleService.findPersonById(Number(id));

    if (personToExclude && typeof personToExclude === "string") {
      res.status(404).json({ message: personToExclude });
      return;
    }

    const exclusionTry = await peopleService.deletePerson(Number(id));

    if (exclusionTry && typeof exclusionTry === "string") {
      res.status(400).json({ message: exclusionTry });
      return;
    }

    res.status(202).json({ message: `Dados de pessoa com id ${id} apagados com sucesso.` });
  } catch (error) {
    res.status(500).json({ mesage: `Erro ao apagar dados de pessoa. Erro: ${error}` });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const person: ILogin = req.body;

    const personLogged = await peopleService.login(person);

    if (typeof personLogged === "string") {
      res.status(403).json({ message: personLogged });
      return;
    }

    res.status(200).json({
      message: `Login de usuário ${personLogged.userName} feito com sucesso`,
      person: personLogged
    });
  } catch (error) {
    res.status(500)
      .json({
        message: `Erro no servidor ao tentar efetuar login. Erro: ${error}`
      });
  }
};

const testTokenIsActive = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token || token.length === 0) {
      res.status(400).json({ message: "Token não encontrado na requisição" });
      return;
    }

    const tokenData = await peopleService.testTokenIsActive(token);
    if (typeof tokenData === "string") {
      res.status(403)
        .json({ message: tokenData });
    }

    res.status(200).json({
      message: "O token está ativo.",
      token: tokenData
    });
  } catch (error) {
    res.status(500)
      .json({
        message: `Erro no servidor ao verificar se token está ativo. Erro: ${error}`
      });
  }
};

export {
  findAllPeople,
  findPersonById,
  findPersonByUserName,
  createNewPerson,
  updatePerson,
  deletePerson,
  login,
  testTokenIsActive,
};