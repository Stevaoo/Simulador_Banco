import { Icliente, IContaBancaria } from "./interfaces";
let rl = require("readline-sync");

// Classe base para contas bancárias
abstract class ContaBancaria implements Icliente {
    Id: number;
    Nome: string;
    Email: string;
    Senha: number;
    Saldo: number;
    Historico: string[];

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

    abstract Depositar(valor: number): void;
    abstract Sacar(valor: number): void;
    abstract Transferir(valor: number, contaDestino: ContaBancaria): void;

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

    SaldoAtual(): number {
        return this.Saldo;
    }
}

// Classe para Conta Corrente
class ContaCorrente extends ContaBancaria {
    Depositar(valor: number): void {
        if (valor <= 0) throw new Error("O valor do depósito deve ser positivo.");
        this.Saldo += valor;
        this.Historico.push(`Depósito: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Depósito de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    Sacar(valor: number): void {
        if (valor <= 0) throw new Error("O valor do saque deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente.");
        this.Saldo -= valor;
        this.Historico.push(`Saque: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Saque de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    Transferir(valor: number, contaDestino: ContaBancaria): void {
        if (valor <= 0) throw new Error("O valor da transferência deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente para transferência.");
        this.Sacar(valor);
        contaDestino.Depositar(valor);
        this.Historico.push(`Transferência para ${contaDestino.Nome}: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Transferência de R$${valor.toFixed(2)} realizada para ${contaDestino.Nome}.`);
    }
}

// Classe para Conta Poupança
class ContaPoupanca extends ContaBancaria {
    AplicarJuros(taxa: number): void {
        if (taxa <= 0) throw new Error("A taxa de juros deve ser positiva.");
        const juros = this.Saldo * (taxa / 100);
        this.Saldo += juros;
        this.Historico.push(`Juros aplicados: R$${juros.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Juros de R$${juros.toFixed(2)} aplicados. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    Depositar(valor: number): void {
        if (valor <= 0) throw new Error("O valor do depósito deve ser positivo.");
        this.Saldo += valor;
        this.Historico.push(`Depósito: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Depósito de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    Sacar(valor: number): void {
        if (valor <= 0) throw new Error("O valor do saque deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente.");
        this.Saldo -= valor;
        this.Historico.push(`Saque: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Saque de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    Transferir(valor: number, contaDestino: ContaBancaria): void {
        if (valor <= 0) throw new Error("O valor da transferência deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente para transferência.");
        this.Sacar(valor);
        contaDestino.Depositar(valor);
        this.Historico.push(`Transferência para ${contaDestino.Nome}: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Transferência de R$${valor.toFixed(2)} realizada para ${contaDestino.Nome}.`);
    }
}

// Função para criar uma nova conta
function criarConta(tipo: string): ContaBancaria {
    let id = rl.questionInt("Insira o ID do usuário: ");
    let nome = rl.question("Insira o nome do usuário: ");
    let email = rl.question("Insira o email do usuário: ");
    let senha = rl.questionInt("Insira a senha do usuário: ");
    let saldo = rl.questionInt("Insira o saldo inicial do usuário: ");

    if (tipo === "corrente") {
        let conta = new ContaCorrente(id, nome, email, senha, saldo);
        console.log(`Conta Corrente criada para ${nome} com saldo de R$${saldo}.`);
        return conta;
    } else if (tipo === "poupanca") {
        let conta = new ContaPoupanca(id, nome, email, senha, saldo);
        console.log(`Conta Poupança criada para ${nome} com saldo de R$${saldo}.`);
        return conta;
    } else {
        throw new Error("Tipo de conta inválido.");
    }
}

// Função para entrar na conta
function EntrarNaConta(): ContaBancaria | null {
    if (contas.length === 0) {
        console.log("Nenhuma conta cadastrada.");
        return null;
    }

    let id = rl.questionInt("Insira o ID da conta: ");
    let senha = rl.questionInt("Insira a senha da conta: ");

    for (let conta of contas) {
        if (conta.Id === id && conta.Senha === senha) {
            console.log(`Bem-vindo(a), ${conta.Nome}!`);
            return conta;
        }
    }

    console.log("ID ou senha incorretos.");
    return null;
}

// Lista de contas
let contas: ContaBancaria[] = [];

// Menu interativo
let menu: boolean = true;
let user: ContaBancaria | null = null;

while (menu) {
    try {
        let opcao = rl.questionInt(
            "\nInsira o número da opção desejada:\n 1 - Entrar na Conta\n 2 - Criar Conta Corrente\n 3 - Criar Conta Poupança\n 4 - Depositar\n 5 - Sacar\n 6 - Transferir\n 7 - Aplicar Juros\n 8 - Extrato\n 9 - Sair\n"
        );

        switch (opcao) {
            case 1: // Entrar na Conta
                user = EntrarNaConta();
                break;
            case 2: // Criar Conta Corrente
                user = criarConta("corrente");
                contas.push(user);
                break;
            case 3: // Criar Conta Poupança
                user = criarConta("poupanca");
                contas.push(user);
                break;
            case 4: // Depositar
                if (user) {
                    let valor = rl.questionFloat("Insira o valor do depósito: ");
                    user.Depositar(valor);
                } else {
                    console.log("Nenhuma conta selecionada. Escolha a opção 1 para entrar na conta.");
                }
                break;
            case 5: // Sacar
                if (user) {
                    let valor = rl.questionFloat("Insira o valor do saque: ");
                    user.Sacar(valor);
                } else {
                    console.log("Nenhuma conta selecionada. Escolha a opção 1 para entrar na conta.");
                }
                break;
            case 6: // Transferir
                if (user) {
                    if (contas.length > 1) { // Verifica se há mais de uma conta disponível
                        console.log("===== LISTAGEM DE CONTAS NO BANCO DE DADOS =====");
                        console.log(
                            "INDEX".padEnd(6) + 
                            "NOME".padEnd(15) + " | " + 
                            "EMAIL".padEnd(25) + " | " + 
                            "SALDO"
                        );
                        console.log("------------------------------------------------------");

                        contas.forEach((conta, index) => {
                            if (conta.Id !== user.Id) {
                                console.log(
                                    `${index.toString().padEnd(6)} ` +
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
                    console.log("Nenhuma conta selecionada. Escolha a opção 1 para entrar na conta.");
                }
                break;
            case 7: // Aplicar Juros
                if (user instanceof ContaPoupanca) {
                    let taxa = rl.questionFloat("Insira a taxa de juros (%): ");
                    user.AplicarJuros(taxa);
                } else {
                    console.log("Apenas contas poupança podem aplicar juros.");
                }
                break;
            case 8: // Extrato
                if (user) {
                    user.GerarExtrato();
                } else {
                    console.log("Nenhuma conta selecionada. Escolha a opção 1 para entrar na conta.");
                }
                break;
            case 9: // Sair
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
