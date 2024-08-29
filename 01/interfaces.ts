import { Cliente, Contaa, Transacaoo } from "./01";

export interface Icliente {
    cliente: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: string;

}

export interface IConta {
    idConta: number;
    tipoConta: TipoConta;
    saldo: number;
    dataCriacao: Date;
    cliente: Cliente;
}

export interface ITransacao {
    idTransacao: number;
    dataTransacao: Date;
    tipoTransacao: TipoTransacao;
    valor: number;
    contaOrigem?: Contaa;
    contaDestino?: Contaa;
}

export interface IExtrato {
    idExtrato: number;
    dataExtrato: Date;
    conta: Contaa;
    transacoes: Transacaoo[];
}

export type TipoConta = 'Corrente' | 'Poupanca';

export type TipoTransacao = 'Deposito' | 'Saque' | 'Transferencia';
