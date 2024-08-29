import { Icliente,IConta,ITransacao,IExtrato, TipoConta, TipoTransacao } from "./interfaces";
let rl = require("readline-sync");

export class Cliente implements Icliente {
    cliente: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: string;

    constructor(cliente: number, nome: string, cpf: string, email: string, telefone: string, endereco: string) {
        this.cliente = cliente;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
    }
}

export class Contaa implements IConta {
    idConta: number;
    tipoConta: TipoConta;
    saldo: number;
    dataCriacao: Date;
    cliente: Cliente;

    constructor(idConta: number, tipoConta: TipoConta, saldo: number, dataCriacao: Date, cliente: Cliente) {
        this.idConta = idConta;
        this.tipoConta = tipoConta;
        this.saldo = saldo;
        this.dataCriacao = dataCriacao;
        this.cliente = cliente;
    }

    deposito(valor: number): void {
        if (valor <= 0) throw new Error('O valor do depósito deve ser positivo.');
        this.saldo += valor;
    }

    saque(valor: number): void {
        if (valor <= 0) throw new Error('O valor do saque deve ser positivo.');
        if (valor > this.saldo) throw new Error('Saldo insuficiente.');
        this.saldo -= valor;
    }
}

export class Transacaoo implements ITransacao {
    idTransacao: number;
    dataTransacao: Date;
    tipoTransacao: TipoTransacao;
    valor: number;
    contaOrigem?: Contaa;
    contaDestino?: Contaa;

    constructor(idTransacao: number, dataTransacao: Date, tipoTransacao: TipoTransacao, valor: number, contaOrigem?: Contaa, contaDestino?: Contaa) {
        this.idTransacao = idTransacao;
        this.dataTransacao = dataTransacao;
        this.tipoTransacao = tipoTransacao;
        this.valor = valor;
        this.contaOrigem = contaOrigem;
        this.contaDestino = contaDestino;
    }
}

export class Extrato implements IExtrato {
    idExtrato: number;
    dataExtrato: Date;
    conta: Contaa;
    transacoes: Transacaoo[];

    constructor(idExtrato: number, dataExtrato: Date, conta: Contaa, transacoes: Transacaoo[]) {
        this.idExtrato = idExtrato;
        this.dataExtrato = dataExtrato;
        this.conta = conta;
        this.transacoes = transacoes;
    }

    gerarResumo(): string {
        return this.transacoes.map(t => `${t.dataTransacao.toISOString()}: ${t.tipoTransacao} - ${t.valor}`).join('\n');
    }
}

export class Conta implements IConta {
    idConta: number;
    tipoConta: TipoConta;
    saldo: number;
    dataCriacao: Date;
    cliente: Cliente;

    private static taxaJurosPoupanca: number = 0.05; // Taxa de juros anual para contas poupança

    constructor(idConta: number, tipoConta: TipoConta, saldo: number, dataCriacao: Date, cliente: Cliente) {
        this.idConta = idConta;
        this.tipoConta = tipoConta;
        this.saldo = saldo;
        this.dataCriacao = dataCriacao;
        this.cliente = cliente;
    }

    deposito(valor: number): void {
        if (valor <= 0) throw new Error('O valor do depósito deve ser positivo.');
        this.saldo += valor;
    }

    saque(valor: number): void {
        if (valor <= 0) throw new Error('O valor do saque deve ser positivo.');
        if (valor > this.saldo) throw new Error('Saldo insuficiente.');
        this.saldo -= valor;
    }

    transferencia(valor: number, contaDestino: Conta): void {
        if (valor <= 0) throw new Error('O valor da transferência deve ser positivo.');
        if (valor > this.saldo) throw new Error('Saldo insuficiente para transferência.');
        this.saque(valor);
        contaDestino.deposito(valor);
    }

    aplicarJuros(): void {
        if (this.tipoConta === 'Poupanca') {
            const juros = this.saldo * Conta.taxaJurosPoupanca;
            this.deposito(juros);
        }
    }
}

let clientes: Cliente[] = [];
let contas: Conta[] = [];
let transacoes: Transacaoo[] = [];

function cadastrarCliente() {
    rl.question(`Nome do Úsuario: `,)
    rl.question(`CPF do Úsuario: `)
    rl.question(`Email do Úsuario: `)
    rl.question(`Telefone do Úsuario: `)
    rl.question(`Endereco do Úsuario: `)
}

function criarConta() {
    if (clientes.length === 0) {
        console.log('Nenhum cliente cadastrado. Primeiro cadastre um cliente.');
    }


    console.log('Clientes disponíveis:');
    clientes.forEach(cliente => {
        console.log(`${cliente.cliente}. ${cliente.nome} - CPF: ${cliente.cpf}`);
    });


    rl.question('ID do Cliente: ', (idClienteStr) => {
        const idCliente = parseInt(idClienteStr);
        const cliente = clientes.find(c => c.cliente === idCliente);

        if (!cliente) {
            console.log('Cliente não encontrado.');

            return;
        }

        rl.question('Tipo de Conta (Corrente/Poupanca): ', (tipoConta) => {
            if (!['Corrente', 'Poupanca'].includes(tipoConta)) {
                console.log('Tipo de conta inválido.');

                return;
            }

            rl.question('Saldo Inicial: ', (saldoStr) => {
                const saldo = parseFloat(saldoStr);
                const idConta = contas.length + 1;
                const conta = new Conta(idConta, tipoConta as 'Corrente' | 'Poupanca', saldo, new Date(), cliente);
                contas.push(conta);
                console.log('Conta criada com sucesso!');

            });
        });
    });
}

function realizarTransacao() {
    if (contas.length < 2) {
        console.log('Número insuficiente de contas para realizar uma transferência.');

        return;
    }

    console.log('Contas disponíveis:');
    contas.forEach(conta => {
        console.log(`${conta.idConta}. ${conta.cliente.nome} - ${conta.tipoConta}`);
    });

    rl.question('ID da Conta de Origem: ', (idContaOrigemStr) => {
        const idContaOrigem = parseInt(idContaOrigemStr);
        const contaOrigem = contas.find(c => c.idConta === idContaOrigem);

        if (!contaOrigem) {
            console.log('Conta de origem não encontrada.');

            return;
        }

        rl.question('Tipo de Transação (Deposito/Saque/Transferencia): ', (tipoTransacao) => {
            if (tipoTransacao === 'Transferencia') {
                rl.question('ID da Conta de Destino: ', (idContaDestinoStr) => {
                    const idContaDestino = parseInt(idContaDestinoStr);
                    const contaDestino = contas.find(c => c.idConta === idContaDestino);

                    if (!contaDestino) {
                        console.log('Conta de destino não encontrada.');

                        return;
                    }

                    rl.question('Valor: ', (valorStr) => {
                        const valor = parseFloat(valorStr);
                        try {
                            contaOrigem.transferencia(valor, contaDestino);
                            const idTransacao = transacoes.length + 1;
                            const transacao = new Transacaoo(idTransacao, new Date(), tipoTransacao as 'Deposito' | 'Saque' | 'Transferencia', valor, contaOrigem, contaDestino);
                            transacoes.push(transacao);
                            console.log('Transferência realizada com sucesso!');
                        } catch (error) {
                            console.log(error.message);
                        }

                    });
                });
            } else {
                rl.question('Valor: ', (valorStr) => {
                    const valor = parseFloat(valorStr);
                    const idTransacao = transacoes.length + 1;
                    let transacao: Transacaoo;

                    try {
                        if (tipoTransacao === 'Deposito') {
                            contaOrigem.deposito(valor);
                        } else if (tipoTransacao === 'Saque') {
                            contaOrigem.saque(valor);
                        }

                        transacao = new Transacaoo(idTransacao, new Date(), tipoTransacao as 'Deposito' | 'Saque' | 'Transferencia', valor, contaOrigem);
                        transacoes.push(transacao);

                        console.log(`${tipoTransacao} realizado com sucesso!`);
                    } catch (error) {
                        console.log(error.message);
                    }

                });
            }
        });
    });
}

function cadastrarClientee() {
    rl.question('Nome: ', (nome) => {
        rl.question('CPF: ', (cpf) => {
            if (clientes.some(c => c.cpf === cpf)) {
                console.log('Cliente com esse CPF já cadastrado.');
                
                return;
            }

            rl.question('Email: ', (email) => {
                rl.question('Telefone: ', (telefone) => {
                    rl.question('Endereco: ', (endereco) => {
                        const idCliente = clientes.length + 1;
                        const cliente = new Cliente(idCliente, nome, cpf, email, telefone, endereco);
                        clientes.push(cliente);
                        console.log('Cliente cadastrado com sucesso!');
                        
                    });
                });
            });
        });
    });
}

function aplicarJuros() {
    contas.forEach(conta => {
        conta.aplicarJuros();
    });
    console.log('Juros aplicados nas contas poupança.');
}

function gerarExtrato () {
    if (contas.length === 0) {
        console.log('Nenhuma conta disponível para gerar extrato.');
        
        return;
    }

    console.log('Contas disponíveis:');
    contas.forEach(conta => {
        console.log(`${conta.idConta}. ${conta.cliente.nome} - ${conta.tipoConta}`);
    });

    rl.question('ID da Conta: ', (idContaStr) => {
        const idConta = parseInt(idContaStr);
        const conta = contas.find(c => c.idConta === idConta);

        if (!conta) {
            console.log('Conta não encontrada.');
            
            return;
        }

        const extrato = new Extrato(Extrato.length + 1, new Date(), conta, transacoes.filter(t => t.contaOrigem === conta || t.contaDestino === conta));
        console.log(extrato.gerarResumo());
        
    });
}

let menu: boolean = true;
while (menu) {
    let opecao = rl.questionInt("Insira o numero da opecao desejada:\n 1  - Cadastrar Cliente \n 2 - Criar Conta \n 3 - Realizar Transicao \n 4 - Cadastrar Cliente 2 \n 5 - Aplicar Juros \n 5 - Gerar Extrato \n 6 - Sair" )

    switch(opecao){
        case 1:
            cadastrarCliente();
            break;
        case 2:
            criarConta();
            break;
        case 3:
            realizarTransacao();
            break;
        case 4:
            cadastrarClientee();
            break;
        case 5:
            aplicarJuros();
            break;
        case 6:
            gerarExtrato();
            break;
        case 7:
            menu = false;
            break;
        default:
            console.log("Opecao Invalida. Tente Novamente.");
    }
}

console.log("Programa encerrado");











