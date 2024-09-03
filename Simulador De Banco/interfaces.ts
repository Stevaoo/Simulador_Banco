import { ContaBancaria } from "./Banco";

export interface Icliente {
    Id: number;
    Nome: string;
    Email: string;
    Senha: number;
    Saldo: number;
    Historico: string[];
    //Metodos
    Depositar(valor: number): void ;
    Sacar(valor: number): void;
    Transferir(valor: number, contaDestino: ContaBancaria ): void;
}

export interface ILogin {
    nome: string;
    senha: number;
    Login(username: string, password: string): void;
    Ajuda(): void;
    autenticacao: boolean

}

export interface ICorrente {
    DepositarCorrente(valor: number): void; 
    SacarCorrente(valor: number): void ;
    TransferirCorrente(valor: number, contaDestino: ContaBancaria): void ;
}
export interface IPoupanca {
    AplicarJuros(taxa: number): void;
    DepositarPoupanca(valor: number): void;
    SacarPoupanca(valor: number): void ;
    TransferirPopanca(valor: number, contaDestino: ContaBancaria): void 
} 


