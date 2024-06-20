import {validaSenha} from "./valida-senha.js";
import {validaConfirmaSenha} from "./valida-confirmaSenha.js";

const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");
const buttonMenu = document.querySelector('.button__menu-mobile')
const menuMobile = document.querySelector('.cabecalho__mobile')
let menuOpen = false

//adicionando evento de click ao botão de menu do mobile
buttonMenu.addEventListener('click', () => {
    menuOpen ? menuMobile.classList.add('invisible') : menuMobile.classList.remove('invisible')
    menuOpen ? buttonMenu.children[0].setAttribute('class', 'fa-solid fa-bars') : buttonMenu.children[0].setAttribute('class', 'fa-solid fa-xmark')
    menuOpen = !menuOpen
})


formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    //informações armazenadas quando todos os campos são preenchidos corretamente
    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "senha": e.target.elements["senha"].value,
        "confirmarSenha": e.target.elements["confirmarSenha"].value
    }

    // Verificar todos os campos ao submeter o formulário
    let formularioValido = true;
    camposDoFormulario.forEach((campo) => {
        verificaCampo(campo);
        if (!campo.checkValidity()) {
            formularioValido = false;
        }
    });

    // Se todos os campos são válidos, enviar os dados ao servidor
    if (formularioValido) {
        console.log("Campos preenchidos corretamente, enviando dados:", listaRespostas);
        // Falta adicionar o URL do servidor para enviar os dados
        fetch('URL_DO_SERVIDOR', {
            method: 'POST',
            body: JSON.stringify(listaRespostas),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
})

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
})

//customizando os tipos de erros
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        tooShort: "Por favor, preencha com um nome válido.",
        patternMismatch: "Por favor, preencha o nome apenas com letras."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha com um email válido.",
        tooShort: "Por favor, preencha com um e-mail válido."
    },
    senha: {
        valueMissing: "O campo de Senha não pode estar vazio.",
        typeMismatch: "Por favor, preencha com uma Senha válida.",
        tooShort: "A senha deve conter 8 dígitos.",
        customError: "A senha deve conter letras e números.",
    },
    confirmarSenha: {
        valueMissing: "O campo de Senha não pode estar vazio.",
        typeMismatch: "Por favor, preencha com uma Senha válida.",
        tooShort: "A senha deve conter 8 dígitos.",
        customError: "As senhas não coincidem."
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

//Função que verifica cada campo e trata os respectivos erros
function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');

    //validando senha
    if (campo.name === 'senha') {
        validaSenha(campo);
    }

    // Validando confirmação de senha
    if (campo.name === 'confirmarSenha') {
        const senha = document.querySelector("#senha").value;
        validaConfirmaSenha(campo, senha);
    }

    //Associando o erro ao campo específico
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}