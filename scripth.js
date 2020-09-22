window.onload = function () {
    CheckLogin();
    //LoadBanner();
    LoadMenu();
    CreateGrid();
    LoginStatus();
    HomeForm();
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
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

//frames
function LoadBanner(){
    //banner com a imagem
    const headerTag = document.createElement("div");
    headerTag.id = "divBanner";
    headerTag.className = "divBanner";
    const logo = document.createElement("img");
    logo.src= "logo.png";
    logo.alt = "logo da página";
    logo.title = "logo da página";
    logo.className = "imgLogo";
    headerTag.appendChild(logo);



    document.body.appendChild(headerTag);
}
function LoadMenu(){
    const container = document.createElement("div");
    container.id = "container";

    const header = document.createElement("header");
    container.appendChild(header)
    //login
    const status = document.createElement("div");
    status.id = "status";
    status.className = "divBanner2";
    const h1Header = document.createElement("h1");
    h1Header.innerHTML = "CFRA Centro Fisoterapeutico Raphael Abreu"
    header.appendChild(h1Header);
    //menu
    const itensMenu = ["Home", "Cadastrar", "Agendar", "Marcações", "Relatório", "API News", "Logout" ];
    const funcNames = ["Home", "Cadastro", "Agendar", "Marcacoes", "Relatorio", "Apinews", "Logout"];
    const divMenu = document.createElement("nav");
    divMenu.id = "divMenuID";
    divMenu.className = "divMenu";
    header.appendChild(status);
    const uList = document.createElement("ul");

    const logo = document.createElement("img");
    logo.src= "logo.png";
    logo.alt = "logo da página";
    logo.title = "logo da página";
    logo.className = "imgLogo";

    uList.appendChild(logo);
    for (let i=0; i <= 6; i++){
        let lIst = document.createElement("li");
        let anchor = document.createElement("a");
        anchor.innerText = itensMenu[i];
        anchor.className = "button3 bouncy";
        anchor.href = `javascript:${funcNames[i]}()`;
        lIst.appendChild(anchor);
        uList.appendChild(lIst);
    }
    divMenu.appendChild(uList);
    header.appendChild(divMenu);
    document.body.appendChild(container)
}
function CreateGrid(){

    const grid = document.createElement("main");
    grid.className = "grid-container";

    for (let i=0; i<=5; i++){
        const divCh = document.createElement("section");
        divCh.id = `divID${i}`;
        grid.appendChild(divCh);
    }
    var container = document.getElementById("container");
    container.appendChild(grid);

    const footer = document.createElement("footer");
    const divFooter = document.createElement("div");
    divFooter.className = "divFooter";

    const div0 = document.createElement("div");
    div0.className = "div0Footer";
    const aInsta = document.createElement("a");
    aInsta.href = "https://www.instagram.com/cfra_cfra/?hl=pt-br";

    const pInsta= document.createElement("div");
    pInsta.className = "divPe";
    const iInsta = document.createElement("i");
    iInsta.className = "fab fa-instagram-square";
    iInsta.setAttribute("aria-hidden", "true");
    const insta = document.createElement("span");
    insta.innerText = " Instagram";
    pInsta.appendChild(iInsta);
    pInsta.appendChild(insta);
    aInsta.appendChild(pInsta);
    div0.appendChild(aInsta);
    const aFace = document.createElement("a");
    aFace.href = "https://pt-br.facebook.com/CentroFisioterapeuticoRaphaelAbreu";

    const pFace = document.createElement("div");
    pFace.className = "divPe";
    const iFace = document.createElement("i");
    iFace.className = "fab fa-facebook-square";
    iFace.setAttribute("aria-hidden", "true");
    const face = document.createElement("span");
    face.innerText = " Facebook"
    pFace.appendChild(iFace);
    pFace.appendChild(face);
    aFace.appendChild(pFace);
    div0.appendChild(aFace);

    divFooter.appendChild(div0);

    const div1 = document.createElement("div");
    div1.className = "div1Footer";
    const pEnd = document.createElement("div");
    pEnd.className = "divPe";
    const iEnd = document.createElement("i");
    iEnd.className = "fa fa-arrow-circle-right";
    iEnd.setAttribute("aria-hidden", "true");
    const end = document.createElement("span");
    end.innerText = " Estrada da Cacuia, 685 Sala 101\n" +
        "21921-000 Rio de Janeiro, RJ";
    pEnd.appendChild(iEnd);
    pEnd.appendChild(end);
    div1.appendChild(pEnd);
    const pTel = document.createElement("div");
    pTel.className = "divPe";
    const iTel = document.createElement("i");
    iTel.className = "fa fa-phone-square";
    iTel.setAttribute("aria-hidden", "true");
    const tel = document.createElement("span");
    tel.innerText = " (21) 99600-6187"
    pTel.appendChild(iTel);
    pTel.appendChild(tel);
    div1.appendChild(pTel);
    const pZap = document.createElement("div");
    pZap.className = "divPe";
    const iZap = document.createElement("i");
    iZap.className = "fab fa-whatsapp";
    iZap.setAttribute("aria-hidden", "true");
    const zap = document.createElement("span");
    zap.innerText = " (21) 99600-6187"
    pZap.appendChild(iZap);
    pZap.appendChild(zap);
    div1.appendChild(pZap);

    divFooter.appendChild(div1);

    footer.appendChild(divFooter);
    container.appendChild(footer);
}
function LoginStatus(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const status = document.getElementById("status");
            status.innerText = `Olá ${user.email}`;
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

//funções do menu
function Home(){
    ClearForm();
    HomeForm();
}
function Cadastro(){
    ClearForm();
    CadastroForm();
}
function Agendar(){
    ClearForm();
    CriaAgendaForm();
    //para carregar os limites dos procedimentos
    GlobalProcedmientos();
}
function Marcacoes(){
    ClearForm();
    MarcacoesForm();
}
function Apinews(){
    ClearForm();
    ApinewsForm();
}
function Relatorio(){
    ClearForm();
    RelatorioForm();
}

//funcs fire
function CheckLogin(){
    firebase.auth().onAuthStateChanged(user => {
        if(!user) {
            window.location = 'index.html'; //If User is not logged in, redirect to login page
        }
    });
}
function CadastroPac(){
    var nome = document.getElementById("nomePac").value;
    var dtNasc = document.getElementById("dataNasc").value;
    var emailPac = document.getElementById("emailPac").value;
    var telefone = document.getElementById("telPac").value;
    var endereco = document.getElementById("endPac").value;
    var cpf = document.getElementById("cpfPac").value;

    var result = document.getElementById("resultado");

    if (nome === "" || dtNasc === "" || emailPac === "" || telefone === ""){
        window.alert("Para realização do cadastro é necessário informar o nome " +
            "do paciente, a data de nascimento, um e-mail e o telefone de contato.")
    } else {
        //inserindo os dados
        //gerar id para paciente
        var pacId = uuidv4();
        var db = firebase.firestore();
        db.collection("pacientes")
            .doc(pacId)
            .set({nome: nome, idade: dtNasc, email: emailPac,
                telefone: telefone, endereco: endereco, cpf: cpf,
                id: pacId})
            .then(function(docRef) {
                result.innerText = "Paciente cadastrado com sucesso!"
                setTimeout(ClearResult, 4000);
            })
            .catch(function(error) {
                result.innerText = error;
                setTimeout(ClearResult, 4000);
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
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data().nome);
            var opt = document.createElement("option");
            opt.value = doc.data().nome;
            opt.id = doc.data().id;
            selectPac.appendChild(opt);
        });
    });

    return selectPac;
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

    //teste dos inputs
    if (data === "" || hora === "" || profissionalNome === ""
        || procedimento === "" || nomeSala === ""){

        window.alert("Todos os campos são de preenchimento " +
            "obrigatório para realização do agendamento da sessão.")
    } else {
        var docPac;
        var docSala;
        var docProf;
        var docHora;
        var docProc;

        var user = firebase.auth().currentUser;
        var result = document.getElementById("resultado");
        var idAgenda = uuidv4();
        //variavel para procs com mais de um participante por sessão
        var procObj = procLista.find(obj => {
            return obj.procedimento === procedimento
        });
        var participantes = 0;
        //checar se há agenda
        //verificar - data/hora - profissional - sala
        var haAgendamento = false;
        //convertendo a data solicitada para o formato firestore/firebase
        const dataTS = new Date(data);
        const dataSolicitada = firebase.firestore.Timestamp.fromDate(dataTS);

        let db = firebase.firestore();
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
                        if(confirm(`Já há ${participantes - 1} agendamentos de ${procObj.procedimento} nesse horário.\nConfirma o agendamento mesmo assim?` +
                        `\nPaciente: ${docPac}` +
                        `\nProfissional: ${docProf}`+
                        `\nProcedimento: ${docProc}` +
                        `\nSala: ${docSala}` +
                        `\nHora: ${docHora}`)){
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
                                    result.innerText = "Agendado com sucesso";
                                    setTimeout(ClearResult, 4000);
                                })
                                .catch(function(error) {
                                    result.innerText = error;
                                });
                        }else {
                            result.innerText = "Agendamento Cancelado!"
                        }

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
                            result.innerText = "Agendado com sucesso";
                            setTimeout(ClearResult, 4000);
                        })
                        .catch(function(error) {
                            result.innerText = error;
                        });
                }
            });
        //procedimentos que só permitem 1 paciente por sessão abaixo
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
                //aqui vemos o possível conflito de agenda
                if(haAgendamento){
                    if (confirm(`Há agendamentos nesse horário.\nConfirma o agendamento mesmo assim?` +
                        `\nPaciente: ${docPac}` +
                        `\nProfissional: ${docProf}`+
                        `\nProcedimento: ${docProc}` +
                        `\nSala: ${docSala}` +
                        `\nHora: ${docHora}`)) {
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
                                result.innerText = "Agendado com sucesso";
                                setTimeout(ClearResult, 4000);
                            })
                            .catch(function(error) {
                                result.innerText = error;
                            });
                    } else {
                        result.innerText = "Agendamento Cancelado!"
                    }
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
                            //console.log("Document written with ID: ", docRef.id);
                            result.innerText = "Agendado com sucesso";
                            setTimeout(ClearResult, 4000);
                        })
                        .catch(function(error) {
                            result.innerText = error;
                        });
                }
            });
        }
    }
}
function GetProfissionais(){
    let db = firebase.firestore();
    var selectProof = document.createElement("select");
    selectProof.id = "profissional";
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
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data().nome);
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
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data().nome);
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
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data().nome);
            var opt = document.createElement("option");
            opt.value = doc.data().nomeSala;
            opt.innerText = doc.data().nomeSala;
            opt.id = doc.data().nomeSala;
            selectSala.appendChild(opt);
        });
    });

    return selectSala;
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
            radio.type = "radio";
            radio.id = doc.data().idAgenda;
            radio.name = "data";
            radio.className = "radioAgenda";
            pAgenda.appendChild(radio);

            var label = document.createElement("label");
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
    var resultado = document.getElementById("resultado");

    if (document.querySelector('input[name="data"]:checked') == null){
        resultado.innerText = "\n\nFavor selecionar uma sessão para dar presença."
    } else {
        var agendaOk = document.querySelector('input[name="data"]:checked').id;
        let db = firebase.firestore();
        var docRef = db.collection("agenda").doc(agendaOk);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                db.collection("agendaok").doc(doc.data().idAgenda).set(doc.data())
                    .then(function() {
                        resultado.innerText = "Presença marcada com sucesso";
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
                resultado.innerText = "Problema em achar essa sessão";
            }
        }).catch(function(error) {
            resultado.innerText = error;
        });
    }

}
function AgendaFaltou(){
    var resultado = document.getElementById("resultado");

    if (document.querySelector('input[name="data"]:checked') == null){
        resultado.innerText = "\n\nFavor selecionar uma sessão para informar a falta"
    } else {
        var agendaNotOk = document.querySelector('input[name="data"]:checked').id;
        let db = firebase.firestore();
        var docRef = db.collection("agenda").doc(agendaNotOk);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                db.collection("agendanotok").doc(doc.data().idAgenda).set(doc.data())
                    .then(function() {
                        resultado.innerText = "Falta marcada com sucesso";
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
                resultado.innerText = "Problema em achar essa sessão";
            }
        }).catch(function(error) {
            resultado.innerText = error;
        });
    }

}
function GeraRelatorio(){
    ClearForm2();
    //usuário logado para ver somente o relatório particular
    var user = firebase.auth().currentUser;
    var divRelatorio2 = document.createElement("div");
    divRelatorio2.className = "quadro";
    divRelatorio2.id = "mainDiv2";


    var dataIni = document.getElementById("dataIni").value;
    var dataFim = document.getElementById("dataFim").value;
    //conversão das datas pata formato firestore
    const dataIniDate = new Date(dataIni);
    const dataTSIni = firebase.firestore.Timestamp.fromDate(dataIniDate);
    const dataFimDate = new Date(dataFim);
    const dataTSFim = firebase.firestore.Timestamp.fromDate(dataFimDate);
    if (dataIni === "" || dataFim === ""){
        window.alert("Datas inválidas, favor preencher corretamente os campos.")

    } else if (dataIniDate >= dataFimDate){
        window.alert("Datas inválidas, a data inicial não pode ser maior ou igual a data final.")
    } else{
        let db = firebase.firestore();
        var pTitPresente = document.createElement("p");
        pTitPresente.className = "pTitTot";
        pTitPresente.innerText = "Presentes: ";
        var spanTitPres = document.createElement("span");
        spanTitPres.className = "spanNum";
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
                pSessao.className = "pRelatorio";
                var dataSessao = doc.data().data.toDate();
                pSessao.innerText = `${dataSessao.toLocaleString().split(" ",1)} - ${doc.data().hora} - ${doc.data().nome} - ${doc.data().procedimento}`
                divRelatorio2.appendChild(pSessao);
                console.log(totPresentes++);

                spanTitPres.innerText = totPresentes.toString();
            });
        });

        const cel2 = document.getElementById("divID2");
        cel2.appendChild(divRelatorio2);

        var divRelatorio3 = document.createElement("div");
        divRelatorio3.className = "quadro";
        divRelatorio3.id = "mainDiv3";
        var pTitAusente = document.createElement("p");
        pTitAusente.className = "pTitTot";
        pTitAusente.innerText = "Ausentes: ";
        var spanTitAuse = document.createElement("span");
        spanTitAuse.className = "spanNum";
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
                pSessaoA.className = "pRelatorio";
                var dataSessaoA = doc.data().data.toDate();
                pSessaoA.innerText = `${dataSessaoA.toLocaleString().split(" ",1)} - ${doc.data().hora} - ${doc.data().nome} - ${doc.data().procedimento}`
                divRelatorio3.appendChild(pSessaoA);
                totAusentes++;
                spanTitAuse.innerText = totAusentes.toString();
            });
        });

        const cel3 = document.getElementById("divID3");
        cel3.appendChild(divRelatorio3);
    }
}
function PesquisaNoticia(){

    var divNoticia = document.createElement("div");
    divNoticia.className = "quadro";
    divNoticia.id = "mainDiv2";

    const resultado = document.getElementById("resultado");
    const assunto = document.getElementById("assunto").value;
    console.log(assunto);
    if (document.querySelector('input[name="tipoPesq"]:checked') == null ||
    assunto === ""){
        resultado.innerText = "\n\nFavor preencher todos os campos."
    } else{
        const tipoQuery = document.querySelector('input[name="tipoPesq"]:checked').id;
        resultado.innerText = "";
        const idiomaVal = document.getElementById("idioma");
        const idioma = idiomaVal.options[idiomaVal.selectedIndex].value;
        const data0 = hoje();
        const data1 = semanaOld();
        const linkApi = `http://newsapi.org/v2/everything?`+`${tipoQuery}`+`="`+`${assunto}`+`"&language=`+`${idioma}`+`&from=`+
            `${data1}`+`&to=`+`${data0}`+`&pageSize=30&apiKey=3f7f28b3102a4dfea37f48f8bcf558cf`;
        GetNews(linkApi);
    }
}

//criação dos formulários
function HomeForm(){
    var divHome = document.createElement("div");
    divHome.className = "quadro";
    divHome.id = "mainDiv";
    //Sessão Home
    var homeTitulo = document.createElement("h2");
    homeTitulo.innerText = "Home"
    var homeSubTit = document.createElement("h3");
    homeSubTit.innerText = "Você está aqui. Área para informar sobre as funções dessa ferramenta."
    divHome.appendChild(homeTitulo);
    divHome.appendChild(homeSubTit);

    //Sessão Cadastrar
    var cadTitulo = document.createElement("h2");
    cadTitulo.innerText = "Cadastrar"
    var cadSubTit = document.createElement("h3");
    cadSubTit.innerText = "Área destinada ao cadastro de pacientes/clientes."
    divHome.appendChild(cadTitulo);
    divHome.appendChild(cadSubTit);

    //Sessão Agenda
    var agendaTitulo = document.createElement("h2");
    agendaTitulo.innerText = "Agendar"
    var agSubTit = document.createElement("h3");
    agSubTit.innerText = "Área destinada ao agendamento de pacientes/clientes."
    divHome.appendChild(agendaTitulo);
    divHome.appendChild(agSubTit);

    const cel1 = document.getElementById("divID1");
    cel1.appendChild(divHome);

    //segunda coluna da home
    var divHome2 = document.createElement("div");
    divHome2.className = "quadro";
    divHome2.id = "mainDiv2";
    //Sessão Marcações
    var marcaTitulo = document.createElement("h2");
    marcaTitulo.innerText = "Marcações"
    var mrcSubTit = document.createElement("h3");
    mrcSubTit.innerText = "Área destinada a marcações de presença ou falta dos pacientes/clientes."
    divHome2.appendChild(marcaTitulo);
    divHome2.appendChild(mrcSubTit);
    //Sessão Relatório
    var relTitulo = document.createElement("h2");
    relTitulo.innerText = "Relatório"
    var relSubTit = document.createElement("h3");
    relSubTit.innerText = "Dados sobre as atividades junto aos pacientes/clientes estão disponíves."
    divHome2.appendChild(relTitulo);
    divHome2.appendChild(relSubTit);
    //Sessão Logout
    var logTitulo = document.createElement("h2");
    logTitulo.innerText = "Logout"
    var logSubTit = document.createElement("h3");
    logSubTit.innerText = "Onde o usuário sai da aplicação. Importante para impedir acesso indevido."
    divHome2.appendChild(logTitulo);
    divHome2.appendChild(logSubTit);

    const cel2 = document.getElementById("divID2");
    cel2.appendChild(divHome2);
}
function ClearForm(){
    if((clearDiv = document.getElementById("mainDiv")) != null){
        var clearDiv = document.getElementById("mainDiv");
        clearDiv.innerHTML = "";
        clearDiv.remove();
    }
    if((clearDiv = document.getElementById("mainDiv2")) != null){
        var clearDiv2 = document.getElementById("mainDiv2");
        clearDiv2.innerHTML = "";
        clearDiv2.remove();
    }
    if((clearDiv = document.getElementById("mainDiv3")) != null){
        var clearDiv3 = document.getElementById("mainDiv3");
        clearDiv3.innerHTML = "";
        clearDiv3.remove();
    }
}
function ClearForm2(){
    if((clearDiv = document.getElementById("mainDiv2")) != null){
        var clearDiv2 = document.getElementById("mainDiv2");
        clearDiv2.innerHTML = "";
        clearDiv2.remove();
    }
    if((clearDiv = document.getElementById("mainDiv3")) != null){
        var clearDiv3 = document.getElementById("mainDiv3");
        clearDiv3.innerHTML = "";
        clearDiv3.remove();
    }
}
function CadastroForm(){
    var divCadastro = document.createElement("div");
    divCadastro.className = "quadro";
    divCadastro.id = "mainDiv";
    //titulo
    var titulo = document.createElement("h2");
    titulo.innerText = "Cadastro de Paciente";
    divCadastro.appendChild(titulo);
    //input para email
    var pNome = document.createElement("p");
    pNome.innerText = "Insira o Nome";
    divCadastro.appendChild(pNome);
    var inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.id = "nomePac";
    divCadastro.appendChild(inputNome);
    //input para senha
    var pNasc = document.createElement("p");
    pNasc.innerText = "Data de Nascimento";
    divCadastro.appendChild(pNasc);
    var inputNasc = document.createElement("input");
    inputNasc.type = "date";
    inputNasc.id = "dataNasc";
    divCadastro.appendChild(inputNasc);
    var pEmail = document.createElement("p");
    pEmail.innerText = "Email";
    divCadastro.appendChild(pEmail);
    var inputEmail = document.createElement("input");
    inputEmail.type = "text";
    inputEmail.id = "emailPac";
    divCadastro.appendChild(inputEmail);

    const cel1 = document.getElementById("divID1");
    cel1.appendChild(divCadastro);

    //segunda coluna
    var divCadastro2 = document.createElement("div");
    divCadastro2.className = "quadro";
    divCadastro2.id = "mainDiv2";
    //input para telefone
    var pTel = document.createElement("p");
    pTel.innerText = "Insira o Telefone";
    divCadastro2.appendChild(pTel);
    var inputTel = document.createElement("input");
    inputTel.type = "text";
    inputTel.id = "telPac";
    divCadastro2.appendChild(inputTel);
    //input para endereço
    var pEnd = document.createElement("p");
    pEnd.innerText = "Insira o Endereço";
    divCadastro2.appendChild(pEnd);
    var inputEnd = document.createElement("input");
    inputEnd.type = "text";
    inputEnd.id = "endPac";
    divCadastro2.appendChild(inputEnd);
    //input para CPF
    var pCpf = document.createElement("p");
    pCpf.innerText = "Insira o CPF";
    divCadastro2.appendChild(pCpf);
    var inputCpf = document.createElement("input");
    inputCpf.type = "text";
    inputCpf.id = "cpfPac";
    divCadastro2.appendChild(inputCpf);
    //button cadastrar paciente
    var pButton = document.createElement("p");
    divCadastro2.appendChild(pButton);
    var buttonCad = document.createElement("button");
    buttonCad.id = "cadastro";
    buttonCad.addEventListener("click",CadastroPac);
    buttonCad.innerText = "Cadastrar"
    divCadastro2.appendChild(buttonCad);
    //resultado
    var pResult = document.createElement("div");
    pResult.id = "resultado";
    pButton.appendChild(pResult);


    const cel2 = document.getElementById("divID2");
    cel2.appendChild(divCadastro2);
    //document.body.appendChild(divCadastro);
}
function CriaAgendaForm(){
    var divCadastro = document.createElement("div");
    divCadastro.className = "quadro";
    divCadastro.id = "mainDiv";

    //titulo
    var titulo = document.createElement("h2");
    titulo.innerText = "Marcar Consulta";
    divCadastro.appendChild(titulo);
    //input para nome
    var pNome = document.createElement("p");
    pNome.innerText = "Nome do Paciente";
    divCadastro.appendChild(pNome);
    var inputList = document.createElement("input");
    inputList.setAttribute('list','paciente')
    inputList.id = "pacientes";
    inputList.name = "paciente";
    divCadastro.appendChild(inputList);
    divCadastro.appendChild(GetPacientes());
    //input para data
    var pData = document.createElement("p");
    pData.innerText = "Insira uma data";
    divCadastro.appendChild(pData);
    var inputData = document.createElement("input");
    inputData.type = "date";
    inputData.id = "data";
    divCadastro.appendChild(inputData);
    //input para hora
    var pHora = document.createElement("p");
    pHora.innerText = "Escolha o horário";
    divCadastro.appendChild(pHora);
    var inputHora = document.createElement("input");
    inputHora.type = "time";
    inputHora.id = "hora";
    divCadastro.appendChild(inputHora);

    const cel1 = document.getElementById("divID1");
    cel1.appendChild(divCadastro);

    //continuação de campos de agendamento
    var divCadastro2 = document.createElement("div");
    divCadastro2.className = "quadro";
    divCadastro2.id = "mainDiv2";
    //input para profissional
    var pProf = document.createElement("p");
    pProf.innerText = "Escolha um profissional";
    divCadastro2.appendChild(pProf);
    divCadastro2.appendChild(GetProfissionais());
    //input para procedimento
    var pProc = document.createElement("p");
    pProc.innerText = "Escolha o procedimento";
    divCadastro2.appendChild(pProc);
    divCadastro2.appendChild(GetProcedimentos());
    //input para sala/espaço da consulta
    var pSala = document.createElement("p");
    pSala.innerText = "Escolha a Sala";
    divCadastro2.appendChild(pSala);
    divCadastro2.appendChild(GetSala());
    //button
    var pButton = document.createElement("p");
    divCadastro2.appendChild(pButton);
    var buttonCad = document.createElement("button");
    buttonCad.id = "cadastro";
    buttonCad.addEventListener("click",AgendaPaciente);
    buttonCad.innerText = "Agendar";
    divCadastro2.appendChild(buttonCad);
    //resultado
    var pResult = document.createElement("p");
    pResult.id = "resultado";
    pButton.appendChild(pResult);

    const cel2 = document.getElementById("divID2");
    cel2.appendChild(divCadastro2);

}
function MarcacoesForm(){
    var divCadastro = document.createElement("div");
    divCadastro.className = "confirmaAgenda";
    divCadastro.id = "mainDiv";
    //titulo
    var titulo = document.createElement("h2");
    titulo.innerText = "Confirmar Presença";
    divCadastro.appendChild(titulo);
    divCadastro.appendChild(GetAgenda());
    //botão de confirmar
    var pButton = document.createElement("p");
    divCadastro.appendChild(pButton);
    var buttonCad = document.createElement("button");
    buttonCad.id = "confirmarAgenda";
    buttonCad.addEventListener("click",AgendaConfirma);
    buttonCad.innerText = "Confirmar Presença";
    divCadastro.appendChild(buttonCad);
    //botão de faltou
    var pButtonFaltou = document.createElement("p");
    divCadastro.appendChild(pButtonFaltou);
    var buttonFalta = document.createElement("button");
    buttonFalta.id = "faltouAgenda";
    buttonFalta.addEventListener("click",AgendaFaltou);
    buttonFalta.innerText = "Faltou a sessão";
    divCadastro.appendChild(buttonFalta);

    //resultado
    var pResult = document.createElement("p");
    pResult.id = "resultado";
    pButton.appendChild(pResult);

    const cel1 = document.getElementById("divID2");
    cel1.appendChild(divCadastro);

}
function ApinewsForm(){
    const divApinews = document.createElement("div");
    divApinews.className = "quadro";
    divApinews.id = "mainDiv";

    //titulo
    const titulo = document.createElement("h2");
    titulo.innerText = "Notícias";
    divApinews.appendChild(titulo);

    //input para assunto
    const pAssunto = document.createElement("p");
    pAssunto.innerText = "Escolha um tema para as notícias";
    divApinews.appendChild(pAssunto);
    const inputAssunto = document.createElement("input");
    inputAssunto.type = "text";
    inputAssunto.id = "assunto";
    divApinews.appendChild(inputAssunto);

    //idioma
    const pIdioma = document.createElement("p");
    pIdioma.innerText = "Escolha um idioma";
    divApinews.appendChild(pIdioma);
    const inputIdioma = document.createElement("select");
    inputIdioma.name = "idioma";
    inputIdioma.id = "idioma";
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
    const radioConteudo = document.createElement("input");
    radioConteudo.type = "radio";
    radioConteudo.id = "q";
    radioConteudo.name = "tipoPesq";
    radioConteudo.className = "radioAgenda";
    divPesq.appendChild(radioConteudo);
    const labelCont = document.createElement("label");
    labelCont.id = "contLabel";
    labelCont.for = "conteudo";
    labelCont.className = "labelApi";
    labelCont.innerText = "Pesquisar no Conteúdo";
    divPesq.appendChild(labelCont);
    const radioTitulo = document.createElement("input");
    radioTitulo.type = "radio";
    radioTitulo.id = "qInTitle";
    radioTitulo.name = "tipoPesq";
    radioTitulo.className = "radioAgenda";
    divPesq.appendChild(radioTitulo);
    const labelTit = document.createElement("label");
    labelTit.id = "tituloLabel";
    labelTit.for = "titulo";
    labelTit.className = "labelApi";
    labelTit.innerText = "Pesquisas no Título";
    divPesq.appendChild(labelTit);
    divApinews.appendChild(divPesq);

    //botão de pesquisar
    var pButton = document.createElement("p");
    divApinews.appendChild(pButton);
    var buttonPes = document.createElement("button");
    buttonPes.id = "pesquisar";
    buttonPes.addEventListener("click",PesquisaNoticia);
    buttonPes.innerText = "Pesquisar";
    divApinews.appendChild(buttonPes);

    //resultado
    var pResult = document.createElement("p");
    pResult.id = "resultado";
    divApinews.appendChild(pResult);

    const cel1 = document.getElementById("divID1");
    cel1.appendChild(divApinews);
}
function RelatorioForm(){
    var divRelatorio = document.createElement("div");
    divRelatorio.className = "quadro";
    divRelatorio.id = "mainDiv";

    //titulo
    var titulo = document.createElement("h2");
    titulo.innerText = "Relatório dos Atendimentos";
    divRelatorio.appendChild(titulo);
    //input para data inicial
    var pDtInicio = document.createElement("p");
    pDtInicio.innerText = "Data inicial";
    divRelatorio.appendChild(pDtInicio);
    var inputDataIni = document.createElement("input");
    inputDataIni.type = "date";
    inputDataIni.id = "dataIni";
    divRelatorio.appendChild(inputDataIni);
    //input para data final
    var pDtFim = document.createElement("p");
    pDtFim.innerText = "Data final";
    divRelatorio.appendChild(pDtFim);
    var inputDataFim = document.createElement("input");
    inputDataFim.type = "date";
    inputDataFim.id = "dataFim";
    divRelatorio.appendChild(inputDataFim);
    //button
    var pButton = document.createElement("p");
    divRelatorio.appendChild(pButton);
    var buttonRel = document.createElement("button");
    buttonRel.id = "relatorio";
    buttonRel.addEventListener("click",GeraRelatorio);
    buttonRel.innerText = "Gerar Relatório";
    divRelatorio.appendChild(buttonRel);

    const cel1 = document.getElementById("divID1");
    cel1.appendChild(divRelatorio);
}
function ClearResult(){
    var result = document.getElementById("resultado");
    result.innerText = "";
}

//funcções gerais
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
function Logout(){
    firebase.auth().signOut().then(function() {
        window.alert("Deslogado com sucesso!");
        location = location;
    }).catch(function(error) {
        window.alert(error);
    });
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
async function GetNews(linkApi){
    const divApi2 = document.createElement("div");
    divApi2.className = "quadro";
    divApi2.id = "mainDiv2";

    let resp = await fetch(linkApi);
    if(resp.ok){
        let json = await resp.json();
        if (json.articles.length === 0){
            ClearForm2();
            var result = document.getElementById("resultado");
            result.innerText = "Não há notícias sobre esse assunto"
            setTimeout(Apinews,4000);
        }else{
            for (let i=0; i < json.articles.length; i++){
                const link = document.createElement("a");
                link.href = json.articles[i].url;
                link.target = "_new"
                const divGeral = document.createElement("div");
                divGeral.className = "divGeral";
                link.appendChild(divGeral);

                const  divMateriaImg = document.createElement("div");
                divMateriaImg.className = "divMateriaImg";
                const materiaImg = document.createElement("img");
                materiaImg.className = "stretchy";
                if (json.articles[i].urlToImage === null){
                    materiaImg.src = "./semImg.png"
                    materiaImg.title = "matéria sem imagem";
                }else{
                    materiaImg.src = json.articles[i].urlToImage;
                    materiaImg.title = json.articles[i].title;
                }
                materiaImg.alt = "link para matéria pesquisada";
                divMateriaImg.appendChild(materiaImg);


                const  divMateriaTit = document.createElement("div");
                divMateriaTit.className = "divMateriaTit";
                const h4Name = document.createElement("h4")
                h4Name.className = "h4Name";
                h4Name.innerText = json.articles[i].source.name;
                divMateriaTit.appendChild(h4Name);
                const pTitle = document.createElement("p");
                pTitle.innerText = json.articles[i].title;
                divMateriaTit.appendChild(pTitle);

                if (i%2 === 0){
                    divGeral.appendChild(divMateriaImg);
                    divGeral.appendChild(divMateriaTit);
                }else {
                    divGeral.appendChild(divMateriaTit);
                    divGeral.appendChild(divMateriaImg);
                }

                divApi2.appendChild(link);
            }

            ClearForm2();
            const div2 = document.getElementById("divID2");
            div2.appendChild(divApi2);
            if (json.articles.length > 7){
                VoltaTopo();
            }
        }
    }
}
function VoltaTopo(){
    const link = document.createElement("a");
    link.href = "#status";
    link.target = "_self"
    const divGeral = document.createElement("div");
    divGeral.className = "divGeral clearfix";
    link.appendChild(divGeral);

    const  divMateriaImg = document.createElement("div");
    divMateriaImg.className = "divMateriaImg";
    const materiaImg = document.createElement("i");
    materiaImg.className = "fas fa-arrow-circle-up fa-5x stretchy";


    materiaImg.alt = "link para topo da página";
    materiaImg.title = "link para topo da página";
    divMateriaImg.appendChild(materiaImg);

    const  divMateriaTit = document.createElement("div");
    divMateriaTit.className = "divMateriaTit";
    const h4Name = document.createElement("h4")
    h4Name.className = "h4Name";
    h4Name.innerText = "Voltar para o topo da página";
    divMateriaTit.appendChild(h4Name);
    const pTitle = document.createElement("p");
    pTitle.innerText = "Clique aqui para retornar ao topo da página";
    divMateriaTit.appendChild(pTitle);
    divGeral.appendChild(divMateriaImg);
    divGeral.appendChild(divMateriaTit);
    const divApi2 = document.getElementById("mainDiv2");
    divApi2.appendChild(link);
}
