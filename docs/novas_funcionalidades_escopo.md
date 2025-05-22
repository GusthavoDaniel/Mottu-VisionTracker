## Expansão do Aplicativo: Novas Funcionalidades e Telas (RFID Simulado)

Este documento detalha o escopo e o fluxo das novas funcionalidades e telas a serem adicionadas ao protótipo do aplicativo de mapeamento inteligente de pátio e gestão de motos, com foco na simulação da tecnologia RFID.

### 1. Tela de "Mapa do Pátio (Simulado)"

*   **Objetivo:** Fornecer uma representação visual simplificada do pátio, indicando a localização simulada das motos.
*   **Escopo:**
    *   Nova rota: `/mapaPatio` (poderia ser uma nova aba ou acessível por um botão no Dashboard).
    *   Layout visual simples representando zonas do pátio (ex: "Portaria", "Pátio A", "Pátio B", "Oficina", "Zona de Carga").
    *   Ícones representando as motos posicionados (de forma aproximada e simulada) em suas últimas localizações conhecidas (obtidas do AsyncStorage).
    *   Ao tocar em um ícone de moto, poderia exibir um breve resumo (placa, modelo) e um botão para "Ver Detalhes" (navegando para `moto/[id].tsx`).
    *   Não envolverá geolocalização real ou mapas interativos complexos nesta fase.
*   **Fluxo de Navegação:**
    *   Usuário acessa a tela "Mapa do Pátio" (ex: a partir de uma nova aba ou de um botão no Dashboard).
    *   Visualiza a disposição das motos no pátio simulado.
    *   Pode tocar em uma moto para ver um pop-up/modal com informações rápidas e um link para a tela de detalhes.
*   **Dados:** Utilizará os dados de motos e suas `ultimaLocalizacao` (simulada) do AsyncStorage.

### 2. Melhoria na Tela de "Detalhes da Moto" (`moto/[id].tsx`)

*   **Objetivo:** Aprofundar as informações de rastreamento simulado por RFID.
*   **Escopo:**
    *   Adicionar novos campos visuais na tela existente:
        *   "Último Ponto de Leitura RFID (Simulado)": Ex: "Antena Portaria", "Leitor Zona Carga 2". (Este campo pode ser o mesmo que `ultimaLocalizacao` ou um campo novo mais específico para RFID).
        *   "Horário da Última Leitura (Simulado)": Data e hora da última "passagem" simulada.
        *   "Status RFID (Simulado)": Ex: "Dentro do Pátio", "Em Movimentação Interna", "Aguardando Saída".
    *   O histórico de localizações já existente pode ser mantido e reforçado como "Histórico de Leituras RFID".
*   **Fluxo de Navegação:** Sem alteração no fluxo, apenas adição de informações na tela.
*   **Dados:** Os novos campos precisarão ser adicionados à estrutura de dados da moto no AsyncStorage e no formulário de cadastro/edição (ou serem gerados/simulados dinamicamente com base na `ultimaLocalizacao` e um timestamp).

### 3. Funcionalidade de "Buscar Moto no Pátio"

*   **Objetivo:** Permitir ao usuário localizar rapidamente uma moto específica.
*   **Escopo:**
    *   **Opção 1 (na Lista de Motos):** Adicionar um campo de input de texto na tela `(tabs)/motos.tsx` para filtrar a lista de motos em tempo real por placa ou modelo.
    *   **Opção 2 (no Mapa do Pátio):** Se o mapa for implementado, um campo de busca similar poderia destacar a moto no mapa ou filtrar os ícones visíveis.
    *   Para a implementação inicial, focar na Opção 1 (busca na lista) por ser mais simples.
*   **Fluxo de Navegação:** Usuário digita no campo de busca na tela "Lista de Motos" e a lista é filtrada dinamicamente.
*   **Dados:** A busca operará sobre os dados das motos carregados do AsyncStorage.

### 4. Tela de "Registro de Evento RFID (Manual/Simulado)"

*   **Objetivo:** Simular a passagem de uma moto por um leitor RFID para testar o fluxo de atualização de localização.
*   **Escopo:**
    *   Nova rota: `/registrarEventoRfid`.
    *   Um formulário simples onde o usuário poderá:
        *   Selecionar uma moto cadastrada (ex: por um Picker/Dropdown com as placas das motos).
        *   Selecionar um "Ponto de Leitura RFID Simulado" (ex: "Entrada Pátio", "Saída Oficina", "Zona B - Leitor 03").
        *   Opcionalmente, definir data/hora do evento (ou usar a atual).
    *   Ao "Registrar Evento", o aplicativo deverá:
        *   Atualizar a `ultimaLocalizacao` da moto selecionada no AsyncStorage.
        *   Adicionar uma entrada ao `historico` de localizações da moto.
        *   Atualizar o "Horário da Última Leitura (Simulado)".
*   **Fluxo de Navegação:**
    *   Usuário acessa a tela "Registrar Evento RFID" (ex: por um menu de desenvolvedor/simulação ou um botão em local apropriado).
    *   Preenche os dados e submete.
    *   Recebe uma confirmação e pode ser redirecionado para a lista de motos ou detalhes da moto atualizada.
*   **Dados:** Interagirá diretamente com os dados das motos no AsyncStorage.

### 5. Tela de "Histórico de Alertas (RFID Simulado)"

*   **Objetivo:** Centralizar e exibir alertas que seriam gerados por um sistema RFID real.
*   **Escopo:**
    *   Nova rota: `/historicoAlertas` (poderia ser uma nova aba ou acessível pelo Dashboard).
    *   Listagem de alertas simulados. Cada alerta conteria:
        *   Tipo de Alerta (ex: "Movimentação Suspeita", "Parada Prolongada", "Bateria Baixa RFID" - simulado).
        *   Moto Associada (Placa).
        *   Localização do Alerta (Simulada).
        *   Data/Hora do Alerta.
    *   Os alertas seriam mockados inicialmente ou poderiam ser gerados (simuladamente) com base em regras simples aplicadas aos eventos RFID registrados (ex: se uma moto fica no mesmo local por X tempo após um evento, gera um alerta de "Parada Prolongada").
    *   Possibilidade de marcar alertas como lidos/resolvidos (simulado).
*   **Fluxo de Navegação:** Usuário acessa a tela e visualiza a lista de alertas.
*   **Dados:** Os alertas seriam armazenados em uma nova chave no AsyncStorage (ex: `@AlertasRfid:key`) ou seriam dados mockados no código da tela.

### Estrutura de Pastas e Rotas (Adições Sugeridas):

```
/app
  (tabs)/
    _layout.tsx
    index.tsx           # Dashboard (já modificado)
    motos.tsx           # Lista de Motos (adicionar busca)
    mapaPatio.tsx       # NOVA TELA: Mapa do Pátio Simulado
    historicoAlertas.tsx # NOVA TELA: Histórico de Alertas
    configuracoes.tsx
  moto/
    [id].tsx            # Detalhes da Moto (melhorias visuais e de dados)
  cadastrarMoto.tsx     # Cadastro/Edição (possivelmente adicionar campos para novos dados RFID simulados)
  registrarEventoRfid.tsx # NOVA TELA: Registrar Evento RFID Simulado
  _layout.tsx
```

### Próximos Passos:

1.  Confirmar com o usuário a prioridade e o detalhamento dessas funcionalidades.
2.  Iniciar a implementação incremental, começando pelas telas e funcionalidades mais simples ou de maior impacto visual/funcional.
3.  Validar cada funcionalidade implementada com o usuário.

