/* diferente.js - achar o elemento que nao pertence ao grupo
   No nivel completo a diferenca e apenas de cor ou apenas de forma,
   o que exige olhar com mais atencao. */

var Diferente = {

  area: "opcoes",
  ajuda: "Olhe bem as figuras: três são iguais e uma é diferente. Clique na diferente. Você também pode apertar as teclas 1, 2, 3 ou 4.",

  gerarQuestoes: function(){
    var formas = Object.keys(FORMAS);
    var cores = Object.keys(CORES);
    var completa = (Config.progressao === "completa");
    var questoes = [];

    for(var n=0; n<QUESTOES_POR_RODADA; n++){
      var quantas = completa ? 4 : 3;
      var formaBase = sortear(formas);
      var corBase = sortear(cores);
      var html = [];

      /* Alterna o tipo de diferenca para a crianca nao decorar o padrao. */
      var tipo;
      if(!completa)          tipo = "forma";       /* diferenca bem visivel */
      else if(n % 3 === 0)   tipo = "forma";
      else if(n % 3 === 1)   tipo = "cor";
      else                   tipo = "tamanho";

      var diferente;
      if(tipo === "forma"){
        var outraForma = sortear(formas.filter(function(f){ return f !== formaBase; }));
        diferente = svgForma(outraForma, corBase);
      } else if(tipo === "cor"){
        var outraCor = sortear(cores.filter(function(c){ return c !== corBase; }));
        diferente = svgForma(formaBase, outraCor);
      } else {
        diferente = svgForma(formaBase, corBase, 0.62);
      }

      var opcoes = [];
      for(var i=0;i<quantas-1;i++) opcoes.push({ html: svgForma(formaBase, corBase), certa:false });
      opcoes.push({ html: diferente, certa:true });
      opcoes = embaralhar(opcoes);

      questoes.push({
        comandoTexto: "Qual é diferente?",
        comandoVisual: "",
        vozSoNaPrimeira: true,
        fala: "Qual é diferente?",
        opcoes: opcoes
      });
    }
    return questoes;
  }
};
