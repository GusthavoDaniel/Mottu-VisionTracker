## Escopo e Fluxo: Simulação de Visão Computacional no Mapa do Pátio

**Objetivo:** Implementar uma simulação interativa de detecção de vagas e motos por visão computacional na tela "Mapa do Pátio" do aplicativo, tornando o conceito de mapeamento inteligente mais tangível e visual.

**Funcionalidades Chave (Proposta 1 Detalhada):**

1.  **Representação Visual do Pátio com "Visão de Câmera Simulada":**
    *   A tela "Mapa do Pátio" (`(tabs)/mapaPatio.tsx`) será redesenhada para incluir uma área que simula a visão de uma câmera de segurança cobrindo uma seção do pátio.
    *   Esta área poderá exibir uma imagem de fundo estática representando um pátio com vagas de estacionamento demarcadas.
    *   Sobre esta imagem, serão renderizados os ícones das motos "detectadas".

2.  **Interação de "Adicionar/Mover Moto" (Simulando Detecção):**
    *   O usuário poderá interagir com esta "visão de câmera simulada".
    *   **Adicionar Moto:** Um botão ou gesto permitirá ao usuário "simular a chegada de uma nova moto". Ao acionar, o usuário poderá selecionar uma moto da lista de motos cadastradas (ou inserir dados básicos de uma nova moto mockada para esta simulação) e posicioná-la em uma vaga disponível na imagem do pátio.
    *   **Mover Moto:** O usuário poderá tocar e arrastar um ícone de moto já "detectada" para movê-la para outra vaga ou área dentro da visão simulada.

3.  **Feedback Visual de "Detecção" e Atualização de Status:**
    *   Quando uma moto é adicionada ou movida, o sistema fornecerá um feedback visual (ex: uma breve animação ou destaque) simulando o "processamento" e "detecção" pela visão computacional.
    *   As informações de localização da moto (ex: "Vaga A1", "Setor Azul") serão atualizadas no `AsyncStorage` e refletidas nos detalhes da moto e em outras partes do app que consomem essa informação.
    *   A contagem de vagas ocupadas/livres na área simulada será atualizada dinamicamente.

4.  **Interface e Componentes:**
    *   Utilizaremos componentes visuais do React Native para criar a representação do pátio e das motos.
    *   A interação de arrastar e soltar (drag-and-drop) será implementada para mover as motos na simulação.
    *   Serão utilizados modais ou pop-ups para a seleção de motos ao "adicionar" uma nova.

**Fluxo de Uso Simulado:**

1.  Usuário acessa a tela "Mapa do Pátio".
2.  Visualiza a área de "visão de câmera simulada" com vagas e motos já "detectadas".
3.  **Para simular a chegada de uma moto:**
    *   Usuário clica no botão "Adicionar Moto na Visão da Câmera".
    *   Um modal aparece listando motos cadastradas ou permitindo mockar uma nova.
    *   Usuário seleciona/mocka a moto.
    *   Usuário toca em uma vaga vazia na imagem do pátio para posicionar a moto.
    *   App simula "detecção" e atualiza o visual e os dados.
4.  **Para simular a movimentação de uma moto:**
    *   Usuário toca e segura sobre um ícone de moto na "visão da câmera".
    *   Arrasta a moto para uma nova vaga/posição.
    *   Solta a moto.
    *   App simula "detecção" e atualiza o visual e os dados.
5.  O status das vagas (ocupadas/livres) é atualizado na interface.

**Impacto Esperado:**

*   Demonstrar de forma interativa e visual o conceito de mapeamento do pátio utilizando uma simulação de visão computacional.
*   Fornecer uma base para futuras simulações, como OCR de placas e alertas comportamentais.
*   Aumentar o alinhamento do protótipo com os objetivos do Challenge da Mottu.

**Próximos Passos (Implementação):**

1.  Redesenhar a interface da tela `(tabs)/mapaPatio.tsx` para incluir a área de "visão de câmera simulada".
2.  Implementar a lógica para renderizar a imagem de fundo do pátio e os ícones das motos sobre ela.
3.  Desenvolver a funcionalidade de "adicionar moto" com seleção e posicionamento na imagem.
4.  Implementar a funcionalidade de "mover moto" (drag-and-drop).
5.  Integrar com `AsyncStorage` para persistir a localização simulada das motos.
6.  Adicionar feedback visual para simular a "detecção".

