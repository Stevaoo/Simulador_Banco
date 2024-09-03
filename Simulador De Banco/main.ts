// menu.ts
import { rl } from "./Banco";
import { ContaBancaria, ContaCorrente, ContaPoupanca } from "./Banco";

// Lista de contas bancárias
let contas: ContaBancaria[] = [];
let menu: boolean = true; // Controle do menu
let user: ContaBancaria | null = null; // Conta atual selecionada

// Função para criar uma nova conta bancária
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

// Função para entrar na conta existente
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

// Função para exibir o menu inicial
function menuInicial(): void {
    let continuar = true;

    while (continuar) {
        console.log(`\ 
        -----------------------------------
        ---------- MENU INICIAL -----------
        -----------------------------------
        - 1. ACESSAR SISTEMA BANCÁRIO     -
        - 2. INFORMAÇÕES DO SISTEMA       -
        - 3  AJUDA                        -
        - 4  SAIR                         -
        -----------------------------------`);
        
        let opcao = rl.questionInt("Escolha uma opção: ");

        switch (opcao) {
            case 1:
                console.log("\nEntrando no sistema bancário...");
                menuBancario();
                break;
            case 2:
                console.log("\nO sistema bancário oferece serviços de contas correntes e poupanças.");
                break;
            case 3:
                console.log("\nPara mais informações, contate o suporte.");
                break;
            case 4:
                console.log("\nSaindo do sistema...");
                continuar = false;
                break;
            default:
                console.log("\nOpção inválida. Tente novamente.");
        }
    }
}

// Função para exibir o menu bancário
function menuBancario(): void {
    let continuar = true;

    while (continuar) {
        console.log(`\
        ------------------------------------
        ----------- MENU BANCÁRIO ----------
        ------------------------------------
        - 1. CRIAR NOVA CONTA              -
        - 2. ENTRAR NA CONTA               -
        - 3. AJUDA                         -
        - 4. VOLTAR AO MENU INICIAL        -
        ------------------------------------`);

        let opcao = rl.questionInt("Escolha uma opção: ");

        switch (opcao) {
            case 1:
                let tipo = rl.question("Tipo de conta (corrente/poupanca): ").toLowerCase();
                let novaConta = criarConta(tipo);
                contas.push(novaConta);
                break;
            case 2:
                user = EntrarNaConta();
                if (user) {
                    menuConta(user);
                }
                break;
            case 3:
                console.log("Para mais informações, contate o suporte.");
                break;
            case 4:
                console.log("Voltando ao menu inicial...");
                continuar = false;
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

// Função para exibir o menu da conta
function menuConta(user: ContaBancaria): void {
    let continuar = true;

    while (continuar) {
        console.log(`\
        ------------------------------------
        ------------ MENU CONTA ------------
        ------------------------------------
        - 1. VER EXTRATO                   -
        - 2. REALIZAR DEPÓSITO             -
        - 3. REALIZAR SAQUE                -
        - 4. TRANSFERÊNCIA                 -
        - 5. APLICAR JUROS (POUPANÇA)      -
        - 6. SAIR DA CONTA                 -
        ------------------------------------`);

        let opcao = rl.questionInt("Escolha uma opção: ");

        switch (opcao) {
            case 1:
                user.GerarExtrato();
                break;
            case 2:
                let valorDeposito = rl.questionInt("Valor do depósito: ");
                user.Depositar(valorDeposito);
                break;
            case 3:
                let valorSaque = rl.questionInt("Valor do saque: ");
                user.Sacar(valorSaque);
                break;
            case 4:
                let valorTransferencia = rl.questionInt("Valor da transferência: ");
                let idDestino = rl.questionInt("ID da conta de destino: ");
                let contaDestino = contas.find(conta => conta.Id === idDestino);
                if (contaDestino) {
                    user.Transferir(valorTransferencia, contaDestino);
                } else {
                    console.log("Conta de destino não encontrada.");
                }
                break;
            case 5:
                if (user instanceof ContaPoupanca) {
                    let taxa = rl.questionFloat("Taxa de juros (%): ");
                    user.AplicarJuros(taxa);
                } else {
                    console.log("Essa opção está disponível apenas para contas poupança.");
                }
                break;
            case 6:
                console.log("Saindo da conta...");
                continuar = false;
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

// Iniciar o sistema com o menu inicial
menuInicial();
