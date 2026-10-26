/* animais.js - identificacao de animais pelo som
   Usa as gravacoes da pasta sons/, normalizadas no mesmo volume e com
   no maximo 3 segundos. A pasta sons/ precisa acompanhar o projeto.

   Acessibilidade: o alto-falante pulsa enquanto o som toca, para que se veja
   que ha som mesmo sem ouvi-lo, e o campo "legenda" traz a transcricao do som,
   exibida quando a professora liga a legenda na area dela. */

var ANIMAIS = [
  { nome:"cachorro", legenda:"au au au", rotulo:"cachorro", figura:"🐶", arquivo:"sons/cachorro.wav" },
  { nome:"gato", legenda:"miau",     rotulo:"gato",     figura:"🐱", arquivo:"sons/gato.wav"     },
  { nome:"vaca", legenda:"muuu",     rotulo:"vaca",     figura:"🐮", arquivo:"sons/vaca.wav"     },
  { nome:"galo", legenda:"có có ró có",     rotulo:"galo",     figura:"🐔", arquivo:"sons/galo.wav"     },
  { nome:"cavalo", legenda:"iiiih",   rotulo:"cavalo",   figura:"🐴", arquivo:"sons/cavalo.wav"   },
  { nome:"abelha", legenda:"zzzzzz",   rotulo:"abelha",   figura:"🐝", arquivo:"sons/abelha.wav"   },
  { nome:"passaro", legenda:"piu piu piu",  rotulo:"pássaro",  figura:"🐦", arquivo:"sons/passaro.wav"  },
  { nome:"pato", legenda:"quá quá quá",     rotulo:"pato",     figura:"🦆", arquivo:"sons/pato.mp3"     },
  { nome:"ovelha", legenda:"bééé",   rotulo:"ovelha",   figura:"🐑", arquivo:"sons/ovelha.mp3"   },
  { nome:"porco", legenda:"óinc óinc",    rotulo:"porco",    figura:"🐷", arquivo:"sons/porco.mp3"    },
  { nome:"macaco", legenda:"uh uh ah ah",   rotulo:"macaco",   figura:"🐵", arquivo:"sons/macaco.mp3"   },
  { nome:"sapo", legenda:"croac croac",     rotulo:"sapo",     figura:"🐸", arquivo:"sons/sapo.mp3"     }
];

var gravacoes = {};
var tocandoAgora = null;

function prepararSons(){
  for(var i=0;i<ANIMAIS.length;i++){
    var som = new Audio(ANIMAIS[i].arquivo);
    som.preload = "auto";
    gravacoes[ANIMAIS[i].nome] = som;
  }
}

function pulsar(ligado){
  var alvo = elemento("comando-visual");
  if(alvo) alvo.classList.toggle("tocando", ligado);
}

function tocarAnimal(nome){
  if(!Config.audio) return;
  pararAnimal();
  var som = gravacoes[nome];
  if(!som) return;
  try{ som.currentTime = 0; }catch(e){ /* ainda carregando */ }

  pulsar(true);
  som.onended = function(){ pulsar(false); };

  var promessa = som.play();
  if(promessa && promessa.catch) promessa.catch(function(){ pulsar(false); });
  tocandoAgora = som;
}

function pararAnimal(){
  pulsar(false);
  if(!tocandoAgora) return;
  tocandoAgora.pause();
  try{ tocandoAgora.currentTime = 0; }catch(e){}
  tocandoAgora = null;
}

var Animais = {

  area: "opcoes",
  ajuda: "Escute o som e clique no animal que faz esse som. Para ouvir de novo, clique no alto-falante. Você também pode apertar as teclas 1, 2, 3 ou 4.",

  gerarQuestoes: function(){
    var quantas = (Config.progressao === "completa") ? 4 : 3;
    var sorteados = embaralhar(ANIMAIS);
    var questoes = [];

    for(var n=0; n<QUESTOES_POR_RODADA; n++){
      var certo = sorteados[n % sorteados.length];
      var outros = [];
      var disponiveis = embaralhar(ANIMAIS);
      for(var i=0; i<disponiveis.length && outros.length < quantas-1; i++){
        if(disponiveis[i].nome !== certo.nome) outros.push(disponiveis[i]);
      }

      var grupo = embaralhar([certo].concat(outros));
      var opcoes = [];
      for(var j=0;j<grupo.length;j++){
        opcoes.push({ html: grupo[j].figura, certa: (grupo[j].nome === certo.nome) });
      }

      questoes.push({
        comandoTexto:    "Quem faz esse som?",
        comandoVisual:   "🔊",
        fala:            "Quem faz esse som?",
        vozSoNaPrimeira: true,
        legenda:         certo.legenda,
        aoAbrir:         (function(a){ return function(){ tocarAnimal(a.nome); }; })(certo),
        repetir:         (function(a){ return function(){ tocarAnimal(a.nome); }; })(certo),
        opcoes:          opcoes
      });
    }
    return questoes;
  }
};
