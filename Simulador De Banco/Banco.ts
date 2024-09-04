
export let rl = require("readline-sync"); 
import { Icliente, ICorrente, IPoupanca } from "./interfaces"; 

// Classe base ContaBancaria 
export class ContaBancaria implements Icliente {
    public Id: number; // Identificador único da conta
    public Nome: string; // Nome do titular da conta
    public Email: string; // Email do titular da conta
    public Senha: number; // Senha da conta para autenticação
    public Saldo: number; // Saldo atual da conta
    public Historico: string[]; // Histórico das transações realizadas na conta

    constructor(Id: number, Nome: string, Email: string, Senha: number, Saldo: number) {
        this.Id = Id;
        this.Nome = Nome;
        this.Email = Email;
        this.Senha = Senha;
        this.Saldo = Saldo;
        this.Historico = []; // Inicializa o histórico de transações como um array vazio
    }

    // Método para gerar e exibir um extrato bancário detalhado MATTOS
    public GerarExtrato(): void {
        console.log("===== EXTRATO BANCÁRIO DETALHADO ====="); 
        console.log(`Conta: ${this.Nome} (ID: ${this.Id})`); // Mostra o nome e ID do titular da conta
        console.log(`Saldo Inicial: R$${this.Saldo.toFixed(2)}`); // Mostra o saldo inicial da conta
        console.log("------------------------------------------------------");

        // Itera sobre o histórico de transações e mostra cada uma
        this.Historico.forEach((transacao, index) => {
            console.log(`${index + 1}. ${transacao}`); // Mostra a transação com seu índice
        });

        console.log("------------------------------------------------------");
        console.log(`Saldo Final: R$${this.Saldo.toFixed(2)}`); // Mostra o saldo final da conta
    }

    public SaldoAtual(): number {
        return this.Saldo; // Retorna o saldo atual da conta
    }

    // Método para depositar um valor na conta Lucas
    public Depositar(valor: number): void {
        if (valor <= 0) throw new Error("O valor do depósito deve ser positivo."); 
        this.Saldo += valor; 
        this.Historico.push(`Depósito: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`); 
        console.log(`Depósito de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`); 
    }

    // Método genérico para sacar um valor da conta Lucas
    public Sacar(valor: number): void {
        if (valor <= 0) throw new Error("O valor do saque deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente."); 
        this.Saldo -= valor; 
        this.Historico.push(`Saque: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`); 
        console.log(`Saque de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    // Método genérico para transferir um valor para outra conta bancária Lucas
    public Transferir(valor: number, contaDestino: ContaBancaria): void {
        if (valor <= 0) throw new Error("O valor da transferência deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente para transferência."); 
        this.Sacar(valor); 
        contaDestino.Depositar(valor); 
        this.Historico.push(`Transferência para ${contaDestino.Nome}: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`); 
        console.log(`Transferência de R$${valor.toFixed(2)} realizada para ${contaDestino.Nome}.`); 
    }
}

// Classe ContaCorrente, que herda de ContaBancaria e implementa a interface ICorrente
public export class ContaCorrente extends ContaBancaria implements ICorrente {
    // Método para depositar um valor na conta corrente
    DepositarCorrente(valor: number): void  {
        // Valida se o valor do depósito é positivo
        if (valor <= 0) throw new Error("O valor do depósito deve ser positivo."); 
        this.Saldo += valor; // Adiciona o valor ao saldo atual
        // Adiciona a transação ao histórico
        this.Historico.push(`Depósito: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`); 
        // Mostra a confirmação do depósito
        console.log(`Depósito de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`); 
    }

    // Método para sacar um valor da conta corrente
    public SacarCorrente(valor: number): void{
        // Valida se o valor do saque é positivo
        if (valor <= 0) throw new Error("O valor do saque deve ser positivo.");
         // Verifica se há saldo suficiente para o saque 
        if (valor > this.Saldo) throw new Error("Saldo insuficiente.");
        this.Saldo -= valor; // Subtrai o valor do saldo atual
        // Adiciona a transação ao histórico
        this.Historico.push(`Saque: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`); 
        // Mostra a confirmação do saque
        console.log(`Saque de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    // Método para transferir um valor para outra conta bancária
    public TransferirCorrente(valor: number, contaDestino: ContaBancaria): void  {
         // Valida se o valor da transferência é positivo
        if (valor <= 0) throw new Error("O valor da transferência deve ser positivo.");
        // Verifica se há saldo suficiente para a transferência
        if (valor > this.Saldo) throw new Error("Saldo insuficiente para transferência."); 
        this.Sacar(valor); // Realiza o saque do valor na conta de origem
        contaDestino.Depositar(valor); // Realiza o depósito do valor na conta de destino
        this.Historico.push(`Transferência para ${contaDestino.Nome}: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`); // Adiciona a transação ao histórico
        // Mostra a confirmação da transferência
        console.log(`Transferência de R$${valor.toFixed(2)} realizada para ${contaDestino.Nome}.`); 
    }
}

// Classe ContaPoupanca, que herda de ContaBancaria e implementa a interface IPoupanca
public export class ContaPoupanca extends ContaBancaria implements IPoupanca {

    // Método para aplicar juros ao saldo da conta poupança MATTOS
    public AplicarJuros(taxa: number): void {
        if (taxa <= 0) throw new Error("A taxa de juros deve ser positiva."); 
        //Taxa escolhida pelo usuário dividida por cem, e multiplicada pelo saldo da conta.
        const juros = this.Saldo * (taxa / 100); 
        this.Saldo += juros; 
        this.Historico.push(`Juros aplicados: R$${juros.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Juros de R$${juros.toFixed(2)} aplicados. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }
}
