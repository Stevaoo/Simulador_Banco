import { Icliente, IContaBancaria } from "./interfaces";
let rl = require("readline-sync");

export class User implements Icliente {
    Id: number;
    Nome: string;
    Email: string;
    Senha: number;
    Salto: number;

    constructor(Id: number, Nome: string, Email: string, Senha: number, Salto: number) {
        this.Id = Id;
        this.Nome = Nome;
        this.Email = Email;
        this.Senha = Senha;
        this.Salto = Salto;
    }

    Depositar(valor: number): void {
        if (valor <= 0) throw new Error('O valor do depósito deve ser positivo.');
        this.Salto += valor;
        console.log(`Depósito de R$${valor} realizado. Novo saldo: R$${this.Salto}`);
    }

    Sacar(valor: number): void {
        if (valor <= 0) throw new Error('O valor do saque deve ser positivo.');
        if (valor > this.Salto) throw new Error('Saldo insuficiente.');
        this.Salto -= valor;
        console.log(`Saque de R$${valor} realizado. Novo saldo: R$${this.Salto}`);
    }

    Transferir(valor: number, contaDestino: User): void {
        if (valor <= 0) throw new Error('O valor da transferência deve ser positivo.');
        if (valor > this.Salto) throw new Error('Saldo insuficiente para transferência.');
        this.Sacar(valor);
        contaDestino.Depositar(valor);
        console.log(`Transferência de R$${valor} realizada para ${contaDestino.Nome}.`);
    }
}

function criarConta(): User {
    let id = rl.questionInt("Insira o ID do usuário: ");
    let nome = rl.question("Insira o nome do usuário: ");
    let email = rl.question("Insira o email do usuário: ");
    let senha = rl.questionInt("Insira a senha do usuário: ");
    let saldo = rl.questionFloat("Insira o saldo inicial do usuário: ");
    
    let user = new User(id, nome, email, senha, saldo);
    console.log(`Conta criada para ${nome} com saldo de R$${saldo}.`);
    return user;
}

// Menu interativo
let menu: boolean = true;
let user: User | null = null; // Variável para armazenar a conta do usuário

while (menu) {
    try {
        let opcao = rl.questionInt("\nInsira o número da opção desejada:\n 1 - Criar Conta\n 2 - Depositar\n 3 - Sacar\n 4 - Transferir\n 5 - Extrato\n 6 - Sair\n");

        switch (opcao) {
            case 1:
                user = criarConta();
                break;
            case 2: // Depositar
                if (user) {
                    let valor = rl.questionFloat("Insira o valor do depósito: ");
                    user.Depositar(valor);
                } else {
                    console.log("Nenhuma conta criada. Escolha a opção 1 para criar uma conta.");
                }
                break;
            case 3: // Saque
                if (user) {
                    let valor = rl.questionFloat("Insira o valor do saque: ");
                    user.Sacar(valor);
                } else {
                    console.log("Nenhuma conta criada. Escolha a opção 1 para criar uma conta.");
                }
                break;
            case 4: // Trasferir
                if (user) {
                    let idDestino = rl.questionInt("Insira o ID da conta de destino: ");
                    let valor = rl.questionFloat("Insira o valor da transferência: ");
                    let contaDestino = new User(idDestino, "Destinatário", "destino@example.com", 1234, 0); // Exemplo de criação de conta destino
                    user.Transferir(valor, contaDestino);
                } else {
                    console.log("Nenhuma conta criada. Escolha a opção 1 para criar uma conta.");
                }
                break;
            case 5: // Extrato
                if (user) {
                    console.log(`Saldo atual: R$${user.Salto}`);
                } else {
                    console.log("Nenhuma conta criada. Escolha a opção 1 para criar uma conta.");
                }
                break;
            case 6: // Sair
                menu = false;
                console.log("Saindo do sistema.");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }
    } catch (error) {
        console.log("Ocorreu um erro: " + error.message);
        console.log("Por favor, tente novamente.");
    }
}

