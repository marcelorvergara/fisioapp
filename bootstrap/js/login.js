window.onload = function () {
    LoadLogin();
}

function LoadLogin(){
    var divLogin = document.createElement("div");
    divLogin.className = "login-page";
    var divForm = document.createElement("div");
    divForm.className = "form";
    divLogin.appendChild(divForm);
    var divLoginForm = document.createElement("div");
    var title = document.createElement("p");
    title.innerText = "CFRA\nCentro Fisioterapeutico Raphael Abreu";
    divLoginForm.appendChild(title);
    var inputUser = document.createElement("input");
    inputUser.type = "text";
    inputUser.placeholder = "Email";
    inputUser.id = "user";
    divLoginForm.appendChild(inputUser);
    var inputPass = document.createElement("input");
    inputPass.type = "password";
    inputPass.placeholder = "Senha";
    inputPass.id = "pass"
    divLoginForm.appendChild(inputPass);
    var buttonLogin = document.createElement("button");
    buttonLogin.innerText = "Login";
    buttonLogin.addEventListener("click",LoginFunc);
    divLoginForm.appendChild(buttonLogin)
    var pMessage = document.createElement("p");
    pMessage.className = "message";
    pMessage.innerText = "Esqueceu a senha?"
    var aEsqSenha = document.createElement("a");
    aEsqSenha.href = "javascript:ResetPass()";
    aEsqSenha.innerText = " Reset de senha";
    pMessage.appendChild(aEsqSenha);
    divLoginForm.appendChild(pMessage);
    var pResult = document.createElement("p");
    pResult.className = "message";
    pResult.id = "resultado"
    divLoginForm.appendChild(pResult);

    divForm.appendChild(divLoginForm);
    document.body.appendChild(divLogin);
}

function LoginFunc(){
    const email = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(function(firebaseUser) {
            window.location.href = "./home.html";
        })
        .catch(function(error) {
            document.getElementById("resultado").innerHTML = `Usuário ou senha inválido(s)`;
        });
}

function ResetPass(){
    var emailField = document.getElementById("user");
    if(emailField.value == ""){
        var result = document.getElementById("resultado");
        result.innerText = "Favor colocar o login/email no campo Email"
        result.style.color = "#EF3B3A";
    }else {
        var auth = firebase.auth();
        var emailAddress = emailField.value;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
            var result = document.getElementById("resultado");
            result.innerText = "Mensagem de email enviada para reset da senha!"
            result.style.color = "#0cb14b";
        }).catch(function(error) {
            var result = document.getElementById("resultado");
            result.innerText = error.message;
            result.style.color = "#EF3B3A";
        });
    }

}