# Seções iniciais do Trabalho Final

A Atividade Extensionista II é de entrega única: não há etapa de Validação da Proposta, apenas o
Trabalho Final. O conteúdo abaixo corresponde às seções de abertura do relatório e deve ser
transferido para o template institucional `Atividade_Extensionista_II_Evidencias.docx`.

## Identificação

**Curso:** Análise e Desenvolvimento de Sistemas (CST)

**Disciplina:** Atividade Extensionista II: Tecnologia Aplicada à Inclusão Digital — Projeto

**Etapa:** Trabalho Final

**Aluno:** Wanderson Bayer — RU 5334127

## Título do projeto

Brincando e Aprendendo: aplicação web gratuita de atividades lúdicas para turmas de educação infantil do CMEI Educadora Andréia da Silva Alves, em Araucária/PR

## Setor de aplicação

Centro Municipal de Educação Infantil Educadora Andréia da Silva Alves, conhecido como CMEI Califórnia, localizado na Rua Saracura, 1314, bairro Capela Velha, Araucária, Paraná. Instituição pública municipal de educação infantil, com atendimento presencial e diurno a turmas de creche e pré-escola. O projeto atende especificamente as turmas Infantil 4 e Infantil 5, formadas por crianças de 4 e 5 anos.

## Objetivos de Desenvolvimento Sustentável

**ODS 4 — Educação de qualidade** (principal) e **ODS 10 — Redução das desigualdades** (secundário).

O ODS 4 é atendido em três frentes: a meta 4.2, de assegurar desenvolvimento de qualidade na primeira infância e acesso à pré-escola, orienta todo o conteúdo das atividades, construído sobre as competências que a Base Nacional Comum Curricular prevê para a educação infantil; a meta 4.5, de eliminar disparidades no acesso à educação, inclusive para pessoas com deficiência, sustenta a operação integral por teclado e os recursos para alunos com deficiência auditiva; e a meta 4.a, de instalações educacionais sensíveis à deficiência, orienta a interface, desenhada segundo os sete princípios do Desenho Universal.

O ODS 10 é atendido pela meta 10.2, de promover a inclusão de todos independentemente de deficiência ou condição econômica: a ferramenta é gratuita, funciona em equipamento antigo e opera sem internet, atendendo uma instituição pública de bairro periférico que não dispõe de recurso para software licenciado.

## Justificativa

A educação infantil pública enfrenta uma limitação prática conhecida: os recursos digitais existentes no mercado para essa faixa etária são, em sua maioria, aplicativos pagos, exigem download em tablets ou celulares que a escola não possui e assumem uma estrutura tecnológica incompatível com a realidade de um CMEI municipal, que normalmente não tem laboratório de informática nem equipamento individual para as crianças. O resultado é que a inclusão digital, nessa etapa, costuma simplesmente não acontecer — não por falta de interesse das professoras, mas por falta de uma ferramenta que funcione com o que a escola de fato tem: um computador, um projetor e, quando há, uma conexão instável.

Soma-se a isso uma segunda limitação, de natureza pedagógica. Grande parte do material digital disponível para crianças pequenas é, na verdade, material de alfabetização adaptado, que pede leitura, escrita ou cálculo. A Base Nacional Comum Curricular não prevê alfabetização formal na educação infantil: o trabalho nessa etapa se dá por reconhecimento, nomeação, correspondência e exploração, enquanto letras, sílabas e operações pertencem aos anos iniciais do Ensino Fundamental. Uma ferramenta que ignore essa distinção não é utilizável pela professora, por mais bem construída que seja tecnicamente.

Existe, portanto, uma lacuna concreta: não há recurso digital gratuito, sem instalação, operável por mouse e teclado em computador comum e desenhado especificamente para o que as turmas de 4 e 5 anos efetivamente trabalham. É essa lacuna que o projeto se propõe a preencher. A solução é uma aplicação web construída em HTML, CSS e JavaScript puros, publicada gratuitamente no GitHub Pages, que funciona em qualquer navegador, dispensa login, banco de dados e instalação, continua operando sem internet após o primeiro carregamento, não coleta nenhum dado das crianças e não gera nenhum custo à instituição — nem de licença, nem de equipamento, nem de manutenção.

A relevância do tema para o curso é direta. O projeto exige levantamento de requisitos junto a usuárias reais, modelagem e diagramação, desenvolvimento front-end, aplicação dos princípios do Desenho Universal em decisões concretas de interface, testes de acessibilidade e de uso com um público não alfabetizado e versionamento em repositório público — ou seja, o ciclo completo de desenvolvimento de software tratado ao longo do CST em Análise e Desenvolvimento de Sistemas, aplicado a um problema que existe fora da sala de aula.

O acesso à instituição está viabilizado por contato direto com uma professora das turmas de educação infantil do CMEI, o que permite tanto o levantamento das necessidades reais quanto a entrega efetiva da ferramenta e a comprovação da aplicação junto à comunidade local.

## Objetivo geral

Desenvolver e disponibilizar uma aplicação web gratuita, em HTML, CSS e JavaScript, com atividades lúdicas adequadas à Base Nacional Comum Curricular para a educação infantil, a ser utilizada pelas turmas Infantil 4 e Infantil 5 do CMEI Educadora Andréia da Silva Alves, em Araucária/PR.

## Objetivos específicos

- Levantar, junto às professoras e à coordenação do CMEI, as necessidades pedagógicas das turmas e a infraestrutura tecnológica efetivamente disponível na instituição.
- Especificar os requisitos funcionais e não funcionais da aplicação, considerando as competências previstas na BNCC para a educação infantil e os sete princípios do Desenho Universal.
- Modelar a solução por meio de diagrama de contexto, fluxograma de navegação e diagrama de casos de uso.
- Implementar, em HTML, CSS e JavaScript puros, sete atividades — formas e cores, animais e sons, quantidades, comparação de tamanhos, identificação do elemento diferente, continuação de padrões e jogo da memória —, todas operáveis integralmente por mouse ou por teclado.
- Implementar recursos de acessibilidade para alunos com deficiência auditiva, com sinalização visual durante a reprodução dos sons e legenda escrita opcional.
- Implementar uma área de configuração para a professora, com seleção das atividades ativas, ajuste de narração e legendas, escolha do nível conforme a turma e geração de folha de atividade para impressão.
- Publicar a aplicação no GitHub Pages, com código-fonte versionado em repositório público e acesso gratuito por navegador, sem instalação.
- Validar a acessibilidade e a usabilidade por meio de testes com mouse, somente com teclado e em projeção, corrigindo contraste, dimensionamento dos alvos e visibilidade do foco.
- Apresentar a solução à equipe pedagógica do CMEI e disponibilizá-la para uso com as turmas de Infantil 4 e Infantil 5.
- Comprovar a aplicação do projeto na comunidade local por meio de registro fotográfico da apresentação e de declaração institucional assinada e carimbada.
