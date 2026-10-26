/* sequencia.js - continuar um padrao
   Padrao A B A B no nivel simples e A A B / A B C no nivel completo. */

var Sequencia = {

  area: "opcoes",
  ajuda: "Olhe a fileira de figuras, descubra a ordem que se repete e clique na figura que vem depois do ponto de interrogação. Você também pode apertar as teclas 1, 2 ou 3.",

  gerarQuestoes: function(){
    var formas = Object.keys(FORMAS);
    var cores = Object.keys(CORES);
    var completa = (Config.progressao === "completa");
    var questoes = [];

    for(var n=0; n<QUESTOES_POR_RODADA; n++){
      var padrao;
      if(!completa)        padrao = ["A","B"];
      else if(n % 2 === 0) padrao = ["A","A","B"];
      else                 padrao = ["A","B","C"];

      var tresFormas = sortearVarios(formas, 3);
      var tresCores  = sortearVarios(cores, 3);
      var figura = {
        A: { forma:tresFormas[0], cor:tresCores[0] },
        B: { forma:tresFormas[1], cor:tresCores[1] },
        C: { forma:tresFormas[2], cor:tresCores[2] }
      };

      /* Monta a fileira com duas repeticoes completas do padrao. */
      var fileira = [];
      for(var r=0;r<2;r++) for(var p=0;p<padrao.length;p++) fileira.push(padrao[p]);

      var proxima = padrao[fileira.length % padrao.length];

      var tira = '<span class="tira">';
      for(var i=0;i<fileira.length;i++){
        tira += '<span class="tira-item">' + svgForma(figura[fileira[i]].forma, figura[fileira[i]].cor) + '</span>';
      }
      tira += '<span class="tira-item tira-vaga">?</span></span>';

      /* Alternativas: a certa e as outras figuras usadas no padrao. */
      var letras = ["A","B","C"].slice(0, Math.max(2, padrao.indexOf("C") >= 0 ? 3 : 2));
      if(letras.indexOf(proxima) < 0) letras.push(proxima);
      while(letras.length < 3) letras.push(letras.length === 2 ? "C" : "B");

      var opcoes = [];
      for(var k=0;k<letras.length;k++){
        opcoes.push({
          html: svgForma(figura[letras[k]].forma, figura[letras[k]].cor),
          certa: (letras[k] === proxima)
        });
      }
      opcoes = embaralhar(opcoes);

      questoes.push({
        comandoTexto: "O que vem depois?",
        comandoVisual: tira,
        vozSoNaPrimeira: true,
        fala: "O que vem depois?",
        opcoes: opcoes
      });
    }
    return questoes;
  }
};
