/* avaliacao.js - acompanhamento individual de uma crianca
   A professora digita o nome da crianca e, a partir dai, cada rodada
   concluida fica registrada: quantas perguntas a crianca acertou na
   primeira tentativa e quanto tempo levou em media. O relatorio mostra
   em quais atividades ela vai bem e em quais precisa de mais apoio.

   Privacidade: os registros ficam somente neste computador (localStorage).
   Nada e enviado pela internet. Recomenda-se usar so o primeiro nome
   ou um apelido da crianca. */

var Avaliacao = {

  CHAVE: "brincando-avaliacoes",
  aluno: null,       /* nome da crianca em avaliacao; null = jogo normal, coletivo */
  rodada: null,      /* dados da rodada em andamento */

  NOMES: {
    formas: "Formas e cores",
    animais: "Animais e sons",
    quantidades: "Quantidades",
    tamanhos: "Maior e menor",
    diferente: "Qual é diferente",
    sequencia: "O que vem depois",
    memoria: "Jogo da memória"
  },

  /* ---------- INICIO E FIM ---------- */

  iniciar: function(nome){
    Avaliacao.aluno = nome;
    Avaliacao.atualizarFaixa();
  },

  encerrar: function(){
    Avaliacao.aluno = null;
    Avaliacao.rodada = null;
    Avaliacao.atualizarFaixa();
  },

  /* Faixa discreta no canto da tela lembrando quem esta sendo avaliado. */
  atualizarFaixa: function(){
    var faixa = elemento("faixa-avaliacao");
    if(Avaliacao.aluno){
      elemento("faixa-avaliacao-nome").textContent = Avaliacao.aluno;
      faixa.classList.remove("oculto");
    } else {
      faixa.classList.add("oculto");
    }
  },

  /* ---------- COLETA (chamada pelo app.js) ---------- */

  iniciarRodada: function(modulo){
    if(!Avaliacao.aluno){ Avaliacao.rodada = null; return; }
    Avaliacao.rodada = { modulo: modulo, perguntas: 0, primeira: 0, erros: 0, tempos: [], inicioQuestao: 0 };
  },

  inicioQuestao: function(){
    if(Avaliacao.rodada) Avaliacao.rodada.inicioQuestao = Date.now();
  },

  registrarQuestao: function(acertouDePrimeira){
    var r = Avaliacao.rodada;
    if(!r) return;
    r.perguntas++;
    if(acertouDePrimeira) r.primeira++;
    r.tempos.push((Date.now() - r.inicioQuestao) / 1000);
  },

  /* No jogo da memoria nao ha "primeira tentativa": conta os pares errados. */
  erroMemoria: function(){
    if(Avaliacao.rodada) Avaliacao.rodada.erros++;
  },

  /* So rodadas concluidas sao salvas; sair no meio descarta a rodada. */
  fecharRodada: function(){
    var r = Avaliacao.rodada;
    if(!r || !r.perguntas) return;

    var acerto;
    if(r.modulo === "memoria"){
      var pares = Memoria.pares * r.perguntas;
      acerto = pares / (pares + r.erros);
    } else {
      acerto = r.primeira / r.perguntas;
    }
    var soma = r.tempos.reduce(function(a, b){ return a + b; }, 0);

    var registros = Avaliacao.ler();
    registros.push({
      aluno: Avaliacao.aluno,
      modulo: r.modulo,
      data: new Date().toISOString(),
      nivel: Config.progressao,
      acerto: Math.round(acerto * 100),
      tempoMedio: Math.round(soma / r.tempos.length)
    });
    Avaliacao.salvar(registros);
    Avaliacao.rodada = null;
  },

  /* ---------- ARMAZENAMENTO ---------- */

  ler: function(){
    try{ return JSON.parse(localStorage.getItem(Avaliacao.CHAVE)) || []; }
    catch(e){ return []; }
  },

  salvar: function(registros){
    try{ localStorage.setItem(Avaliacao.CHAVE, JSON.stringify(registros)); }
    catch(e){ /* sem armazenamento: o registro se perde ao fechar o navegador */ }
  },

  apagarTudo: function(){
    if(!confirm("Apagar todos os registros de avaliação deste computador?")) return;
    Avaliacao.salvar([]);
    Avaliacao.montarRelatorio();
  },

  /* ---------- RELATORIO ---------- */

  /* Agrupa os registros: aluno -> atividade -> { media de acerto, rodadas, tempo }. */
  resumir: function(){
    var registros = Avaliacao.ler();
    var resumo = {};
    for(var i=0;i<registros.length;i++){
      var reg = registros[i];
      if(!resumo[reg.aluno]) resumo[reg.aluno] = {};
      var item = resumo[reg.aluno][reg.modulo];
      if(!item) item = resumo[reg.aluno][reg.modulo] = { somaAcerto: 0, somaTempo: 0, rodadas: 0 };
      item.somaAcerto += reg.acerto;
      item.somaTempo += reg.tempoMedio;
      item.rodadas++;
    }
    return resumo;
  },

  faixaDe: function(percentual){
    if(percentual >= 80) return "bem";
    if(percentual >= 50) return "meio";
    return "apoio";
  },

  montarRelatorio: function(){
    var resumo = Avaliacao.resumir();
    var alunos = Object.keys(resumo).sort();
    var modulos = Object.keys(Avaliacao.NOMES);
    var caixa = elemento("relatorio-avaliacao");

    if(!alunos.length){
      caixa.innerHTML = '<p class="relatorio-vazio">Nenhuma criança avaliada ainda.</p>';
      return;
    }

    var html = '<div class="tabela-rolagem"><table class="tabela-avaliacao"><thead><tr><th>Criança</th>';
    for(var m=0;m<modulos.length;m++) html += '<th>' + Avaliacao.NOMES[modulos[m]] + '</th>';
    html += '</tr></thead><tbody>';

    for(var a=0;a<alunos.length;a++){
      html += '<tr><th scope="row">' + escaparHtml(alunos[a]) + '</th>';
      for(var k=0;k<modulos.length;k++){
        var item = resumo[alunos[a]][modulos[k]];
        if(!item){ html += '<td class="sem-dado">—</td>'; continue; }
        var media = Math.round(item.somaAcerto / item.rodadas);
        var tempo = Math.round(item.somaTempo / item.rodadas);
        html += '<td class="faixa-' + Avaliacao.faixaDe(media) + '">' +
                  '<strong>' + media + '%</strong>' +
                  '<span>' + item.rodadas + (item.rodadas === 1 ? ' rodada' : ' rodadas') + ' · ' + tempo + 's</span>' +
                '</td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table></div>';
    caixa.innerHTML = html;
  },

  imprimirRelatorio: function(){
    Avaliacao.montarRelatorio();
    var folha = elemento("folha-impressao");
    if(!folha){
      folha = document.createElement("div");
      folha.id = "folha-impressao";
      document.body.appendChild(folha);
    }
    folha.innerHTML =
      '<h1 class="folha-titulo">Brincando e Aprendendo — Relatório de acompanhamento</h1>' +
      '<p class="folha-ident">Gerado em ' + new Date().toLocaleDateString("pt-BR") +
      '. Percentual de perguntas acertadas na primeira tentativa (no jogo da memória, pares achados sem errar), ' +
      'número de rodadas e tempo médio por pergunta.</p>' +
      elemento("relatorio-avaliacao").innerHTML +
      '<p class="folha-ident">80% ou mais: vai bem · 50% a 79%: em desenvolvimento · abaixo de 50%: precisa de mais apoio.</p>';
    window.print();
  }
};

function escaparHtml(texto){
  var div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}
