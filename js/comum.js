/* comum.js - estado, voz, sons e utilitarios compartilhados */

var Config = {
  audio: true,
  legendas: false,               /* legenda escrita nos sons, para alunos surdos */
  progressao: "simples",          /* "simples" (Infantil 4) ou "completa" (Infantil 5) */
  modulos: { formas:true, animais:true, quantidades:true, tamanhos:true, diferente:true, sequencia:true, memoria:true }
};

var Estado = {
  modulo: null,
  questoes: [],
  indice: 0,
  estrelas: 0,
  errouNaQuestao: false,
  bloqueado: false,
  resolvida: false
};

var QUESTOES_POR_RODADA = 8;

/* ---------- VOZ ----------
   A voz do navegador le apenas o comando da atividade ("Ache o circulo").
   Acerto, erro e contagem sao sons, nunca narracao: narracao repetida cansa. */

var vozPtBr = null;

function carregarVoz(){
  if(!("speechSynthesis" in window)) return;
  var vozes = window.speechSynthesis.getVoices();
  for(var i=0;i<vozes.length;i++){
    if(vozes[i].lang && vozes[i].lang.toLowerCase().indexOf("pt") === 0){ vozPtBr = vozes[i]; break; }
  }
}
if("speechSynthesis" in window){
  carregarVoz();
  window.speechSynthesis.onvoiceschanged = carregarVoz;
}

function falar(texto, aoTerminar){
  if(!Config.audio || !("speechSynthesis" in window)){
    if(aoTerminar) setTimeout(aoTerminar, 300);
    return;
  }
  window.speechSynthesis.cancel();
  var fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  if(vozPtBr) fala.voice = vozPtBr;
  fala.rate = 0.92;
  fala.pitch = 1.08;

  if(aoTerminar){
    /* Em computador sem voz em portugues instalada, onend nunca dispara.
       O limite de tempo garante que a atividade continue mesmo assim. */
    var jaSeguiu = false;
    var seguir = function(){ if(jaSeguiu) return; jaSeguiu = true; aoTerminar(); };
    fala.onend = seguir;
    fala.onerror = seguir;
    setTimeout(seguir, 2600);
  }

  window.speechSynthesis.speak(fala);
}

function calarVoz(){
  if("speechSynthesis" in window) window.speechSynthesis.cancel();
}

/* ---------- MOTOR DE SOM ----------
   Acerto, erro, contagem e virada de carta sao sintetizados pelo navegador.
   Os sons dos animais sao gravacoes reais e ficam em sons/ (ver animais.js). */

var ctxAudio = null;

function contexto(){
  if(!ctxAudio){
    var AC = window.AudioContext || window.webkitAudioContext;
    if(AC) ctxAudio = new AC();
  }
  if(ctxAudio && ctxAudio.state === "suspended") ctxAudio.resume();
  return ctxAudio;
}

/* Tom com deslizamento de altura, vibrato e filtro opcionais. */
function tom(de, para, inicio, duracao, volume, tipo, vibTaxa, vibProf, filtro){
  var ctx = contexto();
  if(!ctx || !Config.audio) return;
  var t0 = ctx.currentTime + inicio;

  var osc = ctx.createOscillator();
  osc.type = tipo || "sine";
  osc.frequency.setValueAtTime(de, t0);
  if(para && para !== de) osc.frequency.exponentialRampToValueAtTime(Math.max(para, 1), t0 + duracao);

  var saida = osc;
  if(filtro){
    var passa = ctx.createBiquadFilter();
    passa.type = "lowpass";
    passa.frequency.value = filtro;
    osc.connect(passa);
    saida = passa;
  }

  var ganho = ctx.createGain();
  ganho.gain.setValueAtTime(0.0001, t0);
  ganho.gain.linearRampToValueAtTime(volume, t0 + Math.min(0.03, duracao/3));
  ganho.gain.setValueAtTime(volume, t0 + duracao * 0.7);
  ganho.gain.exponentialRampToValueAtTime(0.0001, t0 + duracao);
  saida.connect(ganho);
  ganho.connect(ctx.destination);

  if(vibTaxa){
    var lfo = ctx.createOscillator();
    lfo.frequency.value = vibTaxa;
    var ganhoLfo = ctx.createGain();
    ganhoLfo.gain.value = vibProf || 20;
    lfo.connect(ganhoLfo);
    ganhoLfo.connect(osc.frequency);
    lfo.start(t0);
    lfo.stop(t0 + duracao + 0.05);
  }

  osc.start(t0);
  osc.stop(t0 + duracao + 0.05);
}

function nota(frequencia, inicio, duracao, volume){ tom(frequencia, frequencia, inicio, duracao, volume, "sine"); }

/* ---------- SONS DE RESPOSTA ----------
   Tres variacoes de acerto, sorteadas, para o retorno nao ficar monotono. */

var ACERTOS = [
  function(){ nota(523,0,0.14,0.22); nota(659,0.12,0.14,0.22); nota(784,0.24,0.3,0.22); },
  function(){ nota(587,0,0.12,0.22); nota(784,0.11,0.12,0.22); nota(988,0.22,0.3,0.2); },
  function(){ nota(659,0,0.12,0.22); nota(880,0.1,0.26,0.22); }
];

function somAcerto(){ sortear(ACERTOS)(); }

/* Deliberadamente neutro e curto: nunca soa como reprovacao. */
function somErro(){ tom(300, 240, 0, 0.2, 0.14, "sine"); }

function somEstrela(){ nota(880,0,0.1,0.18); nota(1175,0.09,0.18,0.16); }

/* Estalo curto, usado a cada item colocado na cesta. */
function somItem(posicao){ nota(480 + posicao*90, 0, 0.09, 0.18); }

function somVirar(){ tom(700, 900, 0, 0.08, 0.12, "triangle"); }

/* ---------- UTILITARIOS ---------- */

function embaralhar(lista){
  var copia = lista.slice();
  for(var i=copia.length-1;i>0;i--){
    var j = Math.floor(Math.random()*(i+1));
    var t = copia[i]; copia[i] = copia[j]; copia[j] = t;
  }
  return copia;
}

function sortear(lista){ return lista[Math.floor(Math.random()*lista.length)]; }

function sortearVarios(lista, quantidade){ return embaralhar(lista).slice(0, quantidade); }

function elemento(id){ return document.getElementById(id); }

function atualizarPlacar(){
  var texto = "";
  for(var i=0;i<Estado.estrelas;i++) texto += "⭐";
  elemento("placar").textContent = texto;
}
