# Brincando e Aprendendo

Atividades lúdicas para turmas de educação infantil (Infantil 4 e Infantil 5), desenvolvidas
como Atividade Extensionista II do curso de Análise e Desenvolvimento de Sistemas da Uninter.

## Como abrir

Abra o arquivo `index.html` em qualquer navegador, com dois cliques. Não é preciso instalar nada,
criar conta nem ter internet depois do primeiro carregamento.

## As sete atividades

| Atividade | O que a criança faz |
|---|---|
| Formas e cores | Identifica a figura pedida entre as alternativas |
| Animais e sons | Reconhece, entre doze animais, qual faz o som tocado |
| Quantidades | Coloca na cesta a quantidade de itens pedida |
| Maior e menor | Compara tamanhos entre figuras iguais |
| Qual é diferente | Acha o elemento que não pertence ao grupo |
| O que vem depois | Continua um padrão que se repete |
| Jogo da memória | Encontra os pares de figuras iguais |

Nenhuma delas exige ler, escrever ou calcular: a educação infantil não alfabetiza formalmente,
e o trabalho nessa etapa é de reconhecer, comparar, nomear e contar.

## Como usar em sala

O uso previsto é coletivo: o computador ligado ao projetor ou à televisão, com a turma reunida
e as crianças se revezando para responder. Cada rodada tem 8 perguntas e leva de 3 a 5 minutos,
o que permite atender toda a turma em cerca de 30 minutos. O jogo da memória usa três tabuleiros
no lugar das 8 perguntas.

## Teclado

Toda a aplicação funciona sem mouse:

| Tecla | O que faz |
|---|---|
| Setas | Escolhem a atividade na tela inicial |
| Enter | Confirma a atividade escolhida |
| 1, 2, 3, 4 | Respondem as alternativas |
| Barra de espaço | Coloca um item na cesta (atividade de quantidades) |
| Backspace | Tira o último item da cesta |
| Esc | Fecha a ajuda ou volta ao início |
| ? | Abre a ajuda da atividade |

## Área da professora

O botão "Para a professora", no rodapé da tela inicial, permite desligar a narração,
escolher quais das sete atividades aparecem, alternar o nível e gerar uma folha para imprimir.

Os dois níveis mudam o conteúdo de verdade, e não apenas a velocidade:

- **Mais simples (Infantil 4)** — a figura pedida aparece ao lado do comando, três alternativas,
  contagem até 3, padrões de duas figuras e diferenças bem visíveis.
- **Mais completo (Infantil 5)** — a figura pedida não aparece, quatro alternativas, forma e cor
  combinadas com distratores que repetem uma das duas características, contagem até 5,
  padrões de três figuras e tamanhos mais próximos entre si.

## Estrutura dos arquivos

```
index.html            telas da aplicação
css/estilo.css        cores, tamanhos e foco visível
js/comum.js           voz, motor de som, estado e utilitários
js/formas.js          formas e cores, mais as listas usadas pelos outros módulos
js/animais.js         animais e sons
js/quantidades.js     quantidades
js/tamanhos.js        maior e menor
js/diferente.js       qual é diferente
js/sequencia.js       o que vem depois
js/memoria.js         jogo da memória
js/app.js             navegação, rodadas e controles da professora
docs/                 documentos acadêmicos do projeto
```

## Decisões técnicas

- **HTML, CSS e JavaScript puros**, sem framework, sem build e sem dependências externas:
  o arquivo roda direto do disco e pode ser publicado no GitHub Pages sem nenhuma configuração.
- **Nenhum dado é coletado.** Não há cadastro, login, nome de criança nem envio de informação
  para fora do computador. A única coisa gravada é a preferência da professora, no próprio navegador.
- **Sons dos animais são gravações reais**, na pasta `sons/`. A pasta precisa acompanhar o projeto:
  sem ela, a atividade de animais fica muda. Os retornos de acerto, erro, contagem e virada de carta
  continuam sendo sintetizados pelo navegador (Web Audio API), sem depender de arquivo nenhum.
- **A voz lê apenas o comando da atividade**, nunca o resultado. Acerto e erro são sons curtos,
  porque ouvir "muito bem" a cada acerto fica repetitivo em poucos minutos. Comandos que não mudam
  ("Qual é diferente?") são falados somente na primeira pergunta da rodada.
- **Figuras por SVG e emoji.** As formas são desenhadas em SVG; animais e itens de contagem usam
  emojis do próprio sistema, o que dispensa arquivos de imagem.

### A pasta de sons

São doze gravações: cachorro, gato, vaca, galo, cavalo, abelha, pássaro, pato, ovelha, porco,
macaco e sapo. Todas foram tratadas antes de entrar no projeto, porque arquivos baixados de
fontes diferentes chegam com volumes e durações muito desiguais:

- **Volume equalizado** em torno de −20 dB. Os originais variavam de −11 dB a −30 dB, diferença
  que, no alto-falante de um projetor, deixaria alguns sons inaudíveis e outros altos demais.
- **Duração máxima de 3 segundos**, com silêncio inicial removido e encerramento suave. O sapo
  tinha 8 segundos e o galo, 4: tempo demais para prender a atenção da turma entre uma pergunta e outra.
- **Mono, 44,1 kHz**, o que reduziu o conjunto de 3,7 MB para 1,2 MB.

Para acrescentar um animal, coloque o arquivo em `sons/` e adicione uma linha à lista `ANIMAIS`
em `js/animais.js`, com `nome`, `rotulo`, `figura` e `arquivo`. Para trocar os emojis por
ilustrações, substitua o campo `figura` por uma tag `<img>`.

A pasta `sons/originais/` guarda os arquivos como vieram, caso você prefira o som original de
algum deles. **Apague essa pasta antes de publicar no GitHub**, porque ela só ocupa espaço no
repositório.

## Acessibilidade

O desenvolvimento seguiu os princípios do Desenho Universal:

- Alvos de clique grandes e bem espaçados, para compensar a pouca precisão com mouse nessa idade.
- Tudo operável somente pelo teclado, com o elemento em foco marcado por contorno grosso amarelo.
- Informação em três canais ao mesmo tempo: imagem, cor e áudio.
- Nenhuma leitura necessária para navegar ou jogar.
- Erro nunca pune nem interrompe: o som é neutro, a alternativa errada apenas esmaece e a criança
  tenta de novo, sem limite de tentativas e sem perder estrelas já conquistadas.
- Nenhuma informação chega só pelo som. A atividade de animais é a única que depende de ouvir:
  nela o alto-falante pulsa enquanto o som toca, mostrando que há som mesmo para quem não o escuta,
  e a professora pode ligar a **legenda escrita**, que exibe a transcrição do som na tela
  ("au au au", "muuu"). As outras seis atividades não dependem de áudio em momento algum.
- A narração nunca é condição para a atividade seguir: em computador sem voz em português instalada,
  o sistema continua normalmente.
- Cores chapadas e contraste alto, porque o projetor desbota cor e perde contraste.
- Medidas em unidades relativas, para o layout servir tanto a projeção 4:3 quanto a televisão 16:9.

## Publicação no GitHub Pages

1. Criar um repositório público no GitHub e enviar esta pasta.
2. Em `Settings` > `Pages`, escolher a branch `main` e a pasta raiz.
3. O endereço gerado é o link que fica com o CMEI.
