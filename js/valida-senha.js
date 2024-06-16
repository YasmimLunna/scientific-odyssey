export function validaSenha(campo){    
    const senha = campo.value;
    const letrasSenha = /[a-zA-Z]/.test(senha);
    const numerosSenha = /\d/.test(senha);

    if (!letrasSenha || !numerosSenha) {
        campo.setCustomValidity('A senha deve conter letras e números.');
    } else {
        campo.setCustomValidity('');
    }
}