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
// Função FAQ para tratar dúvidas frequentes dos usuários
function FAQ(): void {
    console.clear();
    // Exibe as perguntas frequentes disponíveis para o usuário
    console.log(`\ 
        ---------------------------------------------------------------------------------------------
        ------------------------------ PERGUNTAS FREQUENTES -----------------------------------------
        ---------------------------------------------------------------------------------------------
        - 1. COMO FAÇO LOGIN NA MINHA CONTA BANCÁRIA ONLINE ?                                       -
        - 2. ESQUECI MINHA SENHA. COMO POSSO RECUPERA-LÁ ?                                          -
        - 3. O QUE FAZER SE MINHA CONTA FOR BLOQUEADA OU SUSPENSA ?                                 -
        - 4. COMO POSSO VERIFICAR O SALDO E HISTÓRICO DE TRANSAÇÕES DA MINHA CONTA ?                -
        - 5. COMO REALIZAR TRANSFERÊNCIAS ENTRE CONTAS OU PARA TERCEIROS PELO SITE ?                -
        - 6. O QUE FAZER SE EU SUSPEITAR DE ATIVIDADE FRAUDELENTA NA MINHA CONTA ?                  -
        ---------------------------------------------------------------------------------------------
        ---------------------------- DIGITE "SAIR" PARA VOLTAR --------------------------------------
        ---------------------------------------------------------------------------------------------`);

    // Variável de controle para o loop
    let loop = true;

    // Loop para manter o usuário no FAQ até que ele escolha sair
    while (loop) {
        // Captura a dúvida do usuário
        let duvida = rl.question("Digite o numero da sua duvida ou 'SAIR' para voltar: ");
        console.clear();
        // Usamos switch para tratar as diferentes dúvidas do usuário
        switch (duvida) {
            // Caso a dúvida seja sobre como fazer login na conta bancária online
            case "1":
            case " COMO FAÇO LOGIN NA MINHA CONTA BANCÁRIA ONLINE ?":
            console.clear();
                console.log(`\ 
                1 - ➱ Quando estiver no menu inicial do sistema, escolha a opção para "Entrar na Conta".
                2 - ✔ Você será solicitado a inserir o ID da sua conta e a senha correspondente.
                3 - ✔ O sistema verifica se o ID e a senha inseridos correspondem a uma conta existente. 
                Se estiverem corretos, você será autenticado e poderá acessar as funcionalidades da sua conta.
                4 - ✔ Se o login for bem-sucedido, uma mensagem de boas-vindas com o seu nome será exibida, 
                indicando que você entrou na conta com sucesso.`);
                break;
            // Caso a dúvida seja sobre a recuperação de senha
            case "2":
            case "ESQUECI MINHA SENHA. COMO POSSO RECUPERA-LÁ ?":
            console.clear();
                console.log(`Sinto muito, nosso Banco é inicial....seu dinheiro agora é nosso! Obrigado.`);
                break;

            // Caso a dúvida seja sobre conta bloqueada ou suspensa
            case "3":
            case "O QUE FAZER SE MINHA CONTA FOR BLOQUEADA OU SUSPENSA ?":
            console.clear();
                console.log("Se for chorar, manda áudio! Nós não nos responsabilizamos por contas bloqueadas ou suspensas.");
                break;

            // Caso a dúvida seja sobre como verificar saldo e histórico de transações
            case "4":
            case " COMO POSSO VERIFICAR O SALDO E HISTÓRICO DE TRANSAÇÕES DA MINHA CONTA ?":
            console.clear();
                console.log(`\ 
                    1 - ➱ No menu bancário, selecione a opção 2. Entrar na Conta.
                    2 - ✔ Insira o ID da conta e a senha.
                    3 - ✔ No menu da conta, selecione a opção 1. 
                    Ver Extrato para visualizar o saldo e o histórico de transações.`);
                break;

            // Caso a dúvida seja sobre como realizar transferências
            case "5":
            case " COMO REALIZAR TRANSFERÊNCIAS ENTRE CONTAS OU PARA TERCEIROS PELO SITE ?":
            console.clear();
                console.log(`\ 
                    1 - ➱ No menu bancário, selecione a opção 2. Entrar na Conta.
                    2 - ✔ Insira o ID da conta e a senha.
                    3 - ✔ No menu da conta, selecione a opção 4. Transferência.
                    4 - ✔ Insira o valor da transferência.
                    5 - ✔ Insira o ID da conta de destino. (O sistema verificará se a conta de destino existe.)
                    6 - ✔ O sistema realizará a transferência e atualizará o seu saldo e o histórico de transações.`);
                break;

            // Caso a dúvida seja sobre atividades fraudulentas
            case "6":
            case "O QUE FAZER SE EU SUSPEITAR DE ATIVIDADE FRAUDELENTA NA MINHA CONTA ?":
            console.clear();
                console.log(`Ligue para a central de atendimento do banco pelo número 4002-8922. 
                    Informe o problema e forneça os detalhes necessários para que a equipe possa investigar a situação.`);
                break;

            // Caso o usuário queira sair do FAQ
            case "SAIR":
            case "sair":
            case "Sair":
                loop = false;
                console.log("Saindo do FAQ...");
                break;

            // Caso a entrada do usuário não corresponda a nenhuma opção válida
            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }
    }
}

// Função para exibir o menu inicial
function menuInicial(): void {
    let continuar = true;
    console.clear();
    while (continuar) {
        console.log(`\ 
        -----------------------------------
        ------------ BANRISUL -------------
        -----------------------------------
        - 1. ACESSAR BANRISUL             -
        - 2. INFORMAÇÕES DO BANRISUL      -
        - 3. AJUDA                        -
        - 4. SAIR                         -
        -----------------------------------`);

        let opcao = rl.questionInt("Escolha uma opcao: ");

        switch (opcao) {
            case 1:
                console.log("\nEntrando No Banrisul...");
                menuBancario();
                break;
            case 2:
                console.log("\n O Banrisul oferece serviços de contas correntes e poupanças.");
                break;
            case 3:
                console.log("\nEntrando em contato com o FAQ...");
                FAQ();
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
    console.clear();

    while (continuar) {
        console.log(`\
        ------------------------------------
        ----------- MENU BANRISUL ----------
        ------------------------------------
        - 1. CRIAR NOVA CONTA              -
        - 2. ENTRAR NA CONTA               -
        - 3. AJUDA                         -
        - 4. VOLTAR AO MENU INICIAL        -
        ------------------------------------`);

        let opcao = rl.questionInt("Escolha uma opcao: ");

        switch (opcao) {
            case 1:
                let tipo = rl
                    .question("Tipo de conta (corrente/poupanca): ")
                    .toLowerCase();
                let novaConta = criarConta(tipo);
                contas.push(novaConta);
                console.clear();
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
    console.clear();
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

        let opcao = rl.questionInt("Escolha uma opcao: ");

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
                let contaDestino = contas.find((conta) => conta.Id === idDestino);
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
                    console.log(
                        "Essa opção está disponível apenas para contas poupança."
                    );
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
// Função para pressionar Enter e continuar
function pressionarEnterParaContinuar(): void {
    rl.question("Pressione Enter para continuar...");
}
// Chamar a função no final do script
pressionarEnterParaContinuar();

// Iniciar o sistema com o menu inicial
menuInicial();

