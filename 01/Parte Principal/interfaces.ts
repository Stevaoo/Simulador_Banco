import { User } from "./01";


export interface Icliente {
    Id: number;
    Nome: string;
    Email: string;
    Senha: number;
    Salto: number;
    //Metodos
    Depositar(valor: number): void ;
    Sacar(valor: number): void;
    Transferir(valor: number, contaDestino: User): void;
}

export interface IContaBancaria {
    NumeroConta: number;
    UsuarioId: number;
    SaltoAtual: number;
    //Metodos
    VerificarSaldo(): void; 
    Depositar(): void;
    sacar(): number;
}
