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
const models_1 = require("../models");
const findAllPeople = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield models_1.personModel.findAll();
        if (!response || response.length === 0)
            return 'Não encontramos pessoas registradas';
        const people = response.map((person) => {
            delete person.password;
            return person;
        });
        return people;
    }
    catch (error) {
        return `Ocorreu um erro na busca: ${error}`;
    }
});
exports.findAllPeople = findAllPeople;
const findPersonById = (idToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield models_1.personModel.findById(idToSearch);
        if (!person || person === null) {
            return `Não conseguimos encontrar a pessoa pelo id ${idToSearch}`;
        }
        delete person.password;
        return person;
    }
    catch (error) {
        return `Ocorreu um erro na busca: ${error}`;
    }
});
exports.findPersonById = findPersonById;
const findPersonByUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield models_1.personModel.findByUserName(userName);
        if (!person || person === null) {
            return `Não conseguimos encontrar a pessoa com o nome de usuária ${userName}`;
        }
        delete person.password;
        return person;
    }
    catch (error) {
        return `Ocorreu um erro na busca: ${error}`;
    }
});
exports.findPersonByUserName = findPersonByUserName;
const createNewPerson = (person) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPerson = yield models_1.personModel.createNewPerson(person);
        if (!newPerson || !newPerson.id || newPerson === null) {
            return `Não foi possível cadastrar a pessoa com os seguintes dados:
        nome: ${person.name}
        nome de usuária: ${person.userName}
      `;
        }
        delete newPerson.password;
        return newPerson;
    }
    catch (error) {
        return `Ocorreu um erro no registro de novo usuário: ${error}`;
    }
});
exports.createNewPerson = createNewPerson;
const updatePerson = (personToUpdate, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPerson = yield models_1.personModel
            .updatePerson(personToUpdate, id);
        if (!updatedPerson)
            return `Não foi possível alterar os dados da pessoa com o id ${id}`;
        return updatedPerson;
    }
    catch (error) {
        return `Ocorreu um erro na alteração de dados de usuário. ${error}`;
    }
});
exports.updatePerson = updatePerson;
const deletePerson = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const excludedPerson = yield models_1.personModel.deletePerson(id);
        if (!excludedPerson) {
            return `Não foi possível excluir dados da pessoa com o id ${id}`;
        }
        return excludedPerson;
    }
    catch (error) {
        return `Ocorreu um erro ao tentar excluir um usuário do banco de dados. ${error}`;
    }
});
exports.deletePerson = deletePerson;
