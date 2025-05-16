"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.updatePerson = exports.createNewPerson = exports.findPersonByUserName = exports.findPersonById = exports.findAllPeople = void 0;
const services_1 = require("../services");
const findAllPeople = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const people = yield services_1.peopleService.findAllPeople();
        if (people && people.length > 0) {
            res.status(200).json(people);
        }
        else if (typeof people === "string") {
            res.status(404).json({ message: people });
        }
        else {
            res.status(400).json({ message: "Problema na busca por pessoas." });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Erro no servidor: ${error}` });
    }
});
exports.findAllPeople = findAllPeople;
const findPersonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const person = yield services_1.peopleService.findPersonById(Number(id));
        if (person && typeof person === "object") {
            res.status(200).json(person);
        }
        else if (typeof person === "string") {
            res.status(404).json({ message: person });
        }
        else {
            res.status(400).json({ message: `Problema na busca pelo id ${id}.` });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Erro no servidor: ${error}` });
    }
});
exports.findPersonById = findPersonById;
const findPersonByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userName } = req.query;
        userName = JSON.stringify(userName);
        if (!userName || userName.length === 0) {
            res.status(400).json({ message: "Você precisa informar um nome de usuário para realizar a busca." });
            return;
        }
        const person = yield services_1.peopleService.findPersonByUserName(userName);
        if (!person) {
            res.status(400).json({ message: `Ocorreu um erro na busca pelo nome de usuário ${userName}` });
            return;
        }
        else if (typeof person === "string") {
            res.status(404).json({ message: person });
        }
        else {
            res.status(200).json(person);
        }
    }
    catch (error) {
        res.status(500).json({ message: `Erro no servidor ao buscar por nome: ${error}` });
    }
});
exports.findPersonByUserName = findPersonByUserName;
const createNewPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedPerson = req.body;
        const existingPerson = yield services_1.peopleService.findPersonByUserName(receivedPerson.userName);
        if (existingPerson
            && typeof existingPerson === "object") {
            res.status(403).json({ message: `Já existe pessoa cadastrada com o nome de usuária ${receivedPerson.userName}` });
            return;
        }
        const newPerson = yield services_1.peopleService.createNewPerson(receivedPerson);
        res.status(201).json({
            message: "Cadastro realizado com sucesso.",
            person: newPerson,
        });
    }
    catch (error) {
        res.status(500).json({ mesage: `Erro ao tentar salvar nova pessoa. Erro: ${error}` });
    }
});
exports.createNewPerson = createNewPerson;
const updatePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let receivedPerson = req.body;
        const personToUpdate = yield services_1.peopleService.findPersonById(Number(id));
        if (typeof personToUpdate === "string") {
            res.status(404).json({ message: personToUpdate });
            return;
        }
        if (!receivedPerson.userName || receivedPerson.userName.length === 0) {
            receivedPerson = Object.assign(Object.assign({}, receivedPerson), { userName: personToUpdate.user_name });
        }
        const personWithSameUserName = yield services_1.peopleService.findPersonByUserName(receivedPerson.userName);
        if (personWithSameUserName
            && typeof personWithSameUserName === "object"
            && personWithSameUserName.id !== Number(id)) {
            res.status(403).json({ message: `Nome de usuário já utilizado por outra pessoa, id ${personWithSameUserName.id}` });
            return;
        }
        if (personToUpdate && typeof personToUpdate === "object") {
            receivedPerson = Object.assign(Object.assign({}, personToUpdate), receivedPerson);
        }
        const updatedPerson = yield services_1.peopleService.updatePerson(receivedPerson, Number(id));
        if (updatedPerson && typeof updatedPerson === "string") {
            res.status(400).json({ message: updatedPerson });
            return;
        }
        res.status(202).json({ message: "Cadastro alterado com sucesso", receivedPerson });
    }
    catch (error) {
        res.status(500).json({ mesage: `Erro ao alterar dados de pessoa. Erro: ${error}` });
    }
});
exports.updatePerson = updatePerson;
const deletePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const personToExclude = services_1.peopleService.findPersonById(Number(id));
        if (personToExclude && typeof personToExclude === "string") {
            res.status(404).json({ message: personToExclude });
            return;
        }
        const exclusionTry = yield services_1.peopleService.deletePerson(Number(id));
        if (exclusionTry && typeof exclusionTry === "string") {
            res.status(400).json({ message: exclusionTry });
            return;
        }
        res.status(202).json({ message: "Dados de pessoa apagados com sucesso.", person: personToExclude });
    }
    catch (error) {
        res.status(500).json({ mesage: `Erro ao apagar dados de pessoa. Erro: ${error}` });
    }
});
exports.deletePerson = deletePerson;
