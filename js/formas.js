/* formas.js - reconhecimento de formas e cores
   Tambem fornece svgForma(), CORES e FORMAS, usados pelos modulos de
   tamanhos, diferenca e sequencia.

   Cada forma guarda o artigo e cada cor guarda as duas flexoes, para que os
   comandos saiam corretos em portugues: "Ache o circulo", mas "Ache a estrela",
   e "Ache o quadrado vermelho", mas "Ache a estrela vermelha". */

var CORES = {
  vermelho: { hex:"#d62828", m:"vermelho", f:"vermelha" },
  azul:     { hex:"#1565c0", m:"azul",     f:"azul"     },
  amarelo:  { hex:"#f6ae2d", m:"amarelo",  f:"amarela"  },
  verde:    { hex:"#2a9d4a", m:"verde",    f:"verde"    },
  laranja:  { hex:"#e8590c", m:"laranja",  f:"laranja"  },
  roxo:     { hex:"#7b3fa0", m:"roxo",     f:"roxa"     }
};

var FORMAS = {
  circulo:   { artigo:"o", nome:"círculo",   desenho:'<circle cx="100" cy="100" r="86" fill="COR"/>' },
  quadrado:  { artigo:"o", nome:"quadrado",  desenho:'<rect x="16" y="16" width="168" height="168" rx="10" fill="COR"/>' },
  triangulo: { artigo:"o", nome:"triângulo", desenho:'<polygon points="100,14 186,182 14,182" fill="COR"/>' },
  estrela:   { artigo:"a", nome:"estrela",   desenho:'<polygon points="100,12 121,71 184,73 134,111 152,171 100,136 48,171 66,111 16,73 79,71" fill="COR"/>' },
  losango:   { artigo:"o", nome:"losango",   desenho:'<polygon points="100,12 188,100 100,188 12,100" fill="COR"/>' },
  coracao:   { artigo:"o", nome:"coração",   desenho:'<path d="M100 180 C38 136 16 104 16 72 C16 42 38 22 63 22 C82 22 94 33 100 46 C106 33 118 22 137 22 C162 22 184 42 184 72 C184 104 162 136 100 180Z" fill="COR"/>' }
};

/* cor pode ser uma chave de CORES ou um valor direto, como "#8c99ab".
   escala entre 0 e 1 e usada pelo modulo de tamanhos. */
function svgForma(forma, cor, escala){
  var tinta = CORES[cor] ? CORES[cor].hex : cor;
  var desenho = FORMAS[forma].desenho.replace("COR", tinta);
  if(escala && escala !== 1){
    desenho = '<g transform="translate(100,100) scale(' + escala + ') translate(-100,-100)">' + desenho + '</g>';
  }
  return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' + desenho + '</svg>';
}

/* "o círculo", "a estrela" */
function comArtigo(forma){ return FORMAS[forma].artigo + " " + FORMAS[forma].nome; }

/* "o quadrado vermelho", "a estrela vermelha" */
function comArtigoECor(forma, cor){
  var flexao = (FORMAS[forma].artigo === "a") ? CORES[cor].f : CORES[cor].m;
  return comArtigo(forma) + " " + flexao;
}

var Formas = {

  area: "opcoes",
  ajuda: "Escute o que foi pedido e clique na figura certa. Você também pode apertar as teclas 1, 2, 3 ou 4.",

  gerarQuestoes: function(){
    var formas = Object.keys(FORMAS);
    var cores = Object.keys(CORES);
    var completa = (Config.progressao === "completa");
    var questoes = [];

    for(var n=0; n<QUESTOES_POR_RODADA; n++){
      var nivel;
      if(!completa){
        /* Infantil 4: a figura pedida aparece sempre ao lado do comando. */
        nivel = (n < QUESTOES_POR_RODADA/2) ? "forma" : "cor";
      } else {
        /* Infantil 5: as duas ultimas etapas nao mostram a figura pedida. */
        if(n < 2)      nivel = "forma";
        else if(n < 4) nivel = "cor";
        else if(n < 6) nivel = "semDica";
        else           nivel = "ambos";
      }
      questoes.push(Formas.montarQuestao(nivel, formas, cores));
    }
    return questoes;
  },

  montarQuestao: function(nivel, formas, cores){
    var certa, opcoes = [], comandoTexto, comandoVisual = "", i;

    if(nivel === "forma"){
      /* Mesma cor em todas: decide so o formato. A figura de apoio aparece em
         cinza, para dar a dica da forma sem entregar a cor. */
      var tres = sortearVarios(formas, 3);
      var corUnica = sortear(cores);
      certa = Math.floor(Math.random()*3);
      for(i=0;i<3;i++) opcoes.push({ html: svgForma(tres[i], corUnica), certa:(i===certa) });
      comandoTexto  = "Ache " + comArtigo(tres[certa]);
      comandoVisual = svgForma(tres[certa], "#8c99ab");

    } else if(nivel === "cor"){
      /* Mesma forma em todas: decide so a cor. */
      var tresCores = sortearVarios(cores, 3);
      var formaUnica = sortear(formas);
      certa = Math.floor(Math.random()*3);
      for(i=0;i<3;i++) opcoes.push({ html: svgForma(formaUnica, tresCores[i]), certa:(i===certa) });
      comandoTexto  = "Ache a figura " + CORES[tresCores[certa]].f;
      comandoVisual = svgForma("circulo", tresCores[certa]);

    } else if(nivel === "semDica"){
      /* Sem figura de apoio: a crianca guarda o que ouviu e procura sozinha. */
      var quatro = sortearVarios(formas, 4);
      var cor = sortear(cores);
      certa = Math.floor(Math.random()*4);
      for(i=0;i<4;i++) opcoes.push({ html: svgForma(quatro[i], cor), certa:(i===certa) });
      comandoTexto = "Ache " + comArtigo(quatro[certa]);

    } else {
      /* Forma e cor juntas, sem figura de apoio e com distratores que repetem
         a forma ou a cor da resposta: so a combinacao certa serve. */
      var formaCerta = sortear(formas);
      var corCerta = sortear(cores);
      var outraForma = sortear(formas.filter(function(f){ return f !== formaCerta; }));
      var outrasCores = sortearVarios(cores.filter(function(c){ return c !== corCerta; }), 2);

      var alternativas = embaralhar([
        { forma:formaCerta, cor:corCerta,       certa:true  },
        { forma:formaCerta, cor:outrasCores[0], certa:false },
        { forma:outraForma, cor:corCerta,       certa:false },
        { forma:outraForma, cor:outrasCores[1], certa:false }
      ]);
      for(i=0;i<4;i++) opcoes.push({ html: svgForma(alternativas[i].forma, alternativas[i].cor), certa: alternativas[i].certa });

      comandoTexto = "Ache " + comArtigoECor(formaCerta, corCerta);
    }

    return { comandoTexto:comandoTexto, comandoVisual:comandoVisual, fala:comandoTexto, opcoes:opcoes };
  }
};
