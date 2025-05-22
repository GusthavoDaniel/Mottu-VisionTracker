# Protótipo de Aplicativo para Mapeamento Inteligente de Pátio e Gestão de Motos (RFID)

Este projeto é um protótipo funcional de um aplicativo móvel desenvolvido em React Native com Expo, simulando o uso de um sistema de mapeamento inteligente de pátio e gestão de motos, com base na tecnologia RFID.

## Integrantes

*   **Nome Completo:** [Gusthavo Daniel de Souza]
*   **RM:** [RM554681]
*   **Nome Completo:** [Guilherme Damasio Roselli]
*   **RM:** [555873]
    **Nome Completo:** [Lucas Miranda Leite]
*   **RM:** [555161]


## Descrição da Solução Implementada (1º Sprint)

O protótipo atual atende aos requisitos da primeira sprint, focando na estrutura fundamental do aplicativo e na simulação das funcionalidades principais relacionadas à gestão de motos em um pátio, com a perspectiva de uma futura integração com um sistema RFID.

### Funcionalidades Principais:

1.  **Navegação entre Telas:**
    *   O aplicativo utiliza **Expo Router** para gerenciar a navegação.
    *   Foram implementadas 5 rotas navegáveis principais:
        *   **Dashboard (Tela Inicial):** Apresenta uma visão geral simulada do pátio, como o número de motos e alertas (mockados).
        *   **Lista de Motos:** Exibe todas as motos cadastradas, permitindo visualização e acesso aos detalhes de cada uma, além de um atalho para cadastrar novas motos.
        *   **Detalhes da Moto:** Mostra informações detalhadas de uma moto selecionada (placa, modelo, cor, proprietário) e um histórico simulado de localizações, que representaria as leituras RFID.
        *   **Cadastrar/Editar Moto:** Um formulário permite adicionar novas motos ou editar informações de motos existentes.
        *   **Configurações:** Tela com informações sobre o aplicativo e os desenvolvedores.

2.  **Protótipo Visual Funcional:**
    *   Todas as telas possuem um layout funcional e coerente com o fluxo de uso proposto.
    *   Os dados exibidos são, em grande parte, mockados (fixos ou gerados dinamicamente com `useState`) para simular a interação com um backend e o sistema RFID.
    *   O fluxo de navegação entre as telas é lógico e intuitivo, permitindo ao usuário realizar as operações básicas de visualização, cadastro e edição de motos.

3.  **Formulário com Manipulação de Estado:**
    *   A tela de "Cadastrar/Editar Moto" contém um formulário cujos campos (placa, modelo, cor, proprietário) são controlados utilizando o hook `useState`.
    *   O formulário reage às mudanças, permitindo que os dados inseridos sejam validados (de forma simples) e "salvos" (atualmente com AsyncStorage).
    *   Os dados digitados são mantidos no estado do componente enquanto o usuário interage com o formulário.

4.  **Armazenamento Local com AsyncStorage:**
    *   As informações das motos cadastradas ou editadas através do formulário são persistidas localmente utilizando `@react-native-async-storage/async-storage`.
    *   Ao reiniciar o aplicativo, os dados das motos salvas anteriormente são carregados e exibidos corretamente na "Lista de Motos" e na tela de "Detalhes da Moto". Isso garante que as informações não sejam perdidas entre as sessões de uso.

### Simulação da Solução com RFID:

No contexto deste protótipo (Sprint 1), a integração com hardware RFID é simulada:

*   **Cadastro:** Ao cadastrar uma moto, não há um campo para inserir uma tag RFID manualmente. Assume-se que, em um sistema real, uma tag seria associada à moto.
*   **Localização e Histórico:** As informações de "última localização" e "histórico de movimentações" exibidas nas telas de lista e detalhes são dados mockados. Eles representam como o aplicativo exibiria as informações provenientes de leitores RFID que rastreiam as motos no pátio.

O objetivo desta sprint foi construir a fundação do aplicativo móvel, demonstrando a navegação, a interface do usuário para gerenciamento de motos, a manipulação de dados em formulários e a persistência local, tudo isso enquanto se mantém a visão da futura integração com a tecnologia RFID para o mapeamento inteligente.

## Como Rodar o Projeto Localmente

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos:

*   Node.js (versão LTS recomendada)
*   npm ou Yarn
*   Expo CLI instalado globalmente: `npm install -g expo-cli`
*   Um dispositivo móvel (Android/iOS) com o aplicativo Expo Go instalado OU um emulador/simulador Android/iOS configurado em sua máquina.

### Passos para Instalação e Execução:

1.  **Clone o repositório (ou baixe e extraia o código-fonte):**
    ```bash
    # Se estiver usando Git
    git clone [URL_DO_REPOSITORIO_GITHUB_CLASSROOM]
    cd nome-do-repositorio
    ```
    (Substitua `[URL_DO_REPOSITORIO_GITHUB_CLASSROOM]` pelo endereço fornecido e `nome-do-repositorio` pelo nome da pasta do projeto, que é `meuAppRfid` se você estiver usando os arquivos gerados diretamente).

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd meuAppRfid
    ```

3.  **Instale as dependências do projeto:**
    ```bash
    npm install
    # ou, se você preferir Yarn:
    # yarn install
    ```

4.  **Inicie o servidor de desenvolvimento Expo:**
    ```bash
    npm start
    # ou
    # expo start
    ```

5.  **Execute o aplicativo:**
    *   Após iniciar o servidor, um QR code será exibido no terminal.
    *   **No seu dispositivo móvel:** Abra o aplicativo Expo Go e escaneie o QR code.
    *   **No emulador/simulador:**
        *   Pressione `a` no terminal para tentar abrir no emulador Android.
        *   Pressione `i` no terminal para tentar abrir no simulador iOS (requer macOS).
        *   Pressione `w` no terminal para abrir a versão web (para testes rápidos, pode não refletir 100% o comportamento mobile).

O aplicativo deverá carregar no seu dispositivo/emulador, e você poderá navegar pelas telas e testar as funcionalidades implementadas.

## Observações

*   Este é um protótipo para fins de demonstração dos requisitos da Sprint 1.
*   A integração com um backend real ou hardware RFID não faz parte do escopo desta entrega.

