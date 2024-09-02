import { Icliente, IContaBancaria } from "./interfaces";
let rl = require("readline-sync");

// Classe que representa um usuário/cliente do banco
export class User implements Icliente {
    Id: number;
    Nome: string;
    Email: string;
    Senha: number;
    Saldo: number;

    // Construtor para inicializar um novo usuário
    constructor(
        Id: number,
        Nome: string,
        Email: string,
        Senha: number,
        Saldo: number
    ) {
        this.Id = Id;
        this.Nome = Nome;
        this.Email = Email;
        this.Senha = Senha;
        this.Saldo = Saldo;
    }

    // Método para depositar um valor na conta
    Depositar(valor: number): void {
        // Verifica se o valor do depósito é positivo
        if (valor <= 0) throw new Error("O valor do depósito deve ser positivo.");
        
        // Adiciona o valor ao saldo da conta
        this.Saldo += valor;
        console.log(
            `Depósito de R$${valor} realizado. Novo saldo: R$${this.Saldo}`
        );
    }

    // Método para sacar um valor da conta
    Sacar(valor: number): void {
        // Verifica se o valor do saque é positivo
        if (valor <= 0) throw new Error("O valor do saque deve ser positivo.");
        
        // Verifica se há saldo suficiente para o saque
        if (valor > this.Saldo) throw new Error("Saldo insuficiente.");
        
        // Subtrai o valor do saldo da conta
        this.Saldo -= valor;
        console.log(`Saque de R$${valor} realizado. Novo saldo: R$${this.Saldo}`);
    }

    // Método para transferir um valor para outra conta
    Transferir(valor: number, contaDestino: User): void {
        // Verifica se o valor da transferência é positivo
        if (valor <= 0)
            throw new Error("O valor da transferência deve ser positivo.");
        
        // Verifica se há saldo suficiente para a transferência
        if (valor > this.Saldo)
            throw new Error("Saldo insuficiente para transferência.");
        
        // Realiza o saque do valor da conta do usuário
        this.Sacar(valor);
        
        // Deposita o valor na conta de destino
        contaDestino.Depositar(valor);
        console.log(
            `Transferência de R$${valor} realizada para ${contaDestino.Nome}.`
        );
    }

    // Método para consultar o saldo atual da conta
    SaltoAtual(): number {
        return this.Saldo;
    }
}

// Função para criar uma nova conta de usuário
function criarConta(): User {
    // Solicita informações do usuário para criar a conta
    let id = rl.questionInt("Insira o ID do usuário: ");
    let nome = rl.question("Insira o nome do usuário: ");
    let email = rl.question("Insira o email do usuário: ");
    let senha = rl.questionInt("Insira a senha do usuário: ");
    let saldo = rl.questionInt("Insira o saldo inicial do usuário: ");

    // Cria uma nova instância de User
    let user = new User(id, nome, email, senha, saldo);
    console.log(`Conta criada para ${nome} com saldo de R$${saldo}.`);
    return user;
}

// Lista para armazenar todas as contas criadas
let contas: User[] = [];

// Variável que controla o menu interativo
let menu: boolean = true;

// Variável que armazena a conta do usuário logado no sistema
let user: User | null = null;

while (menu) {
    try {
        // Exibe o menu de opções para o usuário
        let opcao = rl.questionInt(
            "\nInsira o número da opção desejada:\n 1 - Criar Conta\n 2 - Depositar\n 3 - Sacar\n 4 - Transferir\n 5 - Extrato\n 6 - Sair\n"
        );

        switch (opcao) {
            case 1:
                // Cria uma nova conta e a adiciona à lista de contas
                user = criarConta();
                contas.push(user);
                break;
            case 2: // Realiza um depósito na conta do usuário
                if (user) {
                    let valor = rl.questionFloat("Insira o valor do depósito: ");
                    user.Depositar(valor);
                } else {
                    console.log(
                        "Nenhuma conta criada. Escolha a opção 1 para criar uma conta."
                    );
                }
                break;
            case 3: // Realiza um saque na conta do usuário
                if (user) {
                    let valor = rl.questionFloat("Insira o valor do saque: ");
                    user.Sacar(valor);
                } else {
                    console.log(
                        "Nenhuma conta criada. Escolha a opção 1 para criar uma conta."
                    );
                }
                break;
            case 4: // Realiza uma transferência para outra conta
                if (user) {
                    if (contas.length > 1) { // Verifica se há mais de uma conta disponível para transferência
                        console.log("===== LISTAGEM DE CONTAS NO BANCO DE DADOS =====");
                        // Exibe a lista de contas de forma tabulada
                        console.log(
                            "NOME".padEnd(15) + " | " + 
                            "EMAIL".padEnd(25) + " | " + 
                            "SALDO"
                        );
                        console.log("------------------------------------------------------");

                        // Itera sobre a lista de contas e exibe as informações
                        contas.forEach((conta) => {
                            if (conta.Id !== user!.Id) {
                                console.log(
                                    `${conta.Nome.padEnd(15)} | ` +
                                    `${conta.Email.padEnd(25)} | ` +
                                    `R$${conta.Saldo.toFixed(2)}`
                                );
                            }
                        });

                        // Solicita ao usuário a escolha da conta de destino
                        let escolha = rl.questionInt("Insira o número da conta de destino ou 0 para voltar ao menu: ");

                        // Verifica se a escolha é válida e realiza a transferência
                        if (escolha > 0 && escolha < contas.length && contas[escolha].Id !== user.Id) {
                            let valorDestino = rl.questionFloat("Insira o valor da transferência: ");
                            user.Transferir(valorDestino, contas[escolha]);
                        } else if (escolha === 0) {
                            console.log("Voltando ao menu principal...");
                        } else {
                            console.log("Opção inválida. Voltando ao menu principal...");
                        }
                    } else {
                        console.log("Não há outras contas disponíveis para transferência.");
                    }
                } else {
                    console.log(
                        "Nenhuma conta criada. Escolha a opção 1 para criar uma conta."
                    );
                }
                break;
            case 5: // Exibe o saldo atual da conta do usuário
                if (user) {
                    console.log(`Saldo atual: R$${user.Saldo}`);
                } else {
                    console.log(
                        "Nenhuma conta criada. Escolha a opção 1 para criar uma conta."
                    );
                }
                break;
            case 6: // Encerra o programa
                menu = false;
                console.log("Saindo do sistema.");
                break;
            default: // Caso o usuário insira uma opção inválida
                console.log("Opção inválida. Tente novamente.");
                break;
        }
    } catch (error) {
        console.log("Ocorreu um erro: " + error.message);
        console.log("Por favor, tente novamente.");
    }
}




