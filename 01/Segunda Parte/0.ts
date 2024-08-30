import { IassistentVirtual } from "../Parte Principal/interfaces";
import { User, criarConta} from "../Parte Principal/Banco";

export class AssistenteVirtual implements IassistentVirtual {
    private usuarios: User[];

    constructor(usuarios: User[]) {
        this.usuarios = usuarios; // Começa com uma lista de usuários do sistema
    }

    responderComando(comando: string): string {
        const palavrasChave = comando.toLowerCase().split(' ');

        // Exemplo: Comando para verificar saldo
        if (palavrasChave.includes('saldo')) {
            const userId = this.obterUserId(comando); // Armazena a palavra chave 
            if (userId) { // Usando a palavra chave 
                const usuario = this.encontrarUsuario(userId); // Encontra o usuario 
                if (usuario) { // Responde a pergunta do Usuário 
                    return `Seu saldo atual é de R$${usuario.getSaldo()}.`;
                } else { 
                    return 'Usuário não encontrado. Por favor, tente novamente.';
                }
            } else {
                return 'ID de usuário não fornecido no comando.';
            }
        }

        // Exemplo: Comando para verificar gastos do mês
        if (palavrasChave.includes('gasto') && palavrasChave.includes('mês')) {
            const userId = criarConta.id(comando);
            if (userId) {
                const usuario = this.encontrarUsuario(userId);
                if (usuario) {
                    const gastos = usuario.calcularGastosMensais(); // Supondo que o método exista
                    return `Seu gasto no último mês foi de R$${gastos}.`;
                } else {
                    return 'Usuário não encontrado. Por favor, tente novamente.';
                }
            } else {
                return 'ID de usuário não fornecido no comando.';
            }
        }

        // Comando não reconhecido
        return 'Desculpe, não entendi seu comando. Tente perguntar sobre seu saldo ou gastos.';
    }
