"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const bCrypt = __importStar(require("bcryptjs"));
const jsonWebToken_1 = require("../helpers/jsonWebToken");
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
        const encryptedPassword = yield bCrypt.hash(person.password, 10);
        console.log(encryptedPassword);
        console.log(encryptedPassword.length);
        person.password = encryptedPassword;
        const newPerson = yield models_1.personModel.createNewPerson(Object.assign(Object.assign({}, person), { id: 0 }));
        if (!newPerson || !newPerson.id || newPerson === null) {
            return `Não foi possível cadastrar a pessoa com os seguintes dados:
        nome: ${person.name}
        nome de usuária: ${person.userName}
      `;
        }
        const token = yield (0, jsonWebToken_1.generate)({
            id: newPerson.id,
            name: newPerson.name,
            userName: newPerson.userName,
        });
        delete newPerson.password;
        const personWithToken = Object.assign(Object.assign({}, newPerson), { token });
        return personWithToken;
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
