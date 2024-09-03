export let rl = require("readline-sync");
import { Icliente, ICorrente, IPoupanca } from "./interfaces";

export class ContaBancaria implements Icliente {
    Id: number;
    Nome: string;
    Email: string;
    Senha: number;
    Saldo: number;
    Historico: string[];

    constructor(Id: number, Nome: string, Email: string, Senha: number, Saldo: number) {
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

    GerarExtrato(): void {
        console.log("===== EXTRATO BANCÁRIO DETALHADO =====");
        console.log(`Conta: ${this.Nome} (ID: ${this.Id})`);
        console.log(`Saldo Inicial: R$${this.Saldo.toFixed(2)}`);
        console.log("------------------------------------------------------");

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

export class ContaCorrente extends ContaBancaria implements ICorrente {
    DepositarCorrente(valor: number): void {
        if (valor <= 0) throw new Error("O valor do depósito deve ser positivo.");
        this.Saldo += valor;
        this.Historico.push(`Depósito: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Depósito de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    SacarCorrente(valor: number): void {
        if (valor <= 0) throw new Error("O valor do saque deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente.");
        this.Saldo -= valor;
        this.Historico.push(`Saque: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Saque de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    TransferirCorrente(valor: number, contaDestino: ContaBancaria): void {
        if (valor <= 0) throw new Error("O valor da transferência deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente para transferência.");
        this.SacarCorrente(valor);
        contaDestino.Depositar(valor);
        this.Historico.push(`Transferência para ${contaDestino.Nome}: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Transferência de R$${valor.toFixed(2)} realizada para ${contaDestino.Nome}.`);
    }
}

export class ContaPoupanca extends ContaBancaria implements IPoupanca {
    TransferirPopanca(valor: number, contaDestino: ContaBancaria): void {
        throw new Error("Method not implemented.");
    }
    AplicarJuros(taxa: number): void {
        if (taxa <= 0) throw new Error("A taxa de juros deve ser positiva.");
        const juros = this.Saldo * (taxa / 100);
        this.Saldo += juros;
        this.Historico.push(`Juros aplicados: R$${juros.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Juros de R$${juros.toFixed(2)} aplicados. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    DepositarPoupanca(valor: number): void {
        if (valor <= 0) throw new Error("O valor do depósito deve ser positivo.");
        this.Saldo += valor;
        this.Historico.push(`Depósito: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Depósito de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    SacarPoupanca(valor: number): void {
        if (valor <= 0) throw new Error("O valor do saque deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente.");
        this.Saldo -= valor;
        this.Historico.push(`Saque: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Saque de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.Saldo.toFixed(2)}`);
    }

    TransferirPoupanca(valor: number, contaDestino: ContaBancaria): void {
        if (valor <= 0) throw new Error("O valor da transferência deve ser positivo.");
        if (valor > this.Saldo) throw new Error("Saldo insuficiente para transferência.");
        this.SacarPoupanca(valor);
        contaDestino.Depositar(valor);
        this.Historico.push(`Transferência para ${contaDestino.Nome}: R$${valor.toFixed(2)} - Saldo: R$${this.Saldo.toFixed(2)}`);
        console.log(`Transferência de R$${valor.toFixed(2)} realizada para ${contaDestino.Nome}.`);
    }
}
