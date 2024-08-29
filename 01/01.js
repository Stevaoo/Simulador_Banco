"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = exports.Extrato = exports.Transacaoo = exports.Contaa = exports.Cliente = void 0;
var rl = require("readline-sync");
var Cliente = /** @class */ (function () {
    function Cliente(cliente, nome, cpf, email, telefone, endereco) {
        this.cliente = cliente;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
    }
    return Cliente;
}());
exports.Cliente = Cliente;
var Contaa = /** @class */ (function () {
    function Contaa(idConta, tipoConta, saldo, dataCriacao, cliente) {
        this.idConta = idConta;
        this.tipoConta = tipoConta;
        this.saldo = saldo;
        this.dataCriacao = dataCriacao;
        this.cliente = cliente;
    }
    Contaa.prototype.deposito = function (valor) {
        if (valor <= 0)
            throw new Error('O valor do depósito deve ser positivo.');
        this.saldo += valor;
    };
    Contaa.prototype.saque = function (valor) {
        if (valor <= 0)
            throw new Error('O valor do saque deve ser positivo.');
        if (valor > this.saldo)
            throw new Error('Saldo insuficiente.');
        this.saldo -= valor;
    };
    return Contaa;
}());
exports.Contaa = Contaa;
var Transacaoo = /** @class */ (function () {
    function Transacaoo(idTransacao, dataTransacao, tipoTransacao, valor, contaOrigem, contaDestino) {
        this.idTransacao = idTransacao;
        this.dataTransacao = dataTransacao;
        this.tipoTransacao = tipoTransacao;
        this.valor = valor;
        this.contaOrigem = contaOrigem;
        this.contaDestino = contaDestino;
    }
    return Transacaoo;
}());
exports.Transacaoo = Transacaoo;
var Extrato = /** @class */ (function () {
    function Extrato(idExtrato, dataExtrato, conta, transacoes) {
        this.idExtrato = idExtrato;
        this.dataExtrato = dataExtrato;
        this.conta = conta;
        this.transacoes = transacoes;
    }
    Extrato.prototype.gerarResumo = function () {
        return this.transacoes.map(function (t) { return "".concat(t.dataTransacao.toISOString(), ": ").concat(t.tipoTransacao, " - ").concat(t.valor); }).join('\n');
    };
    return Extrato;
}());
exports.Extrato = Extrato;
var Conta = /** @class */ (function () {
    function Conta(idConta, tipoConta, saldo, dataCriacao, cliente) {
        this.idConta = idConta;
        this.tipoConta = tipoConta;
        this.saldo = saldo;
        this.dataCriacao = dataCriacao;
        this.cliente = cliente;
    }
    Conta.prototype.deposito = function (valor) {
        if (valor <= 0)
            throw new Error('O valor do depósito deve ser positivo.');
        this.saldo += valor;
    };
    Conta.prototype.saque = function (valor) {
        if (valor <= 0)
            throw new Error('O valor do saque deve ser positivo.');
        if (valor > this.saldo)
            throw new Error('Saldo insuficiente.');
        this.saldo -= valor;
    };
    Conta.prototype.transferencia = function (valor, contaDestino) {
        if (valor <= 0)
            throw new Error('O valor da transferência deve ser positivo.');
        if (valor > this.saldo)
            throw new Error('Saldo insuficiente para transferência.');
        this.saque(valor);
        contaDestino.deposito(valor);
    };
    Conta.prototype.aplicarJuros = function () {
        if (this.tipoConta === 'Poupanca') {
            var juros = this.saldo * Conta.taxaJurosPoupanca;
            this.deposito(juros);
        }
    };
    Conta.taxaJurosPoupanca = 0.05; // Taxa de juros anual para contas poupança
    return Conta;
}());
exports.Conta = Conta;
var clientes = [];
var contas = [];
var transacoes = [];
function cadastrarCliente() {
    rl.question("Nome do \u00DAsuario: ");
    rl.question("CPF do \u00DAsuario: ");
    rl.question("Email do \u00DAsuario: ");
    rl.question("Telefone do \u00DAsuario: ");
    rl.question("Endereco do \u00DAsuario: ");
}
function criarConta() {
    if (clientes.length === 0) {
        console.log('Nenhum cliente cadastrado. Primeiro cadastre um cliente.');
    }
    console.log('Clientes disponíveis:');
    clientes.forEach(function (cliente) {
        console.log("".concat(cliente.cliente, ". ").concat(cliente.nome, " - CPF: ").concat(cliente.cpf));
    });
    rl.question('ID do Cliente: ', function (idClienteStr) {
        var idCliente = parseInt(idClienteStr);
        var cliente = clientes.find(function (c) { return c.cliente === idCliente; });
        if (!cliente) {
            console.log('Cliente não encontrado.');
            return;
        }
        rl.question('Tipo de Conta (Corrente/Poupanca): ', function (tipoConta) {
            if (!['Corrente', 'Poupanca'].includes(tipoConta)) {
                console.log('Tipo de conta inválido.');
                return;
            }
            rl.question('Saldo Inicial: ', function (saldoStr) {
                var saldo = parseFloat(saldoStr);
                var idConta = contas.length + 1;
                var conta = new Conta(idConta, tipoConta, saldo, new Date(), cliente);
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
    contas.forEach(function (conta) {
        console.log("".concat(conta.idConta, ". ").concat(conta.cliente.nome, " - ").concat(conta.tipoConta));
    });
    rl.question('ID da Conta de Origem: ', function (idContaOrigemStr) {
        var idContaOrigem = parseInt(idContaOrigemStr);
        var contaOrigem = contas.find(function (c) { return c.idConta === idContaOrigem; });
        if (!contaOrigem) {
            console.log('Conta de origem não encontrada.');
            return;
        }
        rl.question('Tipo de Transação (Deposito/Saque/Transferencia): ', function (tipoTransacao) {
            if (tipoTransacao === 'Transferencia') {
                rl.question('ID da Conta de Destino: ', function (idContaDestinoStr) {
                    var idContaDestino = parseInt(idContaDestinoStr);
                    var contaDestino = contas.find(function (c) { return c.idConta === idContaDestino; });
                    if (!contaDestino) {
                        console.log('Conta de destino não encontrada.');
                        return;
                    }
                    rl.question('Valor: ', function (valorStr) {
                        var valor = parseFloat(valorStr);
                        try {
                            contaOrigem.transferencia(valor, contaDestino);
                            var idTransacao = transacoes.length + 1;
                            var transacao = new Transacaoo(idTransacao, new Date(), tipoTransacao, valor, contaOrigem, contaDestino);
                            transacoes.push(transacao);
                            console.log('Transferência realizada com sucesso!');
                        }
                        catch (error) {
                            console.log(error.message);
                        }
                    });
                });
            }
            else {
                rl.question('Valor: ', function (valorStr) {
                    var valor = parseFloat(valorStr);
                    var idTransacao = transacoes.length + 1;
                    var transacao;
                    try {
                        if (tipoTransacao === 'Deposito') {
                            contaOrigem.deposito(valor);
                        }
                        else if (tipoTransacao === 'Saque') {
                            contaOrigem.saque(valor);
                        }
                        transacao = new Transacaoo(idTransacao, new Date(), tipoTransacao, valor, contaOrigem);
                        transacoes.push(transacao);
                        console.log("".concat(tipoTransacao, " realizado com sucesso!"));
                    }
                    catch (error) {
                        console.log(error.message);
                    }
                });
            }
        });
    });
}
function cadastrarClientee() {
    rl.question('Nome: ', function (nome) {
        rl.question('CPF: ', function (cpf) {
            if (clientes.some(function (c) { return c.cpf === cpf; })) {
                console.log('Cliente com esse CPF já cadastrado.');
                return;
            }
            rl.question('Email: ', function (email) {
                rl.question('Telefone: ', function (telefone) {
                    rl.question('Endereco: ', function (endereco) {
                        var idCliente = clientes.length + 1;
                        var cliente = new Cliente(idCliente, nome, cpf, email, telefone, endereco);
                        clientes.push(cliente);
                        console.log('Cliente cadastrado com sucesso!');
                    });
                });
            });
        });
    });
}
function aplicarJuros() {
    contas.forEach(function (conta) {
        conta.aplicarJuros();
    });
    console.log('Juros aplicados nas contas poupança.');
}
function gerarExtrato() {
    if (contas.length === 0) {
        console.log('Nenhuma conta disponível para gerar extrato.');
        return;
    }
    console.log('Contas disponíveis:');
    contas.forEach(function (conta) {
        console.log("".concat(conta.idConta, ". ").concat(conta.cliente.nome, " - ").concat(conta.tipoConta));
    });
    rl.question('ID da Conta: ', function (idContaStr) {
        var idConta = parseInt(idContaStr);
        var conta = contas.find(function (c) { return c.idConta === idConta; });
        if (!conta) {
            console.log('Conta não encontrada.');
            return;
        }
        var extrato = new Extrato(Extrato.length + 1, new Date(), conta, transacoes.filter(function (t) { return t.contaOrigem === conta || t.contaDestino === conta; }));
        console.log(extrato.gerarResumo());
    });
}
var menu = true;
while (menu) {
    var opecao = rl.questionInt("Insira o numero da opecao desejada:\n 1  - Cadastrar Cliente \n 2 - Criar Conta \n 3 - Realizar Transicao \n 4 - Cadastrar Cliente 2 \n 5 - Aplicar Juros \n 5 - Gerar Extrato \n 6 - Sair");
    switch (opecao) {
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
