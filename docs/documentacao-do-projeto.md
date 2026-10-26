# Documentação do projeto — Brincando e Aprendendo

Este documento reúne a parte de engenharia de software do projeto: levantamento, requisitos,
modelagem, planejamento, riscos, qualidade e o mapeamento com os ODS e com o Desenho Universal.
É o material de onde se extrai o conteúdo do relatório final; não substitui o relatório, que deve
ser escrito no template institucional `Atividade_Extensionista_II_Evidencias.docx`.

---

## 1. O que a disciplina cobra, e onde cada coisa é cobrada

Vale separar duas coisas que os documentos da Uninter tratam em lugares diferentes.

**O que vale nota** está no Quadro 1 do roteiro, e são apenas cinco critérios, cada um avaliado
como "atende" (100%) ou "não atende" (0%), sem meio-termo:

| Critério | Peso | O que exige |
|---|---|---|
| Identificação do trabalho | 10% | Curso, integrantes, RU e professor responsável preenchidos corretamente |
| Cronograma / Metodologia | 30% | Cronograma sequencial com tarefas, ordem lógica e duração — **no mínimo 8 tarefas** com descrição e dias |
| Resultados esperados | 40% | Vídeo de até 5 min + link do código + comprovação de aplicação na comunidade |
| Considerações finais | 10% | Relato reflexivo com **no mínimo três** aprendizados ou dificuldades |
| Formatação ABNT, referências e estrutura | 10% | Aderência ao modelo institucional |

A disciplina é de entrega única: não há etapa de Validação da Proposta, apenas o Trabalho Final.
A nota mínima para aprovação é 70. Como cada critério é tudo ou nada, perder o cronograma (30%)
ou a formatação (10%) junto com qualquer outro item já reprova. E há uma regra que anula o resto:
*"trabalhos sem a comprovação de desenvolvimento e aplicação dentro da comunidade local serão
reprovados"*.

**O que o manual recomenda** é outra coisa: a seção 5 do manual da AE II descreve um roteiro de
engenharia de software — abordagem de gestão, engenharia de requisitos, modelagem, planejamento
de tempo, recursos, riscos e qualidade. Nada disso aparece como critério próprio no Quadro 1.

Então respondendo à dúvida de forma direta: **levantamento de informações e análise de requisitos
não são itens de nota separados, mas não são opcionais**. Eles entram por dois caminhos. Primeiro,
o critério de Metodologia, que vale 30%, e o manual diz expressamente que o corretor observará
"metodologia com diagrama claro e sequência de atividades" — ou seja, um cronograma sem modelagem
nenhuma atende pelo texto do Quadro 1, mas contraria o que o manual diz que o corretor procura.
Segundo, o critério de estrutura, que vale 10%. O caminho seguro é apresentar o essencial:
requisitos, um diagrama de contexto, um fluxo e o cronograma — que é exatamente o que está nas
seções seguintes.

---

## 2. Levantamento

### 2.1 Problema identificado

A educação infantil pública enfrenta duas limitações que se somam.

A primeira é material. Os recursos digitais disponíveis para essa faixa etária são, em sua maioria,
aplicativos pagos, que exigem download em tablets ou celulares que a instituição não possui e
pressupõem uma estrutura tecnológica incompatível com a de um CMEI municipal. O resultado é que a
inclusão digital, nessa etapa, simplesmente não acontece — não por desinteresse das professoras,
mas por falta de ferramenta compatível com o que a escola de fato tem.

A segunda é pedagógica. Grande parte do material digital infantil é material de alfabetização
adaptado, que pede leitura, escrita ou cálculo. A Base Nacional Comum Curricular não prevê
alfabetização formal na educação infantil: o trabalho nessa etapa se dá por reconhecimento,
nomeação, correspondência e exploração, enquanto letras, sílabas e operações pertencem aos anos
iniciais do Ensino Fundamental. Uma ferramenta que ignore essa distinção não é utilizável pela
professora, por melhor que seja tecnicamente.

### 2.2 Contexto de uso

| Aspecto | Situação |
|---|---|
| Instituição | CMEI Educadora Andréia da Silva Alves (CMEI Califórnia), Capela Velha, Araucária/PR |
| Turmas | Infantil 4 e Infantil 5 — crianças de 4 e 5 anos |
| Equipamento | Sem laboratório de informática; sem tablets para as crianças; há projetor |
| Internet | Instável ou ausente na sala de atividades |
| Operação | Pelo adulto, com as crianças se revezando; mouse e teclado, nunca toque |
| Leitura | Nenhuma criança lê; a professora lê por elas |

### 2.3 Stakeholders

| Stakeholder | Interesse | Influência |
|---|---|---|
| Criança de 4 e 5 anos | Usuária final; precisa conseguir usar sozinha, sem ler | Alta — define toda a interface |
| Professora | Conduz a atividade; precisa ajustar à turma sem suporte técnico | Alta — define as configurações |
| Coordenação pedagógica | Autoriza o uso e assina a comprovação | Média — viabiliza o projeto |
| Aluno com deficiência | Precisa participar em igualdade de condições | Alta — define os requisitos de acessibilidade |

---

## 3. Requisitos

### 3.1 Requisitos funcionais

| Código | Requisito |
|---|---|
| RF01 | Apresentar sete atividades selecionáveis na tela inicial, identificadas por ícone, cor e áudio |
| RF02 | Reconhecer formas e cores, com a figura pedida apresentada ou apenas enunciada, conforme o nível |
| RF03 | Identificar o animal pelo som reproduzido, entre três ou quatro alternativas |
| RF04 | Colocar na cesta a quantidade de itens solicitada, com confirmação automática ao atingi-la |
| RF05 | Comparar tamanhos entre figuras idênticas, identificando a maior ou a menor |
| RF06 | Identificar, entre figuras iguais, a que difere em forma, cor ou tamanho |
| RF07 | Continuar um padrão visual que se repete |
| RF08 | Encontrar pares de figuras iguais em um tabuleiro de memória |
| RF09 | Sinalizar acerto e erro por canal visual e sonoro, sem impedir nova tentativa |
| RF10 | Contabilizar estrelas por acerto de primeira e exibir o total ao fim da rodada |
| RF11 | Permitir à professora ativar e desativar cada atividade individualmente |
| RF12 | Permitir à professora alternar entre dois níveis de dificuldade |
| RF13 | Permitir à professora ligar e desligar a narração |
| RF14 | Permitir à professora ligar a legenda escrita dos sons |
| RF15 | Gerar folha de atividade para impressão com o conteúdo trabalhado na tela |
| RF16 | Exibir ajuda ilustrada e narrada sobre a atividade em andamento |
| RF17 | Preservar as preferências da professora entre sessões |

### 3.2 Requisitos não funcionais

| Código | Requisito | Verificação |
|---|---|---|
| RNF01 | Operar em qualquer navegador moderno, sem instalação e sem cadastro | Testado em Chromium |
| RNF02 | Funcionar sem conexão após o primeiro carregamento | Sem requisições de rede em uso |
| RNF03 | Não coletar, transmitir ou armazenar qualquer dado das crianças | Nenhum campo de entrada no sistema |
| RNF04 | Operar integralmente por teclado, sem depender do mouse | Teste automatizado das teclas 1–4, setas, espaço e Esc |
| RNF05 | Alvos de clique com no mínimo 120 por 120 pixels | Medido no CSS |
| RNF06 | Elemento em foco sempre marcado por contorno de alto contraste | Inspeção visual e automatizada |
| RNF07 | Nenhuma informação exclusiva de um único canal sensorial | Legenda e pulso visual nos sons |
| RNF08 | Dispensar leitura para navegar e jogar | Nenhum comando depende de texto escrito |
| RNF09 | Layout legível a cinco metros, em projeção 4:3 e 16:9 | Unidades relativas, testado em projeção |
| RNF10 | Prosseguir normalmente em computador sem voz sintetizada instalada | Limite de tempo na narração |
| RNF11 | Tempo de resposta imperceptível ao clique | Sem processamento assíncrono na interação |
| RNF12 | Código-fonte aberto e hospedagem sem custo | Repositório público e GitHub Pages |

### 3.3 Personas

**Helena, 4 anos — Infantil 4.** Não lê e não escreve. Conhece cores e formas básicas, conta até
três com apoio. Usa o mouse com imprecisão e desiste rápido quando algo não responde ao primeiro
clique. Entende instrução falada, desde que curta. *Decorre daí:* alvos grandes, comando falado,
erro sem punição e rodadas curtas.

**Sandra, 38 anos — professora.** Formada em Pedagogia, usa computador no dia a dia, mas não quer
instalar nada nem criar conta. Tem 40 minutos de atividade e uma turma inteira esperando. Precisa
que funcione na primeira tentativa. *Decorre daí:* área da professora em uma tela, sem senha, com
tudo ajustável em três cliques.

### 3.4 Histórias de usuário e critérios de aceitação

| História | Critério de aceitação |
|---|---|
| Como criança, quero escolher a atividade sozinha, para não depender de ler | Cada botão tem ícone, cor e áudio; nenhum texto é necessário para navegar |
| Como criança, quero errar sem perder o que ganhei, para continuar tentando | O erro não zera estrelas, não trava a tela e permite tentativas ilimitadas |
| Como criança surda, quero saber que há um som tocando | O alto-falante pulsa durante a reprodução e a legenda pode ser exibida |
| Como professora, quero mostrar só o que serve à minha turma | Cada uma das sete atividades liga e desliga individualmente |
| Como professora, quero usar com a turma reunida | Operação completa por teclado, com layout legível em projeção |
| Como professora, quero continuar a atividade no papel | Um clique gera folha de uma página, com margens e sem página em branco |

---

## 4. Modelagem

Os quatro diagramas estão na pasta `diagramas/`, em PNG, prontos para inserir no relatório.

| Arquivo | Diagrama | O que mostra |
|---|---|---|
| `01-diagrama-de-contexto.png` | Diagrama de contexto | Fronteira do sistema, atores externos e sistemas de apoio |
| `02-casos-de-uso.png` | Casos de uso (UML) | Dez casos de uso separados por perfil: criança e professora |
| `03-fluxo-de-navegacao.png` | Fluxo do processo | Sequência de telas e o ciclo de pergunta, resposta e retorno |
| `04-cronograma-gantt.png` | Cronograma | As 13 tarefas em barras, por fase, com duração em dias úteis |

A estrutura detalhada das telas e o comportamento de cada atividade estão em
`estrutura-e-cronograma.md`.

---

## 5. Planejamento

### 5.1 Abordagem de gestão

**Kanban**, conforme a sugestão do manual para projetos de curta duração. O projeto tem um único
executor, escopo definido e prazo curto: iterações formais de Scrum acrescentariam cerimônia sem
benefício, e cascata pura não absorveria as mudanças que vieram do levantamento — a troca de
tablet por projetor e a substituição dos sons sintetizados por gravações reais são dois exemplos de
alteração que surgiram durante a execução e foram incorporadas sem replanejamento.

### 5.2 Cronograma

Treze tarefas, 34 dias úteis, de 23 de outubro a 11 de dezembro de 2026, com a aplicação concluída
em dezembro, antes do recesso escolar. A tabela completa está em `estrutura-e-cronograma.md` e a
versão em barras em `diagramas/04-cronograma-gantt.png`. O mínimo exigido é de oito tarefas.

### 5.3 Recursos e custos

| Recurso | Origem | Custo |
|---|---|---|
| Notebook para desenvolvimento | Próprio | R$ 0,00 |
| Hospedagem (GitHub Pages) | Gratuita | R$ 0,00 |
| Domínio | Subdomínio do GitHub | R$ 0,00 |
| Gravações de áudio | Bancos de som livres | R$ 0,00 |
| Projetor e computador na aplicação | Cedidos pela instituição | R$ 0,00 |
| Transporte até a instituição | Próprio | Variável |
| Impressão da declaração | Própria | Baixo |

Custo total para a instituição: zero, sem licença, equipamento ou manutenção. Essa gratuidade não é
um detalhe administrativo — é requisito, porque uma solução com custo recorrente não sobrevive à
troca de gestão de uma escola municipal.

### 5.4 Riscos

| Risco | Prob. | Impacto | Resposta |
|---|---|---|---|
| A instituição não responder ao contato | Alta | Alto | Abordar duas instituições em paralelo; ligar por telefone dois dias após o e-mail |
| Não haver computador disponível na instituição | Média | Alto | Levar notebook próprio; a aplicação independe do equipamento da escola |
| Recesso escolar antecipado | Média | Alto | Agendar a data já no primeiro contato, antes de concluir o desenvolvimento |
| Declaração não assinada no dia | Média | Alto | Levar o texto pronto e impresso; usar a alternativa II (registro fotográfico) como comprovação principal |
| Computador sem voz em português instalada | Média | Médio | Narração com limite de tempo; a atividade segue sem depender dela |
| Projetor com proporção diferente da prevista | Baixa | Médio | Layout em unidades relativas, testado em 4:3 e 16:9 |
| Perda de arquivos do projeto | Baixa | Alto | Repositório no GitHub desde a primeira tarefa |

### 5.5 Qualidade

Critérios de aceitação verificados por testes automatizados de navegador, executados sobre a
aplicação real:

- As sete atividades completam uma rodada inteira nos dois níveis, sem erro de console.
- Cada questão apresenta exatamente uma alternativa correta.
- O número de alternativas muda conforme o nível, e no nível completo metade das questões de formas
  é apresentada sem a figura de apoio.
- A resposta por teclado produz o mesmo efeito que a resposta por clique.
- As doze gravações de áudio carregam e têm, no máximo, três segundos.
- A legenda exibida corresponde ao animal da resposta correta e não vaza para as outras atividades.
- Os comandos gerados respeitam a concordância do português: 80 comandos distintos foram gerados
  nos dois níveis e validados contra as regras de gênero.
- A folha de atividade cabe em uma única página, com margens, e nunca repete uma figura na mesma
  linha do exercício de ligar.

---

## 6. ODS trabalhados

A Atividade Extensionista II é de entrega única e com projeto próprio, definido nesta etapa: os
ODS declarados na AE I não se transferem, porque o projeto é outro. O roteiro exige foco em
**pelo menos um** dos 17 ODS, e este projeto declara dois, ambos sustentados por metas
específicas — declarar dois bem amarrados é mais seguro que declarar vários sem aderência,
já que o critério avalia se o tema se enquadra no ODS selecionado.

### ODS 4 — Educação de qualidade *(principal)*

| Meta | Como o projeto se relaciona |
|---|---|
| 4.2 — Assegurar desenvolvimento de qualidade na primeira infância e acesso à pré-escola | Toda a ferramenta é construída para as competências da educação infantil previstas na BNCC, sem antecipar alfabetização |
| 4.5 — Eliminar disparidades no acesso à educação, inclusive para pessoas com deficiência | Operação integral por teclado, legenda nos sons e sinalização visual para alunos surdos |
| 4.a — Instalações educacionais sensíveis à deficiência, com ambientes de aprendizagem seguros e eficazes | Interface desenhada pelos sete princípios do Desenho Universal, sem exigir equipamento novo da escola |

### ODS 10 — Redução das desigualdades *(secundário)*

| Meta | Como o projeto se relaciona |
|---|---|
| 10.2 — Promover a inclusão de todos, independentemente de deficiência ou condição econômica | A ferramenta é gratuita, roda em equipamento antigo e funciona sem internet, atendendo uma instituição pública de bairro periférico que não tem recurso para software licenciado |

---

## 7. Desenho Universal

O roteiro lista os sete princípios e exige que sejam considerados. Abaixo, cada princípio e a
decisão concreta de implementação que o atende — é essa ligação, e não a citação dos princípios,
que demonstra aplicação.

| Princípio | Decisão de implementação |
|---|---|
| 1. Igualitário | Nenhuma atividade exige leitura; a mesma tela serve a quem lê e a quem não lê |
| 2. Adaptável | Sete atividades ligáveis individualmente, dois níveis, narração e legenda opcionais |
| 3. Intuitivo | Ícone, cor e áudio identificam cada atividade; a ajuda é ilustrada, não escrita |
| 4. Informação de fácil percepção | Toda informação em três canais: imagem, cor e som; o som tem equivalente visual |
| 5. Tolerância ao erro | O erro não pune, não trava e não limita tentativas; o som de erro é neutro, nunca de reprovação |
| 6. Baixo esforço físico | Alvos de 120 pixels, clique simples em vez de arrastar, operação completa por teclado |
| 7. Dimensão e espaço para aproximação e uso | Unidades relativas e alto contraste, legível tanto no monitor quanto projetado a cinco metros |

---

## 8. As quatro premissas da disciplina

| Premissa | Como é atendida |
|---|---|
| Viés de inclusão digital com uso de TI | Crianças de uma instituição pública sem laboratório têm contato individual com o computador, revezando-se no equipamento |
| Aplicação em algum setor da sociedade | Escola pública de educação infantil, em bairro periférico de Araucária/PR |
| Relevância do tema dentro do curso | Levantamento de requisitos, modelagem, desenvolvimento front-end, testes de acessibilidade e versionamento — o ciclo completo tratado no CST |
| Foco em pelo menos um dos 17 ODS | ODS 4, com o ODS 10 como secundário |

---

## 9. O que ainda falta

| Item | Situação |
|---|---|
| Aplicação desenvolvida e testada | Concluída |
| Documentação e diagramas | Concluída |
| Cronograma com 13 tarefas | Concluído |
| Contato com a instituição | Pendente — e-mails prontos em `primeiro-contato-cmei.md` e `primeiro-contato-escola.md` |
| Repositório público no GitHub | Pendente |
| Vídeo de até 5 minutos, com apresentação pessoal | Pendente |
| Registro fotográfico da aplicação (alternativa II) | Pendente |
| Declaração assinada e carimbada (alternativa IV) | Pendente — modelo em `modelo-declaracao.md` |
| Relatório no template institucional, em PDF, até 10 páginas | Pendente |
