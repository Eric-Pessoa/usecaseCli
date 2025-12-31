#!/usr/bin/env node

import { intro, outro, text, select, confirm, isCancel } from "@clack/prompts";
import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let testFilePath;
let dtoFilePath;
let useCaseFilePath;
let indexFilePath;

let modifiedDtoNamespace;
let modifiedUsecaseClass;

let templates;

function getFileTemplatesBasedOnUsecaseType(usecaseType) {
  try {
    const basePath = path.join(__dirname, "templates", usecaseType);

    const testFileContent = fs.readFileSync(
      path.join(basePath, "test.spec.ts"),
      "utf-8"
    );

    const dtoFileContent = fs.readFileSync(
      path.join(basePath, "dto.ts"),
      "utf-8"
    );

    const useCaseFileContent = fs.readFileSync(
      path.join(basePath, "useCase.ts"),
      "utf-8"
    );

    const indexFileContent = fs.readFileSync(
      path.join(basePath, "index.ts"),
      "utf-8"
    );

    return {
      testFileContent,
      dtoFileContent,
      useCaseFileContent,
      indexFileContent,
    };
  } catch (err) {
    console.error("Erro ao carregar templates:", err);
    process.exit(1);
  }
}

function createUsecaseFiles(usecaseName, usecaseType) {
  try {
    fs.mkdirSync(`./${usecaseName}`, { recursive: true });

    templates = getFileTemplatesBasedOnUsecaseType(usecaseType);

    testFilePath = `./${usecaseName}/${usecaseName}.spec.ts`;
    dtoFilePath = `./${usecaseName}/${usecaseName}DTO.ts`;
    useCaseFilePath = `./${usecaseName}/${usecaseName}UseCase.ts`;
    indexFilePath = `./${usecaseName}/index.ts`;

    fs.writeFileSync(testFilePath, templates.testFileContent);
    fs.writeFileSync(dtoFilePath, templates.dtoFileContent);
    fs.writeFileSync(useCaseFilePath, templates.useCaseFileContent);
    fs.writeFileSync(indexFilePath, templates.indexFileContent);
  } catch (err) {
    console.error(err);
  }
}

function replaceDtoKeywords() {
  try {
    const modifiedContent = templates.dtoFileContent.replace(
      "DTO",
      modifiedDtoNamespace
    );

    fs.writeFileSync(dtoFilePath, modifiedContent);
  } catch (err) {
    console.error(err);
  }
}

function replaceUsecaseKeywords() {
  try {
    const modifiedContent = templates.useCaseFileContent
      .replace(/DTO/g, modifiedDtoNamespace)
      .replace(/Usecase/g, modifiedUsecaseClass)
      .replace(/dto/g, modifiedDtoNamespace);

    fs.writeFileSync(useCaseFilePath, modifiedContent);
  } catch (err) {
    console.error(err);
  }
}

function replaceTestKeywords() {
  try {
    const modifiedContent = templates.testFileContent
      .replace(/DTO/g, modifiedDtoNamespace)
      .replace(/dto/g, modifiedDtoNamespace)
      .replace(/Usecase/g, modifiedUsecaseClass)
      .replace(/\.\/useCase/g, `./${modifiedUsecaseClass}`);

    fs.writeFileSync(testFilePath, modifiedContent);
  } catch (err) {
    console.error(err);
  }
}

function replaceIndexKeywords() {
  const lowercaseFirst = (str) =>
    `${str.charAt(0).toLowerCase()}${str.slice(1)}`;

  try {
    const modifiedContent = templates.indexFileContent
      .replace(/Usecase/g, modifiedUsecaseClass)
      .replace(/useCase/g, modifiedUsecaseClass)
      .replace(/usecaseInstance/g, lowercaseFirst(modifiedUsecaseClass));

    fs.writeFileSync(indexFilePath, modifiedContent);
  } catch (err) {
    console.error(err);
  }
}

function replaceKeywordsHandler(usecaseName) {
  modifiedDtoNamespace = `${usecaseName}DTO`;
  modifiedUsecaseClass = `${usecaseName}Usecase`;

  replaceDtoKeywords();
  replaceUsecaseKeywords();
  replaceTestKeywords();
  replaceIndexKeywords();
}

async function main() {
  console.clear();

  intro("Criador de usecase");

  const usecaseName = await text({
    message: "Qual o nome do usecase? Considere maiúsculas e minúsculas.",
  });

  const usecaseType = await select({
    message: "Qual tipo de usecase você quer criar?",
    options: [
      { value: "get", label: "GET" },
      { value: "post", label: "POST" },
      { value: "put", label: "PUT" },
      { value: "delete", label: "DELETE" },
    ],
  });

  createUsecaseFiles(usecaseName, usecaseType);

  replaceKeywordsHandler(usecaseName);

  outro("Finalizado");
}

main().catch(console.error);
