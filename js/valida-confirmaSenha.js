export function validaConfirmaSenha(campo, senha) {
    if (campo.value !== senha) {
        campo.setCustomValidity('As senhas não coincidem.');
    } else {
        campo.setCustomValidity('');
    }
}