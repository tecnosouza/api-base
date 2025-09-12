
const validateCPFCNPJ = (cpf_cnpj) => {
    // verifica se tem dados na variável, se os dados tem o tamanho necessário para CPF ou CNPJ
    if (!cpf_cnpj || cpf_cnpj.length !== 14 && cpf_cnpj.length !== 11) {
        return false;
    }

    // Se for um CNPJ
    if (cpf_cnpj.length == 14) {
        if (!cpf_cnpj) return true;

        cpf_cnpj = cpf_cnpj.replace(/[^\d]+/g, '');

        // Elimina CPF_CNPJs invalidos conhecidos
        if (
            cpf_cnpj === '00000000000000'
			|| cpf_cnpj === '11111111111111'
			|| cpf_cnpj === '22222222222222'
			|| cpf_cnpj === '33333333333333'
			|| cpf_cnpj === '44444444444444'
			|| cpf_cnpj === '55555555555555'
			|| cpf_cnpj === '66666666666666'
			|| cpf_cnpj === '77777777777777'
			|| cpf_cnpj === '88888888888888'
			|| cpf_cnpj === '99999999999999'
        ) return false;

        // Valida DVs
        let tamanho;
        let numeros;
        let digitos;
        tamanho = cpf_cnpj.length - 2;
        numeros = cpf_cnpj.substring(0, tamanho);
        digitos = cpf_cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += +numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== +digitos.charAt(0)) return false;

        tamanho += 1;
        numeros = cpf_cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += +numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== +digitos.charAt(1)) return false;

        return true;
    }

    // Se for um CPF
    if (cpf_cnpj.length == 11) {
        cpf_cnpj = cpf_cnpj.replace(/[^\d]+/g, '');

        // Elimina CPFs invalidos conhecidos
        if (
            cpf_cnpj === '00000000000'
			|| cpf_cnpj === '11111111111'
			|| cpf_cnpj === '22222222222'
			|| cpf_cnpj === '33333333333'
			|| cpf_cnpj === '44444444444'
			|| cpf_cnpj === '55555555555'
			|| cpf_cnpj === '66666666666'
			|| cpf_cnpj === '77777777777'
			|| cpf_cnpj === '88888888888'
			|| cpf_cnpj === '99999999999'
        ) return false;

        // Valida o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf_cnpj.charAt(i)) * (10 - i);
        }
        let resultado = soma % 11;
        if (resultado < 2) {
            resultado = 0;
        } else {
            resultado = 11 - resultado;
        }
        if (resultado !== parseInt(cpf_cnpj.charAt(9))) return false;

        // Valida o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf_cnpj.charAt(i)) * (11 - i);
        }
        resultado = soma % 11;
        if (resultado < 2) {
            resultado = 0;
        } else {
            resultado = 11 - resultado;
        }
        if (resultado !== parseInt(cpf_cnpj.charAt(10))) return false;

        return true;
    }
};

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validJSONArray = (input) => {
    const jsonArray = JSON.parse(JSON.stringify(input));
    return !!(Array.isArray(jsonArray));
};

module.exports = {
    validateCPFCNPJ,
    validateEmail,
    validJSONArray,
};
