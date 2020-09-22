//LoadHeader();
window.onload = function () {
    CheckLogin();
    LoadMenu();
    CreateGrid();
    LoginStatus();
    HomeForm();
    ModalAlert();
    ModalConflict();
}
//global var
var procLista =[];
function GlobalProcedmientos(){
    //Global
    let db = firebase.firestore();
    db.collection("procedimentos")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                procLista.push(doc.data())
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

//funções do menu
function Home(){
    ClearForm();
    HomeForm();
    ClearTitulo();
    SetTitulo("Home", "home");
}
function Cadastro(){
    ClearForm();
    CadastroForm();
    ClearTitulo();
    SetTitulo("Cadastro de Pacientes", "cadastro");
}
function Agendar(){
    ClearForm();
    CriaAgendaForm();
    ClearTitulo();
    SetTitulo("Agendar Sessões","agenda");
    //para carregar os limites dos procedimentos
    GlobalProcedmientos();
}
function Marcacoes(){
    ClearForm();
    MarcacoesForm();
    ClearTitulo();
    SetTitulo("Marcação de Presença","presenca");
}
function Relatorio(){
    ClearForm();
    RelatorioForm();
    ClearTitulo();
    SetTitulo("Relatório de Presença","relatorio");
}
function Apinews(){
    ClearForm();
    ApinewsForm();
    ClearTitulo();
    SetTitulo("Notícias do Momento","news");
}

//frames
function LoadMenu(){
    //menu
    const itensMenu = ["Home", "Cadastrar", "Agendar", "Marcações", "Relatório", "News", "Sair" ];
    const funcNames = ["Home", "Cadastro", "Agendar", "Marcacoes", "Relatorio", "Apinews", "Logout"];

    const mainNav = document.createElement("nav");
    mainNav.className = "navbar nav-tabs nav-fill navbar-dark bg-company-green navbar-expand-sm";
    mainNav.id = "navbar-site";
    const divCont = document.createElement("div");
    divCont.className = "container";
    divCont.id = "nav";
    const divBrand = document.createElement("div");
    divBrand.className = "navbar-brand d-none d-sm-inline-block";
    divBrand.innerText = "CFRA";
    divCont.appendChild(divBrand);
    mainNav.appendChild(divCont);
    const divNav = document.createElement("div");
    divNav.className = "navbar-nav";
    divCont.appendChild(divNav);
    for (let i=0; i <= 6; i++){
        let anchor = document.createElement("a");
        anchor.className = "nav-item nav-link"
        anchor.innerText = itensMenu[i];
        anchor.href = `javascript:${funcNames[i]}()`;
        anchor.id = `${funcNames[i]}`;
        divNav.appendChild(anchor);
    }
    document.body.appendChild(mainNav);

}
function CreateGrid(){
    document.body.className = "bg-light";
    const grid = document.createElement("div");
    grid.className = "container-fluid";

    //para o título
    const row0 = document.createElement("row");
    row0.className = "row justify-content-center bg-info";
    let divCh = document.createElement("section");
    divCh.id = "title";
    divCh.className = "col-6";
    row0.appendChild(divCh);
    grid.appendChild(row0);

    const row1 = document.createElement("row");
    row1.className = "row justify-content-center ";
    for (let i=0; i<=3; i++){
        let divCh = document.createElement("section");
        divCh.id = `divId${i}`;
        divCh.className = "col"
        row1.appendChild(divCh);
    }
    grid.appendChild(row1);

    const row2 = document.createElement("row");
    row2.className = "row justify-content-center";
    for (let i=0; i<=3; i++){
        let divCh = document.createElement("section");
        divCh.id = `divId${i}`;
        divCh.className = "col"
        row2.appendChild(divCh);
    }
    grid.appendChild(row2);

    document.body.appendChild(grid);
}
function LoginStatus(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const nav = document.getElementById("nav");
            const spanSis = document.createElement("span");
            spanSis.className = "navbar-text d-none d-lg-inline-block";
            spanSis.innerText = `Olá ${user.email}`;
            spanSis.className = "navbar-text d-none d-lg-inline-block";
            nav.appendChild(spanSis);
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            // ...
        }
    });
}
function ClearFormRelatorios(){
    let clearDiv;
    if((clearDiv = document.getElementById("mainDiv2")) != null){
        const clearDiv2 = document.getElementById("mainDiv2");
        clearDiv2.innerHTML = "";
        clearDiv2.remove();
    }
    if((clearDiv = document.getElementById("mainDiv3")) != null){
        const clearDiv3 = document.getElementById("mainDiv3");
        clearDiv3.innerHTML = "";
        clearDiv3.remove();
    }
}

//criação dos formulários
function HomeForm(){
    //normalizando a largura da coluna
    var divCol = document.getElementById("divId1");
    divCol.className = "col";

    var divHome = document.createElement("div");
    divHome.id = "mainDiv";
    //Sessão Home
    var homeTitulo = document.createElement("h1");
    homeTitulo.innerText = "Home"
    var homeSubTit = document.createElement("h2");
    homeSubTit.innerText = "Você está aqui. Área para informar sobre as funções dessa ferramenta."
    divHome.appendChild(homeTitulo);
    divHome.appendChild(homeSubTit);

    //Sessão Cadastrar
    var cadTitulo = document.createElement("h1");
    cadTitulo.innerText = "Cadastrar"
    var cadSubTit = document.createElement("h2");
    cadSubTit.innerText = "Área destinada ao cadastro de pacientes/clientes."
    divHome.appendChild(cadTitulo);
    divHome.appendChild(cadSubTit);

    //Sessão Agenda
    var agendaTitulo = document.createElement("h1");
    agendaTitulo.innerText = "Agendar"
    var agSubTit = document.createElement("h2");
    agSubTit.innerText = "Área destinada ao agendamento de pacientes/clientes."
    divHome.appendChild(agendaTitulo);
    divHome.appendChild(agSubTit);

    const cel1 = document.getElementById("divId1");
    cel1.appendChild(divHome);

    //segunda coluna da home
    var divHome2 = document.createElement("div");
    divHome2.id = "mainDiv2";
    //Sessão Marcações
    var marcaTitulo = document.createElement("h1");
    marcaTitulo.innerText = "Marcações"
    var mrcSubTit = document.createElement("h2");
    mrcSubTit.innerText = "Área destinada a marcações de presença ou falta dos pacientes/clientes."
    divHome2.appendChild(marcaTitulo);
    divHome2.appendChild(mrcSubTit);
    //Sessão Relatório
    var relTitulo = document.createElement("h1");
    relTitulo.innerText = "Relatório"
    var relSubTit = document.createElement("h2");
    relSubTit.innerText = "Dados sobre as atividades junto aos pacientes/clientes estão disponíves."
    divHome2.appendChild(relTitulo);
    divHome2.appendChild(relSubTit);
    //Sessão Logout
    var logTitulo = document.createElement("h1");
    logTitulo.innerText = "Logout"
    var logSubTit = document.createElement("h2");
    logSubTit.innerText = "Onde o usuário sai da aplicação. Importante para impedir acesso indevido."
    divHome2.appendChild(logTitulo);
    divHome2.appendChild(logSubTit);

    const cel2 = document.getElementById("divId2");
    cel2.appendChild(divHome2);
}
function CadastroForm(){
    //normalizando a largura da coluna
    var divCol = document.getElementById("divId1");
    divCol.className = "col";

    var divCadastro = document.createElement("div");
    divCadastro.id = "mainDiv";
    //input para email
    var pNome = document.createElement("label");
    pNome.innerText = "Nome Completo";
    pNome.className = "form-control-label mt-2";
    pNome.setAttribute("for","nomePac");
    divCadastro.appendChild(pNome);
    var inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.id = "nomePac";
    inputNome.className = "form-control";
    divCadastro.appendChild(inputNome);
    //input para senha
    var pNasc = document.createElement("label");
    pNasc.innerText = "Data de Nascimento";
    pNasc.className = "form-control-label mt-3";
    pNome.setAttribute("for","dataNasc");
    divCadastro.appendChild(pNasc);
    var inputNasc = document.createElement("input");
    inputNasc.type = "date";
    inputNasc.id = "dataNasc";
    inputNasc.className = "form-control";
    divCadastro.appendChild(inputNasc);
    var pEmail = document.createElement("label");
    pEmail.innerText = "Email";
    pEmail.className = "form-control-label mt-3";
    pEmail.setAttribute("for","emailPac");
    divCadastro.appendChild(pEmail);
    var inputEmail = document.createElement("input");
    inputEmail.type = "text";
    inputEmail.id = "emailPac";
    inputEmail.className = "form-control";
    divCadastro.appendChild(inputEmail);

    const cel1 = document.getElementById("divId1");
    cel1.appendChild(divCadastro);

    //segunda coluna
    var divCadastro2 = document.createElement("div");
    divCadastro2.id = "mainDiv2";
    //input para telefone
    var pTel = document.createElement("label");
    pTel.innerText = "Telefone";
    pTel.className = "form-control-label mt-2";
    pTel.setAttribute("for","telPac");
    divCadastro2.appendChild(pTel);
    var inputTel = document.createElement("input");
    inputTel.type = "text";
    inputTel.id = "telPac";
    inputTel.className = "form-control";
    divCadastro2.appendChild(inputTel);
    //input para endereço
    var pEnd = document.createElement("label");
    pEnd.innerText = "Endereço";
    pEnd.className = "form-control-label mt-3";
    pEnd.setAttribute("for","endPac");
    divCadastro2.appendChild(pEnd);
    var inputEnd = document.createElement("input");
    inputEnd.type = "text";
    inputEnd.id = "endPac";
    inputEnd.className = "form-control";
    divCadastro2.appendChild(inputEnd);
    //input para CPF
    var pCpf = document.createElement("label");
    pCpf.innerText = "CPF";
    pCpf.className = "form-control-label mt-3";
    pCpf.setAttribute("for","cpfPac");
    divCadastro2.appendChild(pCpf);
    var inputCpf = document.createElement("input");
    inputCpf.type = "text";
    inputCpf.id = "cpfPac";
    inputCpf.className = "form-control mb-4";
    divCadastro2.appendChild(inputCpf);
    //button cadastrar paciente
    var pButton = document.createElement("p");
    divCadastro2.appendChild(pButton);
    var buttonCad = document.createElement("button");
    //buttonCad.setAttribute("data-toggle", "modal");
    //buttonCad.setAttribute("data-target","#modalAction")
    buttonCad.addEventListener("click",CadastroPac);
    buttonCad.innerText = "Cadastrar"
    buttonCad.className = "btn btn-outline-success btn-block"
    divCadastro2.appendChild(buttonCad);

    const cel2 = document.getElementById("divId2");
    cel2.appendChild(divCadastro2);
    //document.body.appendChild(divCadastro);
}
function CriaAgendaForm(){
    //normalizando a largura da coluna
    var divCol = document.getElementById("divId1");
    divCol.className = "col";

    var divCadastro = document.createElement("div");
    divCadastro.id = "mainDiv";

    //input para nome
    var pNome = document.createElement("label");
    pNome.innerText = "Nome do Paciente";
    pNome.className = "form-control-label mt-2";
    pNome.setAttribute("for","pacientes");
    divCadastro.appendChild(pNome);
    var inputList = document.createElement("input");
    inputList.setAttribute("list","paciente");
    //Open Bug 1474137
    inputList.setAttribute("autocomplete","off");
    inputList.id = "pacientes";
    inputList.name = "paciente";
    inputList.className = "form-control";
    divCadastro.appendChild(inputList);
    divCadastro.appendChild(GetPacientes());
    //input para data
    var pData = document.createElement("label");
    pData.innerText = "Escolha a data";
    pData.className = "form-control-label mt-3";
    pData.setAttribute("for","data");
    divCadastro.appendChild(pData);
    var inputData = document.createElement("input");
    inputData.type = "date";
    inputData.id = "data";
    inputData.className = "form-control";
    divCadastro.appendChild(inputData);

    //input para hora
    var pHora = document.createElement("label");
    pHora.innerText = "Escolha o horário";
    pHora.className = "form-control-label mt-3";
    pHora.setAttribute("for","hora");
    divCadastro.appendChild(pHora);
    var inputHora = document.createElement("input");
    inputHora.className = "form-control";
    inputHora.type = "time";
    inputHora.id = "hora";
    divCadastro.appendChild(inputHora);

    const cel1 = document.getElementById("divId1");
    cel1.appendChild(divCadastro);
    //document.body.appendChild(divCadastro);

    //continuação de campos de agendamento
    var divCadastro2 = document.createElement("div");
    divCadastro2.id = "mainDiv2";
    //input para profissional
    var pProf = document.createElement("label");
    pProf.innerText = "Profissional";
    pProf.className = "form-control-label mt-2";
    pProf.setAttribute("for","profissional");
    divCadastro2.appendChild(pProf);
    divCadastro2.appendChild(GetProfissionais());
    //input para procedimento
    var pProc = document.createElement("label");
    pProc.innerText = "Procedimento";
    pProc.className = "form-control-label mt-3";
    pProc.setAttribute("for","procedimento");
    divCadastro2.appendChild(pProc);
    divCadastro2.appendChild(GetProcedimentos());
    //input para sala/espaço da consulta
    var pSala = document.createElement("label");
    pSala.innerText = "Sala";
    pSala.className = "form-control-label mt-3";
    pSala.setAttribute("for","sala");
    divCadastro2.appendChild(pSala);
    divCadastro2.appendChild(GetSala());
    //button
    var pButton = document.createElement("p");
    divCadastro2.appendChild(pButton);
    var buttonCad = document.createElement("button");
    buttonCad.id = "cadastro";
    buttonCad.addEventListener("click",AgendaPaciente);
    buttonCad.innerText = "Agendar";
    buttonCad.className = "btn btn-outline-success btn-block mt-4"
    divCadastro2.appendChild(buttonCad);

    const cel2 = document.getElementById("divId2");
    cel2.appendChild(divCadastro2);

}
function MarcacoesForm(){
    var divCadastro = document.createElement("div");
    divCadastro.className = "form-check";
    divCadastro.id = "mainDiv";
    //aumentando a largura da coluna
    var divCol = document.getElementById("divId1");
    divCol.className = "col-6";
    //titulo
    var titulo = document.createElement("h3");
    titulo.innerText = "Sessões agendadas:";
    titulo.className = "mt-3";
    divCadastro.appendChild(titulo);
    divCadastro.appendChild(GetAgenda());
    //botão de confirmar
    var pButton = document.createElement("p");
    divCadastro.appendChild(pButton);
    var divButtons = document.createElement("div");
    divButtons.className = "btn-group";
    var buttonCad = document.createElement("button");
    buttonCad.className = "btn btn-outline-success btn-block mt-4"
    buttonCad.id = "confirmarAgenda";
    buttonCad.addEventListener("click",AgendaConfirma);
    buttonCad.innerText = "Confirmar Presença";
    divButtons.appendChild(buttonCad);
    //botão de faltou
    var pButtonFaltou = document.createElement("p");
    divCadastro.appendChild(pButtonFaltou);
    var buttonFalta = document.createElement("button");
    buttonFalta.className = "btn btn-outline-danger btn-block mt-4";
    buttonFalta.id = "faltouAgenda";

    buttonFalta.addEventListener("click",AgendaFaltou);
    buttonFalta.innerText = "Faltou a sessão";
    divButtons.appendChild(buttonFalta);

    divCadastro.appendChild(divButtons);

    const cel1 = document.getElementById("divId1");
    cel1.appendChild(divCadastro);

}
function RelatorioForm(){
    //normalizando a largura da coluna
    var divCol = document.getElementById("divId1");
    divCol.className = "col";

    var divRelatorio = document.createElement("div");
    divRelatorio.id = "mainDiv";

    //input para data inicial
    var pDtInicio = document.createElement("label");
    pDtInicio.className = "form-control-label mt-2";
    pDtInicio.setAttribute("for","dataIni");
    pDtInicio.innerText = "Data inicial";
    divRelatorio.appendChild(pDtInicio);
    var inputDataIni = document.createElement("input");
    inputDataIni.type = "date";
    inputDataIni.id = "dataIni";
    inputDataIni.className = "form-control";
    divRelatorio.appendChild(inputDataIni);
    //input para data final
    var pDtFim = document.createElement("label");
    pDtFim.className = "form-control-label mt-2";
    pDtFim.setAttribute("for","dataFim");
    pDtFim.innerText = "Data final";
    divRelatorio.appendChild(pDtFim);
    var inputDataFim = document.createElement("input");
    inputDataFim.type = "date";
    inputDataFim.id = "dataFim";
    inputDataFim.className = "form-control";
    divRelatorio.appendChild(inputDataFim);
    //button
    var pButton = document.createElement("p");
    divRelatorio.appendChild(pButton);
    var buttonRel = document.createElement("button");
    buttonRel.id = "relatorio";
    buttonRel.className = "btn btn-outline-success btn-block";
    buttonRel.addEventListener("click",GeraRelatorio);
    buttonRel.innerText = "Gerar Relatório";
    divRelatorio.appendChild(buttonRel);

    const cel1 = document.getElementById("divId1");
    cel1.appendChild(divRelatorio);
}
function ApinewsForm(){
    const divApinews = document.createElement("div");
    divApinews.id = "mainDiv";

    //titulo
    const titulo = document.createElement("h1");
    titulo.innerText = "Notícias";
    divApinews.appendChild(titulo);

    //input para assunto
    const pAssunto = document.createElement("label");
    pAssunto.innerText = "Escolha um tema para as notícias";
    pAssunto.setAttribute("for","assunto");
    pAssunto.className = "form-control-label mt-2";
    divApinews.appendChild(pAssunto);
    const inputAssunto = document.createElement("input");
    inputAssunto.type = "text";
    inputAssunto.id = "assunto";
    inputAssunto.className = "form-control";
    divApinews.appendChild(inputAssunto);

    //idioma
    const pIdioma = document.createElement("label");
    pIdioma.innerText = "Escolha um idioma";
    divApinews.appendChild(pIdioma);
    const labelIdioma = document.createElement("label");
    labelIdioma.for = "idioma";
    labelIdioma.className = "form-check-label";
    const inputIdioma = document.createElement("select");
    inputIdioma.name = "idioma";
    inputIdioma.id = "idioma";
    inputIdioma.className = "form-control";
    const idiomas = ["de","en","es","fr","it","nl","no"];
    const idiomasTxt = ["Deutsch","English","Español","français","Italiano","Nederlands","Norsk"];
    const optDef = document.createElement("option");
    optDef.value = "pt";
    optDef.innerText = "Português";
    optDef.selected;
    inputIdioma.appendChild(optDef);
    for (let i in idiomas){
        const opt = document.createElement("option");
        opt.value = idiomas[i];
        opt.innerText = idiomasTxt[i];
        inputIdioma.appendChild(opt);
    }
    divApinews.appendChild(inputIdioma);

    //radio para titulo ou conteúdo
    const divPesq = document.createElement("div");
    divPesq.className = "form-check mt-4"
    const radioConteudo = document.createElement("input");
    radioConteudo.type = "radio";
    radioConteudo.id = "q";
    radioConteudo.name = "tipoPesq";
    radioConteudo.className = "form-check-input ";
    divPesq.appendChild(radioConteudo);
    const labelCont = document.createElement("label");
    labelCont.id = "contLabel";
    labelCont.for = "q";
    labelCont.className = "form-check-label ";
    labelCont.innerText = "Pesquisar no Conteúdo";
    divPesq.appendChild(labelCont);
    divApinews.appendChild(divPesq);

    const divPesq2 = document.createElement("div");
    divPesq2.className = "form-check mt-2"
    const radioTitulo = document.createElement("input");
    radioTitulo.type = "radio";
    radioTitulo.id = "qInTitle";
    radioTitulo.name = "tipoPesq";
    radioTitulo.className = "form-check-input ";
    divPesq2.appendChild(radioTitulo);
    divApinews.appendChild(divPesq2);
    const labelTit = document.createElement("label");
    labelTit.id = "tituloLabel";
    labelTit.for = "qInTitle";
    labelTit.className = "form-check-label ";
    labelTit.innerText = "Pesquisas no Título";
    divPesq2.appendChild(labelTit);
    divApinews.appendChild(divPesq2);

    //botão de pesquisar
    var pButton = document.createElement("p");
    divApinews.appendChild(pButton);
    var buttonPes = document.createElement("button");
    buttonPes.id = "pesquisar";
    buttonPes.className = "btn btn-outline-success btn-block mt-4";
    buttonPes.addEventListener("click",PesquisaNoticia);
    buttonPes.innerText = "Pesquisar";
    divApinews.appendChild(buttonPes);


    const cel1 = document.getElementById("divId1");
    cel1.appendChild(divApinews);
}

//função firebase
function CheckLogin(){
    firebase.auth().onAuthStateChanged(user => {
        if(!user) {
            window.location = 'index.html'; //If User is not logged in, redirect to login page
        }
    });
}
function CadastroPac(){
    const nome = document.getElementById("nomePac").value;
    const dtNasc = document.getElementById("dataNasc").value;
    const emailPac = document.getElementById("emailPac").value;
    const telefone = document.getElementById("telPac").value;
    const endereco = document.getElementById("endPac").value;
    const cpf = document.getElementById("cpfPac").value;

    const modalHeader = document.getElementById("modalHeader");
    modalHeader.innerText = "Cadastro de Paciente";

    if (nome === "" || dtNasc === "" || emailPac === "" || telefone === ""){
        ResultFunc("Para realização do cadastro é necessário informar o nome " +
            "do paciente, a data de nascimento, um e-mail e o telefone de contato.")
    } else {
        //inserindo os dados
        //gerar id para paciente
        const pacId = uuidv4();
        const db = firebase.firestore();
        db.collection("pacientes")
            .doc(pacId)
            .set({nome: nome, idade: dtNasc, email: emailPac,
                telefone: telefone, endereco: endereco, cpf: cpf,
                id: pacId})
            .then(function(docRef) {
                ResultFunc(`Paciente ${nome} cadastrado(a) com sucesso!`);
                Cadastro();
            })
            .catch(function(error) {
                ResultFunc(error);
                Cadastro();
            });
    }
}
function GetPacientes(){
    let db = firebase.firestore();
    var selectPac = document.createElement("datalist");
    selectPac.id = "paciente";


    db.collection("pacientes")
        .orderBy("nome")
        .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var opt = document.createElement("option");
            opt.value = doc.data().nome;
            opt.id = doc.data().id;
            selectPac.appendChild(opt);
        });
    });

    return selectPac;
}
function GetProfissionais(){
    let db = firebase.firestore();
    var selectProof = document.createElement("select");
    selectProof.id = "profissional";
    selectProof.className = "form-control";
    var optDefault = document.createElement("option");
    optDefault.innerText = "Escolha o Profissional";
    optDefault.selected;
    optDefault.hidden;
    optDefault.disabled;
    selectProof.appendChild(optDefault)
    db.collection("funcionarios")
        .orderBy("nomeFunc")
        .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var opt = document.createElement("option");
            opt.value = doc.data().login;
            opt.innerText = doc.data().nomeFunc;
            opt.id = doc.data().nomeFunc;
            selectProof.appendChild(opt);
        });
    });
    return selectProof;
}
function GetProcedimentos(){
    let db = firebase.firestore();
    var selectPrced = document.createElement("select");
    selectPrced.id = "procedimento";
    selectPrced.className = "form-control";
    var optDefault = document.createElement("option");
    optDefault.innerText = "Escolha o Procedimento";
    optDefault.selected;
    optDefault.hidden;
    optDefault.disabled;
    selectPrced.appendChild(optDefault)
    db.collection("procedimentos")
        .orderBy("procedimento")
        .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var opt = document.createElement("option");
            opt.value = doc.data().procedimento;
            opt.innerText = doc.data().procedimento;
            opt.id = doc.data().procedimento;
            selectPrced.appendChild(opt);
        });
    });

    return selectPrced;
}
function GetSala(){
    let db = firebase.firestore();
    var selectSala = document.createElement("select");
    selectSala.id = "sala";
    selectSala.className = "form-control";
    var optDefault = document.createElement("option");
    optDefault.innerText = "Escolha a Sala";
    optDefault.selected;
    optDefault.hidden;
    optDefault.disabled;
    selectSala.appendChild(optDefault)
    db.collection("salas")
        .orderBy("nomeSala")
        .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var opt = document.createElement("option");
            opt.value = doc.data().nomeSala;
            opt.innerText = doc.data().nomeSala;
            opt.id = doc.data().nomeSala;
            selectSala.appendChild(opt);
        });
    });

    return selectSala;
}
function AgendaPaciente(){
    //função para pegar id e nome do datalist autocomplete fdp
    var idNome = GetIdNome();

    var paciente = idNome.split(";")[1];
    var pacienteId = idNome.split(";")[0];

    var data = document.getElementById("data").value;
    var hora = document.getElementById("hora").value;
    var prof = document.getElementById("profissional");
    var profissional = prof.options[prof.selectedIndex].value;
    var profissionalNome = prof.options[prof.selectedIndex].text;
    var proc = document.getElementById("procedimento");
    var procedimento = proc.options[proc.selectedIndex].text;
    var sala = document.getElementById("sala");
    var nomeSala = sala.options[sala.selectedIndex].text;

    //iniciando o database
    let db = firebase.firestore();

    //teste dos inputs
    if (data === "" || hora === "" || profissionalNome === ""
        || procedimento === "" || nomeSala === ""){
        const modalHeader = document.getElementById("modalHeader");
        modalHeader.innerText = "Agendamento de Paciente";

        ResultFunc("Todos os campos são de preenchimento " +
            "obrigatório para realização do agendamento da sessão.")
    } else {
        var docPac;
        var docSala;
        var docProf;
        var docHora;
        var docProc;
        var user = firebase.auth().currentUser;

        //checar se há agenda
        //verificar - data/hora - profissional - sala
        var haAgendamento = false;
        //convertendo a data solicitada para o formato firestore/firebase
        const dataTS = new Date(data);
        const dataSolicitada = firebase.firestore.Timestamp.fromDate(dataTS);
        //mensagem para usuário
        const modalHeader = document.getElementById("modalHeader");
        modalHeader.innerText = "Agendamento de Paciente";

        var idAgenda = uuidv4();
        //variavel para procs com mais de um participante por sessão
        var procObj = procLista.find(obj => {
            return obj.procedimento === procedimento
        });
        var participantes = 0;
        if (procObj.qtdMaxPAciente > 1){
            db.collection("agenda")
                //filtros para validar se há marcações no mesmo dia
                //.where("profissionalLogin", "==", profissional) - o profissional pode ser qualquer um
                //.where("procedimento", "==", procedimento) - o proc pode ser qq um. O problema é hora e espaço
                .where("sala", "==", nomeSala)
                .where("data", "==", dataSolicitada)
                .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var horaAgenda = ToSeconds(doc.data().hora);
                    if(TestRange(ToSeconds(hora),horaAgenda-1800,horaAgenda+1800)){
                        participantes++;
                        docPac = doc.data().nome;
                        docSala = doc.data().sala;
                        docProf = doc.data().profissionalNome;
                        docProc = doc.data().procedimento;
                        docHora = doc.data().hora;
                    }
                });
                //procedimentos que permitem mais de um participante
                if (participantes > procObj.qtdMaxPAciente){
                    const modalHeader = document.getElementById("modalConflitoHead");
                    modalHeader.innerText = `Agendamento de ${procObj.procedimento}`;
                    let msgConflito = `Já há ${participantes - 1} agendamentos de ${procObj.procedimento} nesse horário.\nConfirma o agendamento mesmo assim?` +
                        `\nPaciente: ${docPac}` +
                        `\nProfissional: ${docProf}`+
                        `\nProcedimento: ${docProc}` +
                        `\nSala: ${docSala}` +
                        `\nHora: ${docHora}`;
                    HaAgendamento(msgConflito);
                }
                //aqui não há conflito e segue o jogo
                else {
                    //inserindo os dados sem agendamentos no mesmo horároio
                    db.collection("agenda").doc(idAgenda)
                        .set({
                            nome: paciente,
                            pacienteId: pacienteId,
                            data: dataSolicitada,
                            hora: hora,
                            profissionalLogin: profissional,
                            profissionalNome: profissionalNome,
                            procedimento: procedimento,
                            sala: nomeSala,
                            agendadorLogin: user.email,
                            idAgenda: idAgenda
                        })
                        .then(function(docRef) {
                            ResultFunc(`Agendamento do(a) paciente ${paciente} realizado com sucesso!\n
                        Data: ${dataTS.toLocaleDateString('pt-BR', {timeZone: 'UTC'})}\n
                        Hora: ${hora}`);
                            ClearForm();
                            CriaAgendaForm();
                        })
                        .catch(function(error) {
                            ResultFunc(error);
                        });
                }
            });
            //procedimentos que possuem apens um participante
        } else{
            db.collection("agenda")
                //filtros para validar se há marcações no mesmo dia
                //.where("profissionalLogin", "==", profissional) - o profissional pode ser qualquer um
                //.where("procedimento", "==", procedimento) - o proc pode ser qq um. O problema é hora e espaço
                .where("sala", "==", nomeSala)
                .where("data", "==", dataSolicitada)
                .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var horaAgenda = ToSeconds(doc.data().hora);
                    if(TestRange(ToSeconds(hora),horaAgenda-1800,horaAgenda+1800)){
                        haAgendamento = true;
                        docPac = doc.data().nome;
                        docSala = doc.data().sala;
                        docProf = doc.data().profissionalNome;
                        docProc = doc.data().procedimento;
                        docHora = doc.data().hora;
                    }
                });
                //aqui vemos o possível conflito de agenda e o conflito será tratado na função HaAgendamento()
                if(haAgendamento){
                    const modalHeader = document.getElementById("modalConflitoHead");
                    modalHeader.innerText = "Agendamento de Paciente Conflitante";
                    let msgConflito = `Há agendamentos nesse horário.\nConfirma o agendamento mesmo assim?` +
                        `\nPaciente: ${docPac}` +
                        `\nProfissional: ${docProf}`+
                        `\nProcedimento: ${docProc}` +
                        `\nSala: ${docSala}` +
                        `\nHora: ${docHora}`;
                    HaAgendamento(msgConflito);
                    //aqui não há conflito e segue o jogo
                }else {
                    //inserindo os dados sem agendamentos no mesmo horároio
                    db.collection("agenda").doc(idAgenda)
                        .set({
                            nome: paciente,
                            pacienteId: pacienteId,
                            data: dataSolicitada,
                            hora: hora,
                            profissionalLogin: profissional,
                            profissionalNome: profissionalNome,
                            procedimento: procedimento,
                            sala: nomeSala,
                            agendadorLogin: user.email,
                            idAgenda: idAgenda
                        })
                        .then(function(docRef) {
                            ResultFunc(`Agendamento do(a) paciente ${paciente} realizado com sucesso!\n
                        Data: ${dataTS.toLocaleDateString('pt-BR', {timeZone: 'UTC'})}\n
                        Hora: ${hora}`);
                            ClearForm();
                            CriaAgendaForm();
                        })
                        .catch(function(error) {
                            ResultFunc(error);
                        });
                }
            });
        }
    }
}
function GetAgenda(){
    const user = firebase.auth().currentUser;
    let db = firebase.firestore();
    var pAgenda = document.createElement("p");
    db.collection("agenda")
        .where("profissionalLogin", "==", user.email)
        .orderBy("data")
        .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

            var radio = document.createElement("input");
            radio.className = "form-check-input";
            radio.type = "radio";
            radio.id = doc.data().idAgenda;
            radio.name = "data";
            pAgenda.appendChild(radio);

            var label = document.createElement("label");
            label.className = "form-check-label";
            label.id = `${doc.data().idAgenda}label`;
            label.for = doc.data().data;
            var dataTS = doc.data().data;
            var data = dataTS.toDate();
            label.innerText = `${data.toLocaleDateString('pt-BR', {timeZone: 'UTC'})} - ${doc.data().hora} - ${doc.data().nome}`;
            pAgenda.appendChild(label);

            var pEsp = document.createElement("p");
            pAgenda.appendChild(pEsp);
        });
    });
    return pAgenda;
}
function AgendaConfirma(){
    const modalHeader = document.getElementById("modalHeader");
    modalHeader.innerText = "Presença do Paciente";

    if (document.querySelector('input[name="data"]:checked') == null){
        ResultFunc("Favor selecionar uma sessão para dar presença");
    } else {
        var agendaOk = document.querySelector('input[name="data"]:checked').id;
        let db = firebase.firestore();
        var docRef = db.collection("agenda").doc(agendaOk);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                db.collection("agendaok").doc(doc.data().idAgenda).set(doc.data())
                    .then(function() {
                        ResultFunc(`Presença do(a) paciente ${doc.data().nome} marcada com sucesso.`);
                        docRef.delete();
                        const itemAgenda = document.getElementById(doc.data().idAgenda);
                        itemAgenda.remove();
                        const labelAgenda = `${doc.data().idAgenda}label`;
                        const labelAgendaRemove = document.getElementById(labelAgenda);
                        labelAgendaRemove.remove();
                    })
                    .catch(function(error) {
                        ResultFunc(error);
                    });
            } else {
                ResultFunc("Problema em achar essa sessão no sistema. Favor tentar novamente");
            }
        }).catch(function(error) {
            ResultFunc(error);
        });
    }

}
function AgendaFaltou(){
    const modalHeader = document.getElementById("modalHeader");
    modalHeader.innerText = "Presença do Paciente";

    if (document.querySelector('input[name="data"]:checked') == null){
        ResultFunc("Favor selecionar uma sessão para informar a falta.");
    } else {
        var agendaNotOk = document.querySelector('input[name="data"]:checked').id;
        let db = firebase.firestore();
        var docRef = db.collection("agenda").doc(agendaNotOk);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                db.collection("agendanotok").doc(doc.data().idAgenda).set(doc.data())
                    .then(function() {
                        ResultFunc(`Falta do(a) paciente ${doc.data().nome} marcada com sucesso.`);
                        docRef.delete();
                        const itemAgenda = document.getElementById(doc.data().idAgenda);
                        itemAgenda.remove();
                        const labelAgenda = `${doc.data().idAgenda}label`;
                        const labelAgendaRemove = document.getElementById(labelAgenda);
                        labelAgendaRemove.remove();
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
            } else {
                ResultFunc("Problema em achar essa sessão. Favor tentar novamente.");
            }
        }).catch(function(error) {
            ResultFunc(error);
        });
    }

}
function GeraRelatorio(){
    //limpar as duas colunas dos relatórios
    ClearFormRelatorios();
    //usuário logado para ver somente o relatório particular
    var user = firebase.auth().currentUser;
    var divRelatorio2 = document.createElement("div");
    divRelatorio2.id = "mainDiv2";


    var dataIni = document.getElementById("dataIni").value;
    var dataFim = document.getElementById("dataFim").value;
    //conversão das datas pata formato firestore
    const dataIniDate = new Date(dataIni);
    const dataTSIni = firebase.firestore.Timestamp.fromDate(dataIniDate);
    const dataFimDate = new Date(dataFim);
    const dataTSFim = firebase.firestore.Timestamp.fromDate(dataFimDate);

    if (dataIni === "" || dataFim === ""){
        const modalHeader = document.getElementById("modalHeader");
        modalHeader.innerText = "Geração de Relatório";
        ResultFunc("Datas inválidas, favor preencher corretamente os campos.")

    } else if (dataIniDate >= dataFimDate){
        const modalHeader = document.getElementById("modalHeader");
        modalHeader.innerText = "Geração de Relatório";
        ResultFunc("Datas inválidas, a data inicial não pode ser maior ou igual a data final.")
    } else{
        let db = firebase.firestore();
        var pTitPresente = document.createElement("p");
        pTitPresente.innerText = "Presentes: ";
        pTitPresente.className = "text-light bg-dark mt-2";
        var spanTitPres = document.createElement("span");
        spanTitPres.className = "p-1 mb-2 bg-success text-white";
        pTitPresente.appendChild(spanTitPres);

        divRelatorio2.appendChild(pTitPresente);
        var totPresentes = 0;
        db.collection("agendaok")
            .where("profissionalLogin", "==", user.email)
            .where("data", ">=", dataTSIni)
            .where("data", "<=", dataTSFim)
            .orderBy("data")
            .get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var pSessao = document.createElement("p");
                var dataSessao = doc.data().data.toDate();
                pSessao.innerText = `${dataSessao.toLocaleString().split(" ",1)} - ${doc.data().hora} - ${doc.data().nome} - ${doc.data().procedimento}`
                divRelatorio2.appendChild(pSessao);
                totPresentes++;
                spanTitPres.innerText = totPresentes.toString();
            });
        });

        const cel2 = document.getElementById("divId2");
        cel2.appendChild(divRelatorio2);

        var divRelatorio3 = document.createElement("div");
        divRelatorio3.id = "mainDiv3";
        var pTitAusente = document.createElement("p");
        pTitAusente.innerText = "Ausentes: ";
        pTitAusente.className = "text-light bg-dark mt-2";
        var spanTitAuse = document.createElement("span");
        spanTitAuse.className = "p-1 mb-2 bg-danger text-white";
        pTitAusente.appendChild(spanTitAuse);

        divRelatorio3.appendChild(pTitAusente);
        var totAusentes = 0;
        db.collection("agendanotok")
            .where("profissionalLogin", "==", user.email)
            .where("data", ">=", dataTSIni)
            .where("data", "<=", dataTSFim)
            .orderBy("data")
            .get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var pSessaoA = document.createElement("p");
                var dataSessaoA = doc.data().data.toDate();
                pSessaoA.innerText = `${dataSessaoA.toLocaleString().split(" ",1)} - ${doc.data().hora} - ${doc.data().nome} - ${doc.data().procedimento}`
                divRelatorio3.appendChild(pSessaoA);
                totAusentes++;
                spanTitAuse.innerText = totAusentes.toString();
            });
        });

        const cel3 = document.getElementById("divId3");
        cel3.appendChild(divRelatorio3);
    }
}
function Logout(){
    firebase.auth().signOut().then(function() {
        location = location;
    }).catch(function(error) {
        window.alert(error);
    });
}
function PesquisaNoticia(){

    var divNoticia = document.createElement("div");
    divNoticia.id = "mainDiv2";

    const modalHeader = document.getElementById("modalHeader");
    modalHeader.innerText = "Notícias";

    const assunto = document.getElementById("assunto").value;

    if (document.querySelector('input[name="tipoPesq"]:checked') == null ||
        assunto === ""){
        ResultFunc("Favor preencher todos os campos.");
    } else{
        const tipoQuery = document.querySelector('input[name="tipoPesq"]:checked').id;
        const idiomaVal = document.getElementById("idioma");
        const idioma = idiomaVal.options[idiomaVal.selectedIndex].value;
        const data0 = hoje();
        const data1 = semanaOld();
        const linkApi = `http://newsapi.org/v2/everything?`+`${tipoQuery}`+`="`+`${assunto}`+`"&language=`+`${idioma}`+`&from=`+
            `${data1}`+`&to=`+`${data0}`+`&pageSize=30&apiKey=3f7f28b3102a4dfea37f48f8bcf558cf`;
        GetNews(linkApi);
        ClearFormRelatorios();
    }
}

//funcções gerais
function ClearForm(){
    let clearDiv;
    if((clearDiv = document.getElementById("mainDiv")) != null){
        clearDiv = document.getElementById("mainDiv");
        clearDiv.innerHTML = "";
        clearDiv.remove();
    }
    if((clearDiv = document.getElementById("mainDiv2")) != null){
        const clearDiv2 = document.getElementById("mainDiv2");
        clearDiv2.innerHTML = "";
        clearDiv2.remove();
    }
    if((clearDiv = document.getElementById("mainDiv3")) != null){
        const clearDiv3 = document.getElementById("mainDiv3");
        clearDiv3.innerHTML = "";
        clearDiv3.remove();
    }
}
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function TestRange(x, min, max) {
    return x >= min && x <= max;
}
function ToSeconds(hora){
    var a = hora.split(':');
    return (+a[0]) * 60 * 60 + (+a[1]) * 60
}
function GetIdNome() {
    var pacientes_input = document.getElementById('pacientes');
    var paciente_datalist = document.getElementById('paciente');
    var opSelected = paciente_datalist.querySelector(`[value="${pacientes_input.value}"]`);
    var id = opSelected.getAttribute('id');
    var nome = opSelected.getAttribute('value');
    return `${id};${nome}`;
}
function ModalAlert(){
    const modalDiv = document.createElement("div");
    modalDiv.className = "modal fade";
    modalDiv.id = "modalAction";
    const modalDivDialog= document.createElement("div");
    modalDivDialog.className = "modal-dialog";
    modalDiv.appendChild(modalDivDialog);
    const modalDivContent = document.createElement("div");
    modalDivContent.className = "modal-content";
    modalDivDialog.appendChild(modalDivContent);
    //header modal
    const modalDivHeader = document.createElement("div");
    modalDivHeader.className = "modal-header";
    const modalH5 = document.createElement("h5");
    modalH5.className = "modal-title";
    modalH5.id = "modalHeader";
    modalDivHeader.appendChild(modalH5);
    modalDivContent.appendChild(modalDivHeader);
    //x button
    const modalButtonX = document.createElement("button");
    modalButtonX.type = "button";
    modalButtonX.className = "close";
    modalButtonX.setAttribute("data-dismiss", "modal");
    modalButtonX.setAttribute("aria-label","Close");
    const spanX = document.createElement("span");
    spanX.setAttribute("aria-hidden","true");
    spanX.innerHTML = "&times;"
    modalButtonX.appendChild(spanX);
    modalDivHeader.appendChild(modalButtonX);
    //body modal
    const modalDivBody = document.createElement("div");
    modalDivBody.className = "modal-body";
    modalDivBody.id = "modalBody";
    modalDivContent.appendChild(modalDivBody);
    //footer modal
    const modalDivButton = document.createElement("div");
    modalDivButton.className = "modal-footer";
    const modalButtonOk = document.createElement("button");
    modalButtonOk.type = "button";
    modalButtonOk.className = "btn btn-outline-success";
    modalButtonOk.setAttribute("data-dismiss","modal");
    modalButtonOk.innerText = "Ok";
    modalDivButton.appendChild(modalButtonOk);
    modalDivContent.appendChild(modalDivButton);

    document.body.appendChild(modalDiv);
}
function ModalConflict(){
    const modalDivConf = document.createElement("div");
    modalDivConf.className = "modal fade";
    modalDivConf.id = "modalConflict";
    const modalDivDialogConf= document.createElement("div");
    modalDivDialogConf.className = "modal-dialog";
    modalDivConf.appendChild(modalDivDialogConf);
    const modalDivContent = document.createElement("div");
    modalDivContent.className = "modal-content";
    modalDivDialogConf.appendChild(modalDivContent);
    //header modal
    const modalDivHeader = document.createElement("div");
    modalDivHeader.className = "modal-header";
    const modalH5 = document.createElement("h5");
    modalH5.className = "modal-title";
    modalH5.id = "modalConflitoHead";
    modalDivHeader.appendChild(modalH5);
    modalDivContent.appendChild(modalDivHeader);
    //x button
    const modalButtonX = document.createElement("button");
    modalButtonX.type = "button";
    modalButtonX.className = "close";
    modalButtonX.setAttribute("data-dismiss", "modal");
    modalButtonX.setAttribute("aria-label","Close");
    const spanX = document.createElement("span");
    spanX.setAttribute("aria-hidden","true");
    spanX.innerHTML = "&times;"
    modalButtonX.appendChild(spanX);
    modalDivHeader.appendChild(modalButtonX);
    //body modal
    const modalDivBody = document.createElement("div");
    modalDivBody.className = "modal-body";
    modalDivBody.id = "modalBC";
    modalDivContent.appendChild(modalDivBody);
    //footer modal
    const modalDivButton = document.createElement("div");
    modalDivButton.className = "modal-footer";
    const modalButtonOk = document.createElement("button");
    modalButtonOk.type = "button";
    modalButtonOk.className = "btn btn-outline-success";
    modalButtonOk.setAttribute("data-dismiss","modal");
    modalButtonOk.innerText = "Confirmar Agendamento";
    modalButtonOk.addEventListener("click",AgendaSobrepor);
    modalDivButton.appendChild(modalButtonOk);
    const modalButtonNotOk = document.createElement("button");
    modalButtonNotOk.type = "button";
    modalButtonNotOk.className = "btn btn-outline-danger";
    modalButtonNotOk.setAttribute("data-dismiss","modal");
    modalButtonNotOk.innerText = "Cancelar";
    modalDivButton.appendChild(modalButtonNotOk);

    modalDivContent.appendChild(modalDivButton);

    document.body.appendChild(modalDivConf);
}
function ClearModalAlert(){
    //limpar o modal body
    let pBody;
    if((pBody = document.getElementById("modalBody")) != null){
        pBody = document.getElementById("modalBody");
        pBody.innerText = "";
    }
}
function ClearModalAlertConflito(){
    //limpar o modal body
    let pBody;
    if((pBody = document.getElementById("modalBC")) != null){
        pBody = document.getElementById("modalBC");
        pBody.innerText = "";
    }
}
function ResultFunc(msg){
    ClearModalAlert();
    const txt = document.getElementById("modalBody");
    const pBody = document.createElement("p");
    pBody.id = "modalBody";
    txt.appendChild(pBody);
    txt.append("\n" + msg);
    $('#modalAction').modal('show');
}
function SetTitulo(titulo, icon){
    var tit = document.createElement("h1");
    var kbd = document.createElement("kbd");
    var imgIcon = document.createElement("img");
    imgIcon.className = "img-fluid";
    imgIcon.title = "home icon";
    imgIcon.title = "home icon";
    imgIcon.style = "width: 15px; height 15px;";
    switch (icon){
        case 'home' :
            imgIcon.src = "img/home-solid.svg";
            break;
        case 'cadastro' :
            imgIcon.src = "img/portrait-solid.svg";
            break;
        case 'agenda' :
            imgIcon.src = "img/calendar-alt-solid.svg";
            break;
        case 'presenca' :
            imgIcon.src = "img/check-square-solid.svg";
            break;
        case 'relatorio' :
            imgIcon.src = "img/chart-line-solid.svg";
            break;
        case 'news' :
            imgIcon.src = "img/newspaper-regular.svg";
            break
    }
    kbd.innerText = ` ${titulo} `;
    kbd.appendChild(imgIcon);
    tit.appendChild(kbd);
    tit.id = "h1Tit";
    var titCol = document.getElementById("title");
    titCol.appendChild(tit);
}
function ClearTitulo(){
    let clearTit;
    if((clearTit = document.getElementById("h1Tit")) != null){
        clearTit = document.getElementById("h1Tit");
        clearTit.innerHTML = "";
        clearTit.remove();
    }
}
function HaAgendamento(msg){
    ClearModalAlertConflito(); //limpa os body
    const txt = document.getElementById("modalBC");
    const pBody = document.createElement("p");
    pBody.id = "modalBodyConflito";
    txt.appendChild(pBody);
    txt.append("\n" + msg);
    //mostra a caixa modal com a pergunta se agenda assim mesmo
    //no modal, há duas opções: 1 para cancelar. Outra para confirmar que chama AgendaSobrepor()
    $('#modalConflict').modal('show');
}
function AgendaSobrepor(){
    let db = firebase.firestore();
    //id novo da agenda
    var idAgenda = uuidv4();

    //função para pegar id e nome do datalist autocomplete fdp
    var idNome = GetIdNome();
    var paciente = idNome.split(";")[1];
    var pacienteId = idNome.split(";")[0];

    //pegando as informações da tela
    var data = document.getElementById("data").value;
    var hora = document.getElementById("hora").value;
    var prof = document.getElementById("profissional");
    var profissional = prof.options[prof.selectedIndex].value;
    var profissionalNome = prof.options[prof.selectedIndex].text;
    var proc = document.getElementById("procedimento");
    var procedimento = proc.options[proc.selectedIndex].text;
    var sala = document.getElementById("sala");
    var nomeSala = sala.options[sala.selectedIndex].text;
    //informação para saber quem está agendando
    var user = firebase.auth().currentUser;
    //convertendo a data solicitada para o formato firestore/firebase
    const dataTS = new Date(data);
    const dataSolicitada = firebase.firestore.Timestamp.fromDate(dataTS);

    //inserindo os dados mesmo com agendamento no mesmo horário
    db.collection("agenda").doc(idAgenda)
        .set({
            nome: paciente,
            pacienteId: pacienteId,
            data: dataSolicitada,
            hora: hora,
            profissionalLogin: profissional,
            profissionalNome: profissionalNome,
            procedimento: procedimento,
            sala: nomeSala,
            agendadorLogin: user.email,
            idAgenda: idAgenda
        })
        .then(function(docRef) {
            ResultFunc(`Agendamento do(a) paciente ${paciente} realizado com sucesso!\n
                    Data: ${dataTS.toLocaleDateString('pt-BR', {timeZone: 'UTC'})}\n
                    Hora: ${hora}`);
            ClearForm();
            CriaAgendaForm();
        })
        .catch(function(error) {
            ResultFunc(error);
        });
}
function ToastFunc(msg,header){
    const divToast = document.createElement("div");
    divToast.className = "toast";
    divToast.setAttribute("role","alert");
    divToast.setAttribute("aria-live","assertive");
    divToast.setAttribute("aria-atomic", "true");
    divToast.setAttribute("data-delay","5000");
    const divHeaderToast = document.createElement("div");
    divHeaderToast.className = "toast-header";
    divToast.appendChild(divHeaderToast);
    const txtHeader = document.createElement("strong");
    txtHeader.innerText = header;
    txtHeader.className = "mr-auto";
    divHeaderToast.appendChild(txtHeader);
    const btnClose = document.createElement("button");
    btnClose.type = "button";
    btnClose.className = "close";
    btnClose.setAttribute("data-dismiss", "toast");
    btnClose.setAttribute("aria-label","Close");
    divHeaderToast.appendChild(btnClose);
    const spanToast = document.createElement("span");
    spanToast.setAttribute("aria-hidden","true");
    spanToast.innerText = "&times;"
    btnClose.appendChild(spanToast);
    const divToastBody = document.createElement("div");
    divToastBody.innerText = msg;
    divToast.appendChild(divToastBody);

    document.body.appendChild(divToast);
}
async function GetNews(linkApi){
    const divApi2 = document.createElement("div");
    divApi2.className = "carousel slide carousel-fade mt-5";
    divApi2.id = "mainDiv2";
    divApi2.setAttribute("data-ride","carousel");
    const olItem = document.createElement("ol");
    olItem.className = "carousel-indicators"
    divApi2.appendChild(olItem);
    const divInner = document.createElement("div");
    divInner.className = "carousel-inner";

    let resp = await fetch(linkApi);
    if(resp.ok){

        let json = await resp.json();
        var totArticles = json.articles.length;
        if (json.articles.length > 11){
            totArticles = 11;
        }
        if (totArticles === 0){
            ClearFormRelatorios();
            ResultFunc("Não há notícias sobre esse assunto");
        }else{
            console.log(totArticles);
            for (let i=0; i < totArticles; i++){
                const aLink = document.createElement("a");
                aLink.href = json.articles[i].url;
                aLink.target = "_blank"
                const liItem = document.createElement("li");
                liItem.setAttribute("data-target","#mainDiv2");
                liItem.setAttribute("data-slide-to",`${i}`);
                olItem.appendChild(liItem);
                const divGeral = document.createElement("div");
                divGeral.className = "carousel-item";
                if (i===2){
                    liItem.className = "active";
                    divGeral.className = "carousel-item active";
                }
                const  divMateriaImg = document.createElement("div");
                const materiaImg = document.createElement("img");
                materiaImg.className = "d-block w-100 rounded-sm"
                if (json.articles[i].urlToImage === null){
                    materiaImg.src = "img/semImg.png"
                    materiaImg.title = "matéria sem imagem";
                }else{
                    materiaImg.src = json.articles[i].urlToImage;
                    materiaImg.title = json.articles[i].title;
                }
                materiaImg.alt = "link para matéria pesquisada";
                aLink.appendChild(materiaImg);
                divMateriaImg.appendChild(aLink);
                const  divMateriaTit = document.createElement("div");
                divMateriaTit.innerText = json.articles[i].title;
                divMateriaTit.className = "font-weight-bold mb-2";
                const pMateria = document.createElement("p");
                pMateria.innerText = json.articles[i].description;
                divGeral.appendChild(divMateriaTit);
                divGeral.appendChild(pMateria);
                divGeral.appendChild(divMateriaImg);
                divInner.appendChild(divGeral);
            }
            const aControl = document.createElement("a");
            aControl.className = "carousel-control-prev";
            aControl.href = "#featured";
            aControl.setAttribute("role","button");
            aControl.setAttribute("data-slide","prev");
            const spanCrtl = document.createElement("span");
            spanCrtl.className = "carousel-control-prev-icon";
            spanCrtl.setAttribute("aria-hidden","true");
            aControl.appendChild(spanCrtl);
            const spanCrtl2 = document.createElement("span");
            spanCrtl2.className ="sr-only";
            spanCrtl2.innerText = "Voltar";
            spanCrtl.appendChild(spanCrtl2);
            aControl.appendChild(spanCrtl);

            const aControl2 = document.createElement("a");
            aControl2.className = "carousel-control-next";
            aControl2.href = "#mainDiv2";
            aControl2.setAttribute("role","button");
            aControl2.setAttribute("data-slide","next");
            const spanCrtlNext = document.createElement("span");
            spanCrtlNext.className = "carousel-control-next-icon";
            spanCrtlNext.setAttribute("aria-hidden","true");
            aControl2.appendChild(spanCrtlNext);
            const spanCrtl2Next = document.createElement("span");
            spanCrtl2Next.className ="sr-only";
            spanCrtl2Next.innerText = "Próximo";
            spanCrtlNext.appendChild(spanCrtl2Next);
            aControl2.appendChild(spanCrtlNext);

            divApi2.appendChild(divInner);
            divApi2.appendChild(aControl);
            divApi2.appendChild(aControl2);
            const div2 = document.getElementById("divId2");
            div2.appendChild(divApi2);
        }
    }
}
function semanaOld(){
    //um dia atrás
    var old = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return old.toISOString().slice(0,10);
}
function hoje(){
    var datetime = new Date();
    return datetime.toISOString().slice(0,10);
}
