/* memoria.js - jogo da memoria com pares de figuras
   Cada par encontrado vale uma estrela; errar nao tira ponto nem trava.
   A rodada tem tres tabuleiros em vez das oito perguntas dos outros modulos. */

var FIGURAS_MEMORIA = ["🐶","🐱","🐮","🦆","🐸","🐝","🍎","🌻","⚽","🐟","🐵","🐑"];

var Memoria = {

  area: "memoria",
  ajuda: "Clique em duas cartas para virar. Se as figuras forem iguais, as cartas ficam abertas. Se forem diferentes, elas viram de novo e você tenta outra vez.",

  primeira: null,
  travado: false,
  achados: 0,
  pares: 0,

  gerarQuestoes: function(){
    var pares = (Config.progressao === "completa") ? 6 : 4;
    var questoes = [];
    for(var n=0;n<3;n++) questoes.push({
      pares: pares,
      comandoTexto: "Ache as figuras iguais",
      comandoVisual: "",
      vozSoNaPrimeira: true,
      fala: "Ache as figuras iguais"
    });
    return questoes;
  },

  montar: function(questao){
    Memoria.primeira = null;
    Memoria.travado = false;
    Memoria.achados = 0;
    Memoria.pares = questao.pares;

    var escolhidas = sortearVarios(FIGURAS_MEMORIA, questao.pares);
    var cartas = embaralhar(escolhidas.concat(escolhidas));

    var grade = elemento("grade-memoria");
    grade.innerHTML = "";
    grade.style.gridTemplateColumns = "repeat(" + (questao.pares > 4 ? 4 : 4) + ", auto)";

    for(var i=0;i<cartas.length;i++){
      var carta = document.createElement("button");
      carta.className = "carta";
      carta.type = "button";
      carta.dataset.figura = cartas[i];
      carta.innerHTML = '<span class="carta-verso">?</span><span class="carta-frente">' + cartas[i] + '</span>';
      carta.addEventListener("click", function(){ Memoria.virar(this); });
      grade.appendChild(carta);
    }
  },

  virar: function(carta){
    if(Memoria.travado) return;
    if(carta.classList.contains("virada") || carta.classList.contains("achada")) return;

    carta.classList.add("virada");
    somVirar();

    if(!Memoria.primeira){
      Memoria.primeira = carta;
      return;
    }

    var primeira = Memoria.primeira;
    Memoria.primeira = null;

    if(primeira.dataset.figura === carta.dataset.figura){
      primeira.classList.add("achada");
      carta.classList.add("achada");
      Memoria.achados++;
      Estado.estrelas++;
      atualizarPlacar();
      somEstrela();

      if(Memoria.achados === Memoria.pares){
        Memoria.travado = true;
        setTimeout(function(){ App.concluir(false); }, 700);
      }
    } else {
      Memoria.travado = true;
      somErro();
      setTimeout(function(){
        primeira.classList.remove("virada");
        carta.classList.remove("virada");
        Memoria.travado = false;
      }, 1100);
    }
  },

  teclado: function(){ /* o jogo da memoria e operado por clique */ }
};
