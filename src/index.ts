/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);


	// CÓDIGO PARA ATENDER OS REQUERIMENTOS
	// R01, R02, R03, R04, R05

	const { Client } = require('pg');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Aluno {
  nome: string;
  modalidade: string;
}

const alunos: Aluno[] = [];
const cursos: string[] = [];


const cadastrarAlunos = (quantidade: number, contador = 0) => {
  if (contador < quantidade) {
    rl.question(`Digite o nome do aluno ${contador + 1}: `, (nome) => {
      rl.question(`Digite o curso do aluno ${contador + 1}: `, (modalidade) => {
        alunos.push({ nome, modalidade });
        cursos.push(modalidade);
        cadastrarAlunos(quantidade, contador + 1);
      });
    });
  } else {
    console.log('Alunos cadastrados:');
    alunos.forEach((aluno) => {
      console.log(`- Nome: ${aluno.nome}`);
      console.log(`- Curso: ${aluno.modalidade}`);
    });
    if (alunos.length > 0) {
      inserirNoBanco();
    }
    rl.close();
  }
};

const inserirNoBanco = async () => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123',
    port: 5432,
  });

  try {
    await client.connect();

    // // Criação da tabela 'alunos' se ela não existir
    // await client.query(`
    //   CREATE TABLE IF NOT EXISTS alunosLista (
    //     id SERIAL PRIMARY KEY,
    //     nome VARCHAR(100) NOT NULL
    //   )
    // `);

    // await client.query(`
    //   CREATE TABLE IF NOT EXISTS cursos (
    //     id SERIAL PRIMARY KEY,
    //     modalidade VARCHAR(100) NOT NULL
    //   )
    // `);

    for (const aluno of alunos) {
      const query = 'INSERT INTO alunosLista (nome) VALUES ($1)';
      const values = [aluno.nome];

      await client.query(query, values);
    }
    for (const curso of cursos) {
      const query = 'INSERT INTO cursos (modalidade) VALUES ($1)';
      const values = [curso];

      await client.query(query, values);
    }
  
    console.log('Nomes dos alunos inseridos no banco de dados com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir os nomes dos alunos no banco de dados:', error);
  } finally {
    await client.end();
  }
};

rl.question('Quantos alunos deseja inserir? ', (quantidade) => {
  const quantidadeNumber = Number(quantidade);
  if (isNaN(quantidadeNumber)) {
    console.log('Quantidade inválida, tente novamente!');
    rl.close();
  } else {
    console.log(`A quantidade digitada foi: ${quantidadeNumber}`);
    cadastrarAlunos(quantidadeNumber);
  }
});
	
});
