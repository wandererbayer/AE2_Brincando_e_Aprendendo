/* app.js - navegacao entre telas, rodadas e controles da professora */

var Modulos = {
  formas: Formas,
  animais: Animais,
  quantidades: Quantidades,
  tamanhos: Tamanhos,
  diferente: Diferente,
  sequencia: Sequencia,
  memoria: Memoria
};

var App = {};

/* ---------- TELAS ---------- */

function mostrarTela(id){
  var telas = document.querySelectorAll(".tela");
  for(var i=0;i<telas.length;i++) telas[i].classList.remove("ativa");
  elemento(id).classList.add("ativa");
}

function irParaInicio(){
  calarVoz();
  pararAnimal();
  Estado.modulo = null;
  aplicarModulosVisiveis();
  mostrarTela("tela-inicio");
  var primeiro = document.querySelector("#menu-modulos .cartao:not(.oculto)");
  if(primeiro) primeiro.focus();
}

/* ---------- RODADA ---------- */

function abrirModulo(nome){
  contexto();                        /* libera o audio no primeiro clique */
  pararAnimal();
  Estado.modulo = nome;
  Estado.questoes = Modulos[nome].gerarQuestoes();
  Estado.indice = 0;
  Estado.estrelas = 0;
  atualizarPlacar();

  var area = Modulos[nome].area;
  elemento("area-opcoes").classList.toggle("oculto",   area !== "opcoes");
  elemento("area-contagem").classList.toggle("oculto", area !== "contagem");
  elemento("area-memoria").classList.toggle("oculto",  area !== "memoria");

  mostrarTela("tela-jogo");
  mostrarQuestao();
}

function mostrarQuestao(){
  var questao = Estado.questoes[Estado.indice];
  var modulo = Modulos[Estado.modulo];
  Estado.errouNaQuestao = false;
  Estado.bloqueado = false;
  Estado.resolvida = false;

  elemento("comando-texto").textContent = questao.comandoTexto;

  /* Legenda do som, para alunos com deficiencia auditiva. */
  var legenda = elemento("legenda-som");
  var mostrarLegenda = Config.legendas && questao.legenda;
  legenda.textContent = mostrarLegenda ? questao.legenda : "";
  legenda.classList.toggle("oculto", !mostrarLegenda);
  elemento("comando-visual").innerHTML = questao.comandoVisual || "";

  var visual = elemento("comando-visual");
  visual.onclick = questao.repetir ? questao.repetir : null;
  visual.style.cursor = questao.repetir ? "pointer" : "default";

  if(modulo.montar) modulo.montar(questao);
  else montarOpcoes(questao);

  /* Comandos que nunca mudam sao falados apenas na primeira pergunta
     da rodada: repetir a mesma frase oito vezes cansa a turma. */
  var devoFalar = !questao.vozSoNaPrimeira || Estado.indice === 0;

  if(questao.aoAbrir){
    if(devoFalar) falar(questao.fala, questao.aoAbrir);
    else setTimeout(questao.aoAbrir, 200);
  } else if(devoFalar){
    falar(questao.fala);
  }
}

function montarOpcoes(questao){
  var area = elemento("area-opcoes");
  area.innerHTML = "";

  for(var i=0;i<questao.opcoes.length;i++){
    var opcao = questao.opcoes[i];
    var botao = document.createElement("button");
    botao.className = "opcao";
    botao.type = "button";
    botao.innerHTML = '<span class="numero">' + (i+1) + '</span>' + opcao.html;
    botao.dataset.certa = opcao.certa ? "1" : "0";
    botao.addEventListener("click", function(){ responder(this); });
    area.appendChild(botao);
  }
}

function responder(botao){
  if(Estado.bloqueado) return;
  if(botao.dataset.certa === "1"){
    Estado.bloqueado = true;
    botao.classList.add("certa");
    App.concluir(!Estado.errouNaQuestao);
  } else {
    Estado.errouNaQuestao = true;
    botao.classList.add("errada");
    somErro();
  }
}

/* Fim de uma pergunta. O retorno de acerto e um som, nunca uma frase:
   ouvir "muito bem" a cada acerto fica repetitivo em poucos minutos. */
App.concluir = function(ganhouEstrela){
  if(Estado.resolvida) return;
  Estado.resolvida = true;
  Estado.bloqueado = true;
  somAcerto();
  if(ganhouEstrela){
    Estado.estrelas++;
    atualizarPlacar();
  }
  setTimeout(proximaQuestao, 1500);
};

function proximaQuestao(){
  Estado.indice++;
  if(Estado.indice >= Estado.questoes.length) terminarRodada();
  else mostrarQuestao();
}

function terminarRodada(){
  var texto = "";
  for(var i=0;i<Estado.estrelas;i++) texto += "⭐";
  elemento("estrelas-fim").textContent = texto || "⭐";
  mostrarTela("tela-fim");
  somAcerto();
  falar("Parabéns! Você ganhou " + Estado.estrelas + (Estado.estrelas === 1 ? " estrela" : " estrelas"));
  elemento("btn-denovo").focus();
}

/* ---------- AJUDA ---------- */

function abrirAjuda(){
  if(!Estado.modulo) return;
  elemento("ajuda-texto").textContent = Modulos[Estado.modulo].ajuda;
  elemento("ajuda").classList.remove("oculto");
  falar(Modulos[Estado.modulo].ajuda);
}

function fecharAjuda(){
  elemento("ajuda").classList.add("oculto");
  calarVoz();
}

/* ---------- CONFIGURACOES ---------- */

var NOMES_MODULOS = ["formas","animais","quantidades","tamanhos","diferente","sequencia","memoria"];

function lerConfig(){
  try{
    var salvo = localStorage.getItem("brincando-config");
    if(!salvo) return;
    var lido = JSON.parse(salvo);
    if(typeof lido.audio === "boolean") Config.audio = lido.audio;
    if(typeof lido.legendas === "boolean") Config.legendas = lido.legendas;
    if(lido.progressao) Config.progressao = lido.progressao;
    if(lido.modulos){
      for(var i=0;i<NOMES_MODULOS.length;i++){
        var nome = NOMES_MODULOS[i];
        if(typeof lido.modulos[nome] === "boolean") Config.modulos[nome] = lido.modulos[nome];
      }
    }
  }catch(e){ /* navegador sem armazenamento: segue com o padrao */ }
}

function salvarConfig(){
  try{ localStorage.setItem("brincando-config", JSON.stringify(Config)); }
  catch(e){ /* sem armazenamento: a configuracao vale ate fechar o navegador */ }
}

function aplicarConfigNaTela(){
  elemento("cfg-audio").checked = Config.audio;
  elemento("cfg-legendas").checked = Config.legendas;
  for(var i=0;i<NOMES_MODULOS.length;i++){
    elemento("cfg-" + NOMES_MODULOS[i]).checked = Config.modulos[NOMES_MODULOS[i]];
  }
  var radios = document.getElementsByName("progressao");
  for(var r=0;r<radios.length;r++) radios[r].checked = (radios[r].value === Config.progressao);
}

function aplicarModulosVisiveis(){
  var cartoes = document.querySelectorAll("#menu-modulos .cartao");
  for(var i=0;i<cartoes.length;i++){
    cartoes[i].classList.toggle("oculto", !Config.modulos[cartoes[i].dataset.modulo]);
  }
}

/* ---------- FOLHA PARA IMPRIMIR ---------- */

function contorno(forma, tamanho){
  /* Figura vazada, para a crianca pintar ou copiar. */
  return '<span class="' + (tamanho || "folha-figura") + '">' +
         svgForma(forma, "#ffffff").replace("<svg", '<svg stroke="#000" stroke-width="5"') +
         '</span>';
}

function gerarFolha(){
  var folha = elemento("folha-impressao");
  if(!folha){
    folha = document.createElement("div");
    folha.id = "folha-impressao";
    document.body.appendChild(folha);
  }

  var formas = Object.keys(FORMAS);
  var html = '<h1 class="folha-titulo">Brincando e Aprendendo</h1>';
  html += '<p class="folha-ident">Nome: ____________________________________  Turma: ____________</p>';
  var i, n;

  if(Config.modulos.formas || Config.modulos.tamanhos){
    html += '<div class="folha-secao"><h2>1. Pinte as figuras</h2><div class="folha-figuras">';
    for(i=0;i<formas.length;i++) html += contorno(formas[i]);
    html += '</div></div>';
  }

  if(Config.modulos.quantidades){
    /* Cada linha diz quanto e de que figura: so o numero nao basta,
       porque a crianca dessa idade ainda nao le o enunciado. */
    var maximo = (Config.progressao === "completa") ? 5 : 3;
    var modelos = embaralhar(formas);
    html += '<div class="folha-secao"><h2>2. Desenhe na caixa a quantidade pedida</h2>';
    for(n=1;n<=maximo;n++){
      html += '<div class="folha-linha">' +
                '<span class="folha-numero">' + n + '</span>' +
                contorno(modelos[(n-1) % modelos.length], "folha-modelo") +
                '<span class="folha-caixa"></span>' +
              '</div>';
    }
    html += '</div>';
  }

  if(Config.modulos.memoria || Config.modulos.diferente || Config.modulos.animais){
    /* Figuras em vez de animais: emoji sai como borrao em impressora
       preto e branco, e ligar ao nome exigiria saber ler. */
    var esquerda = sortearVarios(formas, 4);

    /* Embaralha ate nenhuma figura cair na mesma linha dos dois lados:
       senao o exercicio se resolve ligando reto. */
    var direita = embaralhar(esquerda), tentativas = 0;
    while(tentativas < 50 && direita.some(function(f, k){ return f === esquerda[k]; })){
      direita = embaralhar(esquerda);
      tentativas++;
    }
    html += '<div class="folha-secao"><h2>3. Ligue as figuras iguais</h2><div class="folha-ligar">';
    html += '<div class="folha-coluna">';
    for(i=0;i<esquerda.length;i++){
      html += '<div class="folha-par">' + contorno(esquerda[i]) + '<span class="folha-ponto">&bull;</span></div>';
    }
    html += '</div><div class="folha-coluna direita">';
    for(i=0;i<direita.length;i++){
      html += '<div class="folha-par">' + contorno(direita[i]) + '<span class="folha-ponto">&bull;</span></div>';
    }
    html += '</div></div></div>';
  }

  folha.innerHTML = html;
  window.print();
}

/* ---------- TECLADO ---------- */

function moverFocoMenu(passo){
  var cartoes = [];
  var todos = document.querySelectorAll("#menu-modulos .cartao");
  for(var i=0;i<todos.length;i++) if(!todos[i].classList.contains("oculto")) cartoes.push(todos[i]);
  if(!cartoes.length) return;

  var atual = cartoes.indexOf(document.activeElement);
  var proximo = (atual < 0) ? 0 : (atual + passo + cartoes.length) % cartoes.length;
  cartoes[proximo].focus();
}

document.addEventListener("keydown", function(evento){

  if(!elemento("ajuda").classList.contains("oculto")){
    if(evento.key === "Escape" || evento.key === "Enter" || evento.key === " ") fecharAjuda();
    return;
  }

  if(elemento("tela-inicio").classList.contains("ativa")){
    if(evento.key === "ArrowRight" || evento.key === "ArrowDown"){ evento.preventDefault(); moverFocoMenu(1); }
    if(evento.key === "ArrowLeft"  || evento.key === "ArrowUp"){   evento.preventDefault(); moverFocoMenu(-1); }
    return;
  }

  if(elemento("tela-jogo").classList.contains("ativa")){
    if(evento.key === "Escape"){ irParaInicio(); return; }
    if(evento.key === "?" || evento.key === "h"){ abrirAjuda(); return; }

    var modulo = Modulos[Estado.modulo];
    if(modulo.teclado){ modulo.teclado(evento); return; }

    if(evento.key >= "1" && evento.key <= "4"){
      var opcoes = document.querySelectorAll("#area-opcoes .opcao");
      var indice = parseInt(evento.key, 10) - 1;
      if(opcoes[indice]) responder(opcoes[indice]);
    }
  }
});

/* ---------- INICIALIZACAO ---------- */

document.addEventListener("DOMContentLoaded", function(){

  lerConfig();
  prepararSons();
  aplicarConfigNaTela();
  aplicarModulosVisiveis();

  var cartoes = document.querySelectorAll("#menu-modulos .cartao");
  for(var i=0;i<cartoes.length;i++){
    cartoes[i].addEventListener("click", function(){ abrirModulo(this.dataset.modulo); });
    cartoes[i].addEventListener("focus", function(){ falar(this.dataset.fala); });
  }

  elemento("btn-voltar").addEventListener("click", irParaInicio);
  elemento("btn-inicio").addEventListener("click", irParaInicio);
  elemento("btn-denovo").addEventListener("click", function(){ abrirModulo(Estado.modulo); });
  elemento("btn-ajuda").addEventListener("click", abrirAjuda);
  elemento("ajuda").addEventListener("click", fecharAjuda);

  elemento("btn-professora").addEventListener("click", function(){ mostrarTela("tela-professora"); });
  elemento("btn-fechar-professora").addEventListener("click", irParaInicio);
  elemento("btn-imprimir").addEventListener("click", gerarFolha);

  elemento("cfg-audio").addEventListener("change", function(){ Config.audio = this.checked; salvarConfig(); });
  elemento("cfg-legendas").addEventListener("change", function(){ Config.legendas = this.checked; salvarConfig(); });
  for(var m=0;m<NOMES_MODULOS.length;m++){
    (function(nome){
      elemento("cfg-" + nome).addEventListener("change", function(){
        Config.modulos[nome] = this.checked;
        salvarConfig();
      });
    })(NOMES_MODULOS[m]);
  }

  var radios = document.getElementsByName("progressao");
  for(var r=0;r<radios.length;r++){
    radios[r].addEventListener("change", function(){ Config.progressao = this.value; salvarConfig(); });
  }
});
