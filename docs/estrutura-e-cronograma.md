# Estrutura de telas e cronograma

## Definições fixas do projeto

- **Setor de aplicação**: CMEI Educadora Andréia da Silva Alves, conhecido como CMEI Califórnia — Rua Saracura, 1314, Capela Velha, Araucária/PR.
- **Público-alvo**: crianças das turmas Infantil 4 e Infantil 5, de 4 e 5 anos.
- **ODS**: 4 — Educação de qualidade.
- **Tecnologia**: HTML, CSS e JavaScript puros, publicados no GitHub Pages. Sem login, sem banco de dados, sem instalação.
- **Equipamento**: um notebook, levado pelo próprio aluno, ligado a projetor ou televisão do CMEI. A escola não precisa ter computador, laboratório de informática, tablet nem celular, porque a maioria dos CMEIs não tem. A aplicação acontece com a turma reunida diante da projeção.

## Decisão pedagógica que sustenta o projeto

A educação infantil não alfabetiza formalmente: pela BNCC, o trabalho nessa etapa é de reconhecimento, nomeação e correspondência, enquanto letras, sílabas e operações pertencem ao 1º e 2º ano do Fundamental. Por isso nenhum módulo pede leitura, escrita ou cálculo. As atividades ficam em identificar, nomear e contar, que é o que as turmas Infantil 4 e Infantil 5 fazem em sala. Vale escrever isso no relatório: mostra que a solução foi desenhada para a realidade local, e não um jogo genérico aplicado a esmo.

## Estrutura de telas

### Tela 1 — Início

- Título grande e três botões enormes, cada um com ícone, cor própria e áudio ao ser focado ou clicado: **FORMAS E CORES**, **ANIMAIS E SONS**, **QUANTIDADES**.
- Nenhum texto precisa ser lido para navegar: ícone, cor e áudio bastam.
- Teclado: setas movem o destaque entre os botões, Enter ou barra de espaço entra no jogo. O botão em foco ganha contorno grosso, visível a vários metros.
- Rodapé discreto com um botão pequeno "Para a professora", que abre a Tela 6.

### Tela 2 — Formas e cores (Infantil 4)

- Área superior: um comando falado e ilustrado, por exemplo "ache o círculo vermelho", com a forma-alvo desenhada ao lado do texto.
- Área inferior: três figuras grandes, só uma correta, variando forma e cor.
- Progressão: primeiro só forma, depois só cor, por fim as duas combinadas.
- Teclas 1, 2 e 3 marcadas no canto de cada figura respondem sem mouse.

### Tela 3 — Animais e sons (Infantil 4)

- Toca o som de um animal e mostra três animais; a criança escolhe de quem é o som.
- Alternativa invertida em metade das rodadas: mostra o animal e toca três sons, um por vez, para a criança indicar o certo.
- Conjunto de 12 a 15 animais conhecidos, sorteados sem repetir na mesma rodada.

### Tela 4 — Quantidades (Infantil 5)

- Comando visual e falado com o número grande à vista: "coloque 3 maçãs na cesta".
- Itens vão para a cesta com um clique simples, sem arrastar — arrastar com mouse é inviável nessa idade. Pelo teclado, a barra de espaço adiciona um item e Backspace remove o último.
- Contagem falada a cada item colocado, reforçando a correspondência entre número e quantidade.
- Confirmação automática ao atingir a quantidade; se passar, o excedente volta sozinho.
- Progressão: de 1 a 3, depois de 1 a 5. Não passa de 5, que é o limite da etapa.

### Tela 5 — Fim de rodada

- Estrelas conquistadas em tamanho grande, com animação curta de comemoração.
- Dois botões: **JOGAR DE NOVO** e **VOLTAR AO INÍCIO**.
- Sem nota, sem porcentagem, sem comparação entre crianças.

### Tela 6 — Área da professora

- Explicação em uma tela de como usar em sala, com sugestão de tempo por criança.
- O modo de uso padrão é o **coletivo**: um notebook ligado ao projetor ou à televisão, com a turma reunida em roda. As crianças se revezam vindo ao notebook para responder, uma por vez, enquanto as demais acompanham na tela grande e participam em voz alta. É esse revezamento que garante o contato individual de cada criança com o equipamento, ponto que sustenta a premissa de inclusão digital da disciplina.
- O modo **individual**, uma criança por computador, fica previsto no código para o caso de a escola receber máquinas depois, mas não é o cenário de aplicação.
- Controles: ligar ou desligar o áudio, escolher a faixa de progressão e habilitar só os módulos que interessam àquela turma, para separar Infantil 4 de Infantil 5.
- Botão para imprimir uma folha de atividade correspondente ao módulo jogado.

### Tela 7 — Ajuda rápida, em sobreposição

- Acionada pelo botão de interrogação em qualquer módulo.
- Mostra em imagem o que fazer, com narração. Fecha com um clique em qualquer lugar ou com Esc.

## Comportamento de acerto e erro, igual em todos os módulos

- Acerto: som alegre, a figura cresce, uma estrela aparece e avança sozinho em 2 segundos.
- Erro: som neutro, nunca um som de reprovação; a alternativa errada esmaece e a criança tenta de novo. Sem perder pontos, sem travar, sem limite de tentativas.
- Rodada de 8 a 10 questões, curta o bastante para caber no tempo de atenção da faixa.

## Requisitos não funcionais

Ligados aos sete princípios do Desenho Universal — vale citá-los por esse nome no relatório:

- Alvos de clique com no mínimo 120 por 120 pixels, bem espaçados, para compensar a pouca precisão com mouse e touchpad (baixo esforço físico, dimensão para uso).
- Tudo legível a cinco metros de distância, porque a maior parte da turma vai acompanhar pela projeção e não pela tela do notebook: poucos elementos por tela, fontes grandes e nenhuma informação em texto pequeno.
- Saída de vídeo tratada como incerta: o layout precisa funcionar tanto em projeção 4:3 quanto em televisão 16:9, sem cortar elementos.
- Tudo operável só pelo teclado, sem depender do mouse, com o elemento em foco sempre marcado por contorno grosso.
- Toda informação em três canais ao mesmo tempo: imagem, cor e áudio (informação de fácil percepção).
- Nenhuma leitura necessária para navegar ou jogar (igualitário, intuitivo).
- Erro nunca pune nem interrompe; sempre permite nova tentativa (tolerância ao erro).
- Áudio, progressão e módulos ativos ajustáveis pela professora (adaptável).
- Dimensionamento em unidades relativas, para o mesmo layout seguir legível tanto num monitor de 17 polegadas quanto projetado numa parede.
- Cores chapadas e contraste alto, sem tons claros sobre branco nem cinza sobre cinza: projetor desbota cor e perde contraste.
- Funciona offline após o primeiro carregamento e não exige instalação.

## Cronograma

Treze tarefas em sequência lógica, acima do mínimo de oito exigido. Total de 34 dias úteis, de 23 de outubro a 11 de dezembro de 2026, com a aplicação na escola concluída ainda em novembro, antes do recesso escolar.

O prazo real do projeto é novembro: a aplicação precisa acontecer enquanto as turmas estão em aula, e CMEIs municipais costumam entrar em recesso a partir da segunda quinzena de dezembro. Por isso tudo que depende da escola está concentrado até o fim de novembro, e só a redação fica para dezembro.

| # | Tarefa | Descrição | Duração | Período |
|---|---|---|---|---|
| 1 | Contato e levantamento no CMEI | Falar com a professora, apresentar a proposta à direção, confirmar as turmas, verificar se há projetor ou televisão com entrada de vídeo e levantar as necessidades das turmas | 5 dias | 23/10 a 29/10 |
| 2 | Definição de requisitos | Listar requisitos funcionais e não funcionais, definir personas (criança de 4 a 5 anos e professora) e critérios de aceitação | 2 dias | 03/11 a 04/11 |
| 3 | Modelagem e diagramas | Produzir o diagrama de contexto, o fluxograma de navegação entre telas e o diagrama de casos de uso por perfil | 2 dias | 05/11 a 06/11 |
| 4 | Estrutura base e tela inicial | Criar o repositório no GitHub, a estrutura de pastas, o CSS base, a navegação por mouse e teclado e publicar no GitHub Pages | 3 dias | 09/11 a 11/11 |
| 5 | Módulo formas e cores | Implementar a tela, o banco de figuras, o sorteio de questões, os áudios e o retorno de acerto e erro | 3 dias | 12/11 a 16/11 |
| 6 | Módulo animais e sons | Implementar a tela reaproveitando a mecânica do módulo anterior, com o banco de sons e a variação invertida | 2 dias | 17/11 a 18/11 |
| 7 | Módulo quantidades | Implementar a tela, a contagem falada, a progressão e a confirmação automática | 3 dias | 19/11 a 23/11 |
| 8 | Área da professora e ajuda | Implementar as configurações, o modo coletivo, a ajuda ilustrada e a folha de atividade para impressão | 2 dias | 24/11 a 25/11 |
| 9 | Testes de acessibilidade e uso | Rodar o checklist do Desenho Universal, testar com mouse, só com teclado e em projeção real, corrigir alvos de clique, contraste, foco visível e áudio | 2 dias | 26/11 a 27/11 |
| 10 | Aplicação no CMEI | Levar o notebook, aplicar a atividade com as turmas Infantil 4 e Infantil 5 junto da professora e observar as dificuldades reais | 1 dia | 01/12 |
| 11 | Coleta de evidências | Recolher o feedback da professora e obter a declaração assinada e carimbada pela instituição | 2 dias | 01/12 a 02/12 |
| 12 | Vídeo de demonstração | Gravar o vídeo de até 5 minutos apresentando-se e mostrando as telas e as funcionalidades em funcionamento | 2 dias | 03/12 a 04/12 |
| 13 | Redação do relatório | Preencher o modelo institucional, inserir os diagramas e as evidências, revisar pelo checklist e converter em PDF | 5 dias | 07/12 a 11/12 |

## Pontos de atenção para a nota

- O cronograma vale 30% e precisa aparecer no relatório como diagrama ou tabela sequencial, com a duração de cada tarefa. A tabela acima já atende.
- Agende a data da aplicação já no primeiro contato, não depois de o site estar pronto. É a única etapa que não depende de você, e sem ela o trabalho é reprovado.
- Novembro de 2026 tem três semanas encurtadas: 2 de novembro cai na segunda, 15 cai no domingo e 20 cai na sexta, com emenda provável na escola. Evite marcar a aplicação nessas semanas e confirme o calendário e a data de início do recesso com a coordenação logo na primeira conversa.
- Se a escola só puder receber você mais cedo, antecipe a aplicação e aplique uma versão com dois módulos em vez de três. Entregar menos funcionalidade com aplicação comprovada passa; entregar tudo sem aplicação reprova.
- A comprovação de aplicação vale 40% e, sem ela, o trabalho é reprovado. A alternativa IV do roteiro, com declaração assinada e carimbada pela instituição, é a que você controla melhor e não exige foto sua nem publicação em rede social.
- Peça a declaração na mesma visita da aplicação, já com o texto pronto e impresso para a coordenação apenas assinar e carimbar.
- Nas evidências, nenhuma imagem pode mostrar rosto de criança, nome de criança ou documento com dados de aluno. Fotos de tela do sistema e a declaração da instituição bastam.
- As considerações finais exigem no mínimo três aprendizados ou dificuldades. Anote durante o trabalho, não no fim: o que falhou no laboratório, o que as crianças não entenderam de primeira, o que a professora pediu diferente.
- O relatório tem limite de 10 páginas e aceita um único arquivo PDF, sem segundo envio.
