/* quantidades.js - correspondencia entre numero e quantidade
   Cada item colocado toca um estalo com altura crescente, em vez de a voz
   contar em voz alta: a contagem falada a cada clique soa artificial. */

var ITENS = [
  { singular:"maçã",    plural:"maçãs",    figura:"🍎" },
  { singular:"banana",  plural:"bananas",  figura:"🍌" },
  { singular:"bola",    plural:"bolas",    figura:"⚽" },
  { singular:"flor",    plural:"flores",   figura:"🌻" },
  { singular:"peixe",   plural:"peixes",   figura:"🐟" },
  { singular:"estrela", plural:"estrelas", figura:"⭐" }
];

var Quantidades = {

  area: "contagem",
  ajuda: "Clique nos itens para colocar na cesta a quantidade que foi pedida. Você também pode apertar a barra de espaço para colocar um item e Backspace para tirar.",

  colocados: 0,
  alvo: 0,

  gerarQuestoes: function(){
    var maximo = (Config.progressao === "completa") ? 5 : 3;
    var questoes = [];

    for(var n=0; n<QUESTOES_POR_RODADA; n++){
      var alvo = 1 + Math.floor(Math.random()*maximo);
      var item = sortear(ITENS);
      var nome = (alvo === 1) ? item.singular : item.plural;

      questoes.push({
        alvo: alvo,
        item: item,
        comandoTexto:  "Coloque " + alvo + " " + nome + " na cesta",
        comandoVisual: "",
        fala:          "Coloque " + alvo + " " + nome + " na cesta"
      });
    }
    return questoes;
  },

  montar: function(questao){
    Quantidades.colocados = 0;
    Quantidades.alvo = questao.alvo;

    var disponiveis = elemento("itens-disponiveis");
    elemento("cesta-itens").innerHTML = "";
    disponiveis.innerHTML = "";

    /* Sempre mais itens do que o pedido, para a crianca precisar contar. */
    var total = Math.min(6, questao.alvo + 2);
    for(var i=0;i<total;i++){
      var botao = document.createElement("button");
      botao.className = "item";
      botao.type = "button";
      botao.textContent = questao.item.figura;
      botao.setAttribute("aria-label", questao.item.singular);
      botao.addEventListener("click", function(){ Quantidades.colocar(this); });
      disponiveis.appendChild(botao);
    }
  },

  colocar: function(botao){
    if(Estado.bloqueado || botao.classList.contains("usado")) return;

    botao.classList.add("usado");
    Quantidades.colocados++;
    somItem(Quantidades.colocados);

    var copia = document.createElement("span");
    copia.textContent = botao.textContent;
    elemento("cesta-itens").appendChild(copia);

    if(Quantidades.colocados === Quantidades.alvo){
      Estado.bloqueado = true;
      setTimeout(function(){ App.concluir(!Estado.errouNaQuestao); }, 420);
    }
  },

  teclado: function(evento){
    if(evento.key === " " || evento.code === "Space"){
      evento.preventDefault();
      var livres = document.querySelectorAll("#itens-disponiveis .item:not(.usado)");
      if(livres.length) Quantidades.colocar(livres[0]);
    }
    if(evento.key === "Backspace"){
      evento.preventDefault();
      if(Estado.bloqueado) return;
      var usados = document.querySelectorAll("#itens-disponiveis .item.usado");
      var cesta = elemento("cesta-itens");
      if(usados.length){
        usados[usados.length-1].classList.remove("usado");
        if(cesta.lastChild) cesta.removeChild(cesta.lastChild);
        Quantidades.colocados--;
      }
    }
  }
};
