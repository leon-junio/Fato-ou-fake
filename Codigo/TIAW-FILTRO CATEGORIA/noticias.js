//Esse vetor será integrado com o resto do site, ou seja as notícias não serão as mesmas. Esse é só um exemplo antes de juntarmos as partes
var idsaude = 0;
var idpolitica = 1;
var db = {
    categorias: [
        {
            "idCategoria": "0", //Saúde
            "nomeCategoria": "Saúde",
            "noticias": [
                {
                    "titulo": "Comunidade Yanomami enfrenta superlotação em centro de saúde indígena",
                    "link":"https://g1.globo.com/jornal-nacional/noticia/2021/11/18/comunidade-yanomami-enfrenta-superlotacao-em-centro-de-saude-indigena.ghtml",
                    "descricao": "Noticias sobre bem estar e saúde."
                },
                {
                    "titulo": "Covid-19: Dados apontam eficácia a longo prazo da vacina da Pfizer em adolescentes",
                    "link":"https://g1.globo.com/saude/coronavirus/vacinas/noticia/2021/11/22/covid-19-dados-apontam-eficacia-a-longo-prazo-da-vacina-da-pfizer-em-adolescentes.ghtml",
                    "descricao": "Noticias sobre bem estar e saúde."
                },
                {
                    "titulo": "OMS anuncia acordo para produção de testes de Covid em países mais pobres",
                    "link":"https://g1.globo.com/saude/coronavirus/noticia/2021/11/23/oms-anuncia-acordo-para-producao-de-testes-de-covid-em-paises-mais-pobres.ghtml",
                    "descricao": "Noticias sobre bem estar e saúde."
                },
            ]
        },
        {
            "idCategoria": "1",//Política
            "nomeCategoria": "Política",
            "noticias": [
                {
                    "titulo": "Conselho de Ética da Câmara arquiva processo sobre Ricardo Barros no caso Covaxin",
                    "link":"https://g1.globo.com/politica/noticia/2021/11/23/conselho-de-etica-da-camara-arquiva-processo-sobre-ricardo-barros.ghtml",
                    "descricao": "Noticias verdadeiras de todas as categorias."
                },
                {
                    "titulo": "PSDB decide contratar novo aplicativo em busca de 'plano B' para dar continuidade às prévias",
                    "link":"https://g1.globo.com/politica/noticia/2021/11/23/psdb-decide-contratar-novo-aplicativo-em-busca-de-plano-b-para-as-previas.ghtml",
                    "descricao": "Noticias verdadeiras de todas as categorias."
                },
                {
                    "titulo": "STJ encerra investigação sobre Eduardo Paes por suposta fraude na Olimpíada de 2016",
                    "link":"https://g1.globo.com/politica/noticia/2021/11/23/stj-encerra-investigacao-sobre-eduardo-paes-por-suposta-fraude-na-olimpiada-de-2016.ghtml",
                    "descricao": "Noticias verdadeiras de todas as categorias."
                },
            ]
        },
        {
           {
            "idCategoria": "2",
            "nomeCategoria": "Conspirações",
            "noticias": [
                {
                    "titulo": "Teoria da conspiração: Lady Di foi assassinada?",
                    "link":"https://super.abril.com.br/mundo-estranho/teoria-da-conspiracao-lady-di-foi-assassinada/",
                    "descricao": "A princesa Diana morreu com o namorado em um acidente em 1997. Desde então, há quem acredite que a morte foi encomendada"
                },
                {
                    "titulo": "Teorias da conspiração: confira as 10 mais bizarras do mundo",
                    "link":"https://recreio.uol.com.br/ciencia/conheca-10-teorias-da-conspiracao-assustadoras.phtml",
                    "descricao": "Há teorias da conspiração para todos os gostos: com alienígenas, criaturas do fundo do mar e mais"
                },
                {
                    "titulo": "Conspirações, aviões de espionagem e OVNIs: a verdade sobre a Área 51",
                    "link":"http://revistagalileu.globo.com/Revista/Common/0,,EMI341592-18580,00-CONSPIRACOES+AVIOES+DE+ESPIONAGEM+E+OVNIS+A+VERDADE+SOBRE+A+AREA.html",
                    "descricao": "Depois de anos de segredo, relatório com informações sobre aviões U-2 e a famosa área militar norte-americana é divulgado pela CIA"
                },
            ]
        },
        {
            "idCategoria": "3",
            "nomeCategoria": "Verdadeiro",
            "noticias": [
                {
                    "titulo": "Pfizer e BioNTech afirmam que três doses da vacina neutralizam ômicron",
                    "link":"https://g1.globo.com/saude/coronavirus/vacinas/noticia/2021/12/08/vacina-da-pfizer-teste-mostra-que-tres-doses-neutralizam-omicron.ghtml",
                    "descricao": "Fabricantes disseram que três doses aumentam os anticorpos neutralizantes em 25 vezes. Duas doses seguem protegendo contra casos graves da doença, segundo as empresas."
                },
                {
                    "titulo": "Surto de lesões que provocam coceira tem mariposas como causa, afirma Sociedade Brasileira de Dermatologia em nota técnica",
                    "link":"https://g1.globo.com/pe/pernambuco/noticia/2021/12/08/sociedade-brasileira-de-dermatologia-emite-nota-tecnica-e-afirma-que-surto-de-lesoes-e-coceira-e-causado-por-mariposas.ghtml  ",
                    "descricao": "Cerdas do inseto foram encontradas em imagens feitas por meio de microscópio. Esse material, segundo a nota técnica, pode permanecer na pele por dias e até semanas, causando a dermatite."
                },
                {
                    "titulo": "Capitais mantêm programação de Natal; maioria cancelou réveillon",
                    "link":"https://g1.globo.com/saude/coronavirus/noticia/2021/12/08/capitais-programacao-natal.ghtml",
                    "descricao": "Parte delas investiu em decoração e iluminação para o Natal; outras terão apresentações e eventos. Ao menos 22 capitais descartaram fazer festa no Ano Novo em razão da covid."
                },
            ]
        },
        {
            "idCategoria": "4",
            "nomeCategoria": "Falso",
            "noticias": [
                {
                    "titulo": "Vacina magnetizada? Microchips na injeção? Veja os fatos sobre vacinas",
                    "link":"https://agenciabrasil.ebc.com.br/saude/noticia/2021-07/vacina-magnetizada-microchips-na-injecao-veja-os-fatos-sobre-vacinas",
                    "descricao": "Desinformação compartilhada em redes sociais afeta ritmo da vacinação"
                },
                {
                    "titulo": "A “ciência” da Terra plana",
                    "link":"https://super.abril.com.br/ciencia/a-ciencia-da-terra-plana/",
                    "descricao": "Se já é difícil entender como tamanha sandice ganhou alguma popularidade, pior ainda é a forma como os terraplanistas distorcem a ciência de verdade para justificar o injustificável."
                },
                {
                    "titulo": "Hidroxicloroquina com azitromicina pode ser eficaz no tratamento da Covid-19?",
                    "link":"https://pebmed.com.br/hidroxicloroquina-com-azitromicina-pode-ser-eficaz-no-tratamento-da-covid-19/",
                    "descricao": "Noticias falsas"
                },
            ]
        },
    ]
}



function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;
        });

    return vars;
}


function exibe (){
    
    let id = getUrlVars()["id"] 

    let containerNoticias = document.getElementById('noticias');
    let noticias = db.categorias[id].noticias
    let texto = '';
    //Montando a tela
    for (i=0; i < noticias.length; i++) {
            let noticia  = noticias[i].link
            texto +=
            `
                <li class="noticia-container col-12 col-sm-12 col-md-12 col-lg-4 noticias">
                <iframe class="noticia1" allowtransparency="true" width="485" height="402"  src="${noticia}"  frameborder="0" allowfullscreen></iframe>
                <a href="${noticia}" target="blank"><p>${noticias[i].titulo}</p></a>
            </li>
          `
    }
    containerNoticias.innerHTML = texto

    let tituloPag = document.getElementById('categoria');
    tituloPag.innerHTML = `${db.categorias[id].nomeCategoria}`
    
}
