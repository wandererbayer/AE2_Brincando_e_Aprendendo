/* tamanhos.js - comparacao de tamanho entre figuras iguais
   Nao ha figura de apoio: a comparacao tem de ser feita entre as opcoes,
   que e exatamente o que a atividade treina. */

var Tamanhos = {

  area: "opcoes",
  ajuda: "Compare as figuras e clique na que foi pedida: a maior ou a menor. Você também pode apertar as teclas 1, 2, 3 ou 4.",

  gerarQuestoes: function(){
    var formas = Object.keys(FORMAS);
    var cores = Object.keys(CORES);
    var completa = (Config.progressao === "completa");
    var questoes = [];

    for(var n=0; n<QUESTOES_POR_RODADA; n++){
      /* Escalas mais proximas no nivel completo: a diferenca fica menos obvia. */
      var escalas = completa ? [1, 0.82, 0.64, 0.46] : [1, 0.68, 0.4];
      var procuraMaior = (n % 2 === 0);
      var forma = sortear(formas);
      var cor = sortear(cores);

      var ordem = embaralhar(escalas);
      var alvo = procuraMaior ? Math.max.apply(null, escalas) : Math.min.apply(null, escalas);

      var opcoes = [];
      for(var j=0;j<ordem.length;j++){
        opcoes.push({ html: svgForma(forma, cor, ordem[j]), certa: (ordem[j] === alvo) });
      }

      var texto = procuraMaior ? "Ache a figura maior" : "Ache a figura menor";
      questoes.push({ comandoTexto:texto, comandoVisual:"", fala:texto, opcoes:opcoes });
    }
    return questoes;
  }
};
