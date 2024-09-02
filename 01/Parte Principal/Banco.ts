
import { Icliente } from "./interfaces";
let rl = require("readline-sync");

// Classe base para contas bancárias
export class ContaBancaria implements Icliente {
    Id: number;               // Identificador único da conta
    Nome: string;            // Nome do titular da conta
    Email: string;           // Email do titular da conta
    Senha: number;           // Senha de acesso da conta
    Saldo: number;           // Saldo atual da conta
    Historico: string[];     // Histórico de transações realizadas na conta

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
        this.Historico = [];
    }
    Depositar(valor: number): void {
        throw new Error("Method not implemented.");
    }
    Sacar(valor: number): void {
        throw new Error("Method not implemented.");
    }
    Transferir(valor: number, contaDestino: ContaBancaria): void {
        throw new Error("Method not implemented.");
    }
    Salto: number;
    SaltoAtual(): number {
        throw new Error("Method not implemented.");
    }

    // Método para gerar um extrato detalhado da conta
    GerarExtrato(): void {
        console.log("===== EXTRATO BANCÁRIO DETALHADO =====");
        console.log(`Conta: ${this.Nome} (ID: ${this.Id})`);
        console.log(`Saldo Inicial: R$${this.Saldo.toFixed(2)}`);
        console.log("------------------------------------------------------");

        // Imprime o histórico de transações
        this.Historico.forEach((transacao, index) => {
            console.log(`${index + 1}. ${transacao}`);
        });

        console.log("------------------------------------------------------");
        console.log(`Saldo Final: R$${this.Saldo.toFixed(2)}`);
    }

    // Método para obter o saldo atual da conta
    SaldoAtual(): number {
        return this.Saldo;
    }
}

// Classe para Conta Corrente, que estende ContaBancaria
class ContaCorrente extends ContaBancaria {
    // Implementa o método Depositar para a Conta Corrente
    Depositar(valor: number): void {
        if (valor <= 0) throw new Error("O valor do depósito deve ser positivo.");
        this.Saldo += valor;
        this.Historico.push(`Depósito: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Depósito de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    // Implementa o método Sacar para a Conta Corrente
    Sacar(valor: number): void {
        if (valor <= 0) throw new Error("O valor do saque deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente.");
        this.Saldo -= valor;
        this.Historico.push(`Saque: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Saque de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    // Implementa o método Transferir para a Conta Corrente
    Transferir(valor: number, contaDestino: ContaBancaria): void {
        if (valor <= 0) throw new Error("O valor da transferência deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente para transferência.");
        this.Sacar(valor);
        contaDestino.Depositar(valor);
        this.Historico.push(`Transferência para ${contaDestino.Nome}: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Transferência de R$${valor.toFixed(2)} realizada para ${contaDestino.Nome}.`);
    }
}

// Classe para Conta Poupança, que estende ContaBancaria
class ContaPoupanca extends ContaBancaria {
    // Método para aplicar juros na Conta Poupança
    AplicarJuros(taxa: number): void {
        if (taxa <= 0) throw new Error("A taxa de juros deve ser positiva.");
        const juros = this.Saldo * (taxa / 100);
        this.Saldo += juros;
        this.Historico.push(`Juros aplicados: R$${juros.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Juros de R$${juros.toFixed(2)} aplicados. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    // Implementa o método Depositar para a Conta Poupança
    Depositar(valor: number): void {
        if (valor <= 0) throw new Error("O valor do depósito deve ser positivo.");
        this.Saldo += valor;
        this.Historico.push(`Depósito: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Depósito de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    // Implementa o método Sacar para a Conta Poupança
    Sacar(valor: number): void {
        if (valor <= 0) throw new Error("O valor do saque deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente.");
        this.Saldo -= valor;
        this.Historico.push(`Saque: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Saque de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    // Implementa o método Transferir para a Conta Poupança
    Transferir(valor: number, contaDestino: ContaBancaria): void {
        if (valor <= 0) throw new Error("O valor da transferência deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente para transferência.");
        this.Sacar(valor);
        contaDestino.Depositar(valor);
        this.Historico.push(`Transferência para ${contaDestino.Nome}: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Transferência de R$${valor.toFixed(2)} realizada para ${contaDestino.Nome}.`);
    }
}

// Função para criar uma nova conta bancária
function criarConta(tipo: string): ContaBancaria {
    let id = rl.questionInt("Insira o ID do usuário: ");  // Solicita o ID da conta
    let nome = rl.question("Insira o nome do usuário: "); // Solicita o nome do titular
    let email = rl.question("Insira o email do usuário: "); // Solicita o email do titular
    let senha = rl.questionInt("Insira a senha do usuário: "); // Solicita a senha da conta
    let saldo = rl.questionInt("Insira o saldo inicial do usuário: "); // Solicita o saldo inicial

    if (tipo === "corrente") {
        let conta = new ContaCorrente(id, nome, email, senha, saldo); // Cria uma Conta Corrente
        console.log(`Conta Corrente criada para ${nome} com saldo de R$${saldo}.`);
        return conta;
    } else if (tipo === "poupanca") {
        let conta = new ContaPoupanca(id, nome, email, senha, saldo); // Cria uma Conta Poupança
        console.log(`Conta Poupança criada para ${nome} com saldo de R$${saldo}.`);
        return conta;
    } else {
        throw new Error("Tipo de conta inválido."); // Lança um erro se o tipo da conta for inválido
    }
}

// Função para entrar na conta existente
function EntrarNaConta(): ContaBancaria | null {
    if (contas.length === 0) {
        console.log("Nenhuma conta cadastrada.");
        return null;
    }

    let id = rl.questionInt("Insira o ID da conta: "); // Solicita o ID da conta para login
    let senha = rl.questionInt("Insira a senha da conta: "); // Solicita a senha da conta para login

    for (let conta of contas) {
        if (conta.Id === id && conta.Senha === senha) {
            console.log(`Bem-vindo(a), ${conta.Nome}!`);
            return conta; // Retorna a conta se o ID e a senha estiverem corretos
        }
    }

    console.log("ID ou senha incorretos."); // Mensagem de erro se ID ou senha estiverem incorretos
    return null;
}

// Lista de contas bancárias
let contas: ContaBancaria[] = [];
let menu: boolean = true; // Controle do menu
let user: ContaBancaria | null = null; // Conta atual selecionada

// Loop principal do menu

while (menu) {
    try {
        let opcao = rl.questionInt(
            "\nInsira o número da opção desejada:\n 1 - Criar Conta\n 2 - Depositar\n 3 - Sacar\n 4 - Transferir\n 5 - Aplicar Juros\n 6 - Gerar Extrato\n 7 - Entrar na Conta\n 8 - Sair\n"
        );


        switch (opcao) {
            case 1: // Criar Conta
                let tipoConta = rl.question("Qual o tipo de conta? (corrente/poupanca): ");
                user = criarConta(tipoConta);
                contas.push(user);
                break;
            case 2: // Depositar
                if (user) {
                    let valor = rl.questionFloat("Insira o valor do depósito: ");
                    user.Depositar(valor);
                } else {
                    console.log("Nenhuma conta selecionada. Escolha a opção 7 para entrar na conta.");
                }
                break;
            case 3: // Sacar
                if (user) {
                    let valor = rl.questionFloat("Insira o valor do saque: ");
                    user.Sacar(valor);
                } else {
                    console.log("Nenhuma conta selecionada. Escolha a opção 7 para entrar na conta.");
                }
                break;
            case 4: // Transferir
                if (user) {
                    if (contas.length > 1) {
                        console.log("===== LISTAGEM DE CONTAS NO BANCO DE DADOS =====");
                        console.log(
                            "NOME".padEnd(15) + " | " +
                            "EMAIL".padEnd(25) + " | " +
                            "SALDO"
                        );
                        console.log("------------------------------------------------------");

                        contas.forEach((conta) => {
                            if (conta.Id !== user?.Id) {
                                console.log(
                                    `${conta.Nome.padEnd(15)} | ` +
                                    `${conta.Email.padEnd(25)} | ` +
                                    `R$${conta.Saldo.toFixed(2)}`
                                );
                            }
                        });

                        let escolha = rl.questionInt("Insira o número da conta de destino ou 0 para voltar ao menu: ");

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
                    console.log("Nenhuma conta selecionada. Escolha a opção 7 para entrar na conta.");
                }
                break;
            case 5: // Aplicar Juros
                if (user instanceof ContaPoupanca) { // se o user for uma instancia da conta poupanca
                    let taxa = rl.questionInt("Insira a taxa de juros (%): ");
                    user.AplicarJuros(taxa);
                } else {
                    console.log("Apenas contas poupança podem aplicar juros.");
                }
                break;
            case 6: // Gerar Extrato
                if (user) {
                    user.GerarExtrato();
                } else {
                    console.log("Nenhuma conta selecionada. Escolha a opção 7 para entrar na conta.");
                }
                break;
            case 7: // Entrar na Conta
                user = EntrarNaConta();
                break;
            case 8: // Sair
                menu = false;
                console.log("Saindo do sistema.");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }

        rl.question("Pressione Enter para continuar..."); // Pausa até o usuário pressionar Enter
    } catch (error) {
        console.log("Por favor, tente novamente.");
        rl.question("Pressione Enter para continuar...");
    }
}
