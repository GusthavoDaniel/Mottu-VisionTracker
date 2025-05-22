## Fluxo Funcional e Arquitetura do Aplicativo

### 1. Telas e Rotas (Mínimo de 5)

O aplicativo utilizará Expo Router para a navegação. As seguintes telas/rotas estão planejadas:

1.  **`(tabs)/index.tsx` (Tela Inicial / Dashboard):**
    *   **Conteúdo:** Apresentará uma visão geral do pátio, como número de motos presentes, alertas (simulados) e talvez um acesso rápido para cadastrar uma nova moto ou visualizar a lista.
    *   **Navegação:** Será a tela principal dentro de uma navegação por abas (Tabs).

2.  **`(tabs)/motos.tsx` (Lista de Motos):**
    *   **Conteúdo:** Exibirá uma lista de todas as motos cadastradas. Cada item da lista mostrará informações resumidas (ex: placa, modelo, última localização simulada).
    *   **Navegação:** Acessível via aba. Permitirá navegar para os detalhes de uma moto específica e para a tela de cadastro de nova moto.

3.  **`moto/[id].tsx` (Detalhes da Moto):**
    *   **Conteúdo:** Mostrará informações detalhadas de uma moto selecionada da lista, como placa, modelo, cor, proprietário, e um histórico simulado de localizações (baseado na ideia do RFID).
    *   **Navegação:** Acessada ao selecionar uma moto na tela `(tabs)/motos.tsx`. Permitirá navegar para a edição da moto.

4.  **`cadastrarMoto.tsx` (Cadastro/Edição de Moto - Formulário):**
    *   **Conteúdo:** Formulário para inserir ou editar dados de uma moto (placa, modelo, cor, proprietário, etc.). Este formulário utilizará `useState` para manipulação de estado e os dados poderão ser salvos com `AsyncStorage`.
    *   **Navegação:** Acessada a partir da tela `(tabs)/motos.tsx` (botão "Adicionar Nova Moto") ou da tela `moto/[id].tsx` (botão "Editar Moto"). Após salvar, deve redirecionar para a lista de motos ou para os detalhes da moto.

5.  **`(tabs)/configuracoes.tsx` (Configurações / Sobre):**
    *   **Conteúdo:** Informações sobre o aplicativo, versão, desenvolvedores (RM dos integrantes). Poderá incluir opções de configuração simples, como preferências do usuário que podem ser salvas com `AsyncStorage` (ex: tema claro/escuro, se for implementado).
    *   **Navegação:** Acessível via aba.

### 2. Fluxo de Uso Lógico

1.  O usuário abre o aplicativo e é direcionado para a tela Inicial (Dashboard).
2.  A partir do Dashboard, o usuário pode navegar para a "Lista de Motos" ou "Configurações" através das abas.
3.  Na "Lista de Motos", o usuário pode visualizar as motos existentes ou tocar em um botão para adicionar uma "Nova Moto", o que o levará para a tela de "Cadastro/Edição de Moto".
4.  Ao tocar em uma moto específica na lista, o usuário é levado para a tela de "Detalhes da Moto".
5.  Na tela de "Detalhes da Moto", o usuário pode ver todas as informações da moto e optar por "Editar" a moto, o que o levará para a tela de "Cadastro/Edição de Moto" com os dados preenchidos.
6.  Na tela de "Cadastro/Edição de Moto", o usuário preenche/altera os dados. Ao salvar, os dados são processados (e armazenados localmente com AsyncStorage) e o usuário é redirecionado (ex: para a lista de motos).
7.  A tela de "Configurações" permite ao usuário ver informações sobre o app e, potencialmente, ajustar preferências que também podem ser persistidas com AsyncStorage.

### 3. Arquitetura Inicial do Projeto (React Native com Expo)

*   **Gerenciador de Pacotes:** npm ou Yarn.
*   **Navegação:** Expo Router (estrutura de arquivos e pastas baseada em rotas).
*   **Estrutura de Pastas Sugerida:**
    ```
    /app
      (tabs)/
        _layout.tsx         # Layout das abas
        index.tsx           # Tela Inicial (Dashboard)
        motos.tsx           # Tela Lista de Motos
        configuracoes.tsx   # Tela de Configurações
      moto/
        [id].tsx            # Tela Detalhes da Moto
      cadastrarMoto.tsx     # Tela de Cadastro/Edição de Moto
      _layout.tsx           # Layout principal do app (Stack)
    /components             # Componentes reutilizáveis (ex: CardMoto, BotaoCustomizado, InputCustomizado)
    /constants              # Constantes (cores, estilos, etc.)
    /hooks                  # Hooks customizados (ex: useAuth, useStorage)
    /services               # Lógica de AsyncStorage, simulação de API
    /assets                 # Imagens, fontes, etc.
    ```
*   **Estado:** `useState` para controle de formulários e estados locais de componentes. `useContext` pode ser considerado para estados globais simples, se necessário, mas para a Sprint 1, `useState` e passagem de props/dados de rota devem ser suficientes.
*   **Armazenamento Local:** `AsyncStorage` para persistir dados do formulário e/ou preferências do usuário.
*   **Dados Mockados:** Inicialmente, os dados das motos e localizações serão fixos ou gerados dinamicamente com `useState` para simular a integração com a API RFID e o backend.

### 4. Considerações sobre RFID no Protótipo

No contexto da Sprint 1, a integração real com hardware RFID está fora do escopo. A simulação ocorrerá da seguinte forma:

*   **Cadastro de Moto:** O formulário incluirá campos que normalmente seriam associados a uma moto (placa, modelo, etc.). Não haverá um campo "Tag RFID" para preenchimento manual, mas podemos simular que cada moto cadastrada *teria* uma tag associada.
*   **Visualização de Localização:** Nas telas "Lista de Motos" e "Detalhes da Moto", a "última localização" será um dado mockado (ex: "Pátio A - Seção 2", "Entrada Principal", "Saída Oficina"). Poderemos ter um conjunto de localizações predefinidas e atribuí-las aleatoriamente ou de forma fixa às motos mockadas.
*   **Histórico de Movimentação:** Na tela "Detalhes da Moto", o histórico de movimentação será uma lista de entradas mockadas (ex: `{ timestamp: '2024-05-13 10:00:00', local: 'Entrada Pátio' }`).

O objetivo é criar a interface e o fluxo que *eventualmente* se conectariam a uma API que recebe dados de leitores RFID. O foco da Sprint 1 é a estrutura do app, navegação, formulários e armazenamento local.
