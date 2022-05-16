
// ==================================================================================================================================================
// Regras genéricas
// ==================================================================================================================================================
export const trimAll = (value: string) => value.replace(/\s+/g, ' ').replace(/^\s+|\s+$/, '');
export const required = (value: string) => (value && (trimAll(value) !== '')) || "Campo obrigatório";
export const optional = (value: string) => (value === '') || (trimAll(value) !== '') || "Campo obrigatório";



// ==================================================================================================================================================
// Regras para os campos que não dependem de outros campos (devem ser passadas como objeto para 'register', que executará cada par chave/função durante a validação)
// ==================================================================================================================================================
export const requiredText = {
  required: required,
};

export const optionalText = {
  required: optional,
};

export const optionalNumber = (min: number | undefined, max: number | undefined, integer: boolean | undefined) => {
  const validate = (value: string) => {
    let number: number;

    if (!!integer)
      if (isNaN(parseFloat(value)))
        return "Formato inválido";
      else
        number = parseFloat(value);
    else
      if (isNaN(parseInt(value)))
        return "Formato inválido";
      else
        number = parseInt(value);

    if (typeof (min) !== 'undefined' && number < min)
      return `O valor mínimo é ${min}`;

    if (typeof (max) !== 'undefined' && number > max)
      return `O valor máximo é ${min}`;
  };

  return {
    required: optional,
    validate: validate,
  }
};

export const requiredDate = {
  required: required,
  pattern: (value: string) => {
    // Verificação básica do formato da data por REGEX e obtenção dos grupos
    const d = value.match(/^(\d\d)\/(\d\d)\/(\d\d\d\d)$/);
    if (!d)
      return "Data inválida";

    // Salvando a data em 2 formatos distintos para verificação posterior
    const dISO = `${d[3]}-${d[2]}-${d[1]}`;
    const dUTC = new Date(Date.UTC(+d[3], +d[2] - 1, +d[1]));

    // Verificar se foi possível converter a data
    const dNum = dUTC.getTime();
    if (!dNum && dNum !== 0)
      return "Data inválida"; // NaN, data inválida

    // A data UTC deve retornar uma data idêntica à data ISO
    if (dUTC.toISOString().slice(0, 10) !== dISO)
      return "O formato da data é inválido"; // Algum campo com valores inválidos (mês 13, dia 32, etc)

    // Verificação final sobre validade apenas a partir de determinado ano (2000).
    return (dUTC.getUTCFullYear() >= 2000) || "O ano deve ser após 2000";
  },
};

export const optionalDate = {
  required: optional,
  pattern: (value: string) => {
    if (trimAll(value) === '') return true;

    // Verificação básica do formato da data por REGEX e obtenção dos grupos
    const d = value.match(/^(\d\d)\/(\d\d)\/(\d\d\d\d)$/);
    if (!d)
      return "Data inválida";

    // Salvando a data em 2 formatos distintos para verificação posterior
    const dISO = `${d[3]}-${d[2]}-${d[1]}`;
    const dUTC = new Date(Date.UTC(+d[3], +d[2] - 1, +d[1]));

    // Verificar se foi possível converter a data
    const dNum = dUTC.getTime();
    if (!dNum && dNum !== 0)
      return "Data inválida"; // NaN, data inválida

    // A data UTC deve retornar uma data idêntica à data ISO
    if (dUTC.toISOString().slice(0, 10) !== dISO)
      return "O formato da data é inválido"; // Algum campo com valores inválidos (mês 13, dia 32, etc)

    // Verificação final sobre validade apenas a partir de determinado ano (2000).
    return (dUTC.getUTCFullYear() >= 2000) || "O ano deve ser após 2000";
  },
};

export const requiredExpiryDate = {
  required: required,
  pattern: (value: string) => {
    // Verificação básica do formato da data por REGEX e obtenção dos grupos
    const d = value.match(/^(\d\d)\/(\d\d)$/);
    if (!d)
      return "Data inválida";
  },
  validate: (value: string) => {
    const d = value.split("/");
    // Admitindo século 21
    d[1] = '20' + String(d[1])

    // Salvando a data em 2 formatos distintos para verificação posterior
    const dISO = `${d[1]}-${d[0]}-0${1}`;
    const dUTC = new Date(Date.UTC(+d[1], +d[0] - 1, + 1));

    // Verificar se foi possível converter a data
    const dNum = dUTC.getTime();
    if (!dNum && dNum !== 0)
      return "Data inválida"; // NaN, data inválida

    // A data UTC deve retornar uma data idêntica à data ISO
    if (dUTC.toISOString().slice(0, 10) !== dISO)
      return "Data inválida"; // Algum campo com valores inválidos (mês 13, dia 32, etc)
  },
};

export const requiredMonthYear = {
  required: required,
  pattern: (value: string) => {
    // Verificação básica do formato da data por REGEX e obtenção dos grupos
    const d = value.match(/^(\d\d)\/(\d\d\d\d)$/);
    if (!d)
      return "Data inválida";
  },
  validate: (value: string) => {
    const d = value.split("/");

    // Salvando a data em 2 formatos distintos para verificação posterior
    const dISO = `${d[1]}-${d[0]}-0${1}`;
    const dUTC = new Date(Date.UTC(+d[1], +d[0] - 1, + 1));

    // Verificar se foi possível converter a data
    const dNum = dUTC.getTime();
    if (!dNum && dNum !== 0)
      return "Data inválida"; // NaN, data inválida

    // A data UTC deve retornar uma data idêntica à data ISO
    if (dUTC.toISOString().slice(0, 10) !== dISO)
      return "Data inválida"; // Algum campo com valores inválidos (mês 13, dia 32, etc)
  },
};

export const requiredCreditCard = {
  required: required,
  pattern: (value: string) => {
    // Verificação básica do formato da data por REGEX e obtenção dos grupos
    const d = value.match(/^(\d\d\d\d)\s(\d\d\d\d)\s(\d\d\d\d)\s(\d\d\d\d)$/);
    if (!d)
      return "Número de cartão de crédito inválido";
  },
};

export const requiredCreditCardCvv = {
  required: required,
  pattern: (value: string) => {
    // Verificação básica do formato da data por REGEX e obtenção dos grupos
    const d = value.match(/^(\d\d\d)$/);
    if (!d)
      return "Número CVV inválido";
  },
};

export const requiredCellPhone = {
  required: required,
  pattern: (value: string) => {
    const d = value.match(/^\((\d\d)\) (\d\d\d\d\d)-(\d\d\d\d)$/);
    if (!d)
      return "Telefone celular inválido";
  },
};

export const optionalPhone = {
  required: optional,
  pattern: (value: string) => {
    if (trimAll(value) === '') return true;

    const d = value.match(/^\((\d\d)\) (\d\d\d\d)-(\d\d\d\d)$/);
    if (!d)
      return "Telefone inválido";
  },
};

export const optionalCompetence = {
  required: optional,
  pattern: (value: string) => {
    if (trimAll(value) === '') return true;

    // Verificação básica do formato da data por REGEX e obtenção dos grupos
    const d = value.match(/^(\d\d)\/(\d\d\d\d)$/);
    if (!d)
      return "Competência inválida";
  },
  validate: (value: string) => {
    if (trimAll(value) === '') return true;

    const d = value.split("/");

    // Salvando a data em 2 formatos distintos para verificação posterior
    const dISO = `${d[1]}-${d[0]}-01`;
    const dUTC = new Date(Date.UTC(+d[1], +d[0] - 1, + 1));

    // Verificar se foi possível converter a data
    const dNum = dUTC.getTime();
    if (!dNum && dNum !== 0)
      return "Competência inválida"; // NaN, data inválida

    // A data UTC deve retornar uma data idêntica à data ISO
    if (dUTC.toISOString().slice(0, 10) !== dISO)
      return "Competência inválida"; // Algum campo com valores inválidos (mês 13, dia 32, etc)

    if ((dUTC.getUTCFullYear() > new Date().getUTCFullYear()) && (dUTC.getUTCMonth() > new Date().getUTCMonth())) {
      return "A competência não pode ser superior a atual"
    };
  },
};

export const requiredCnpj = {
  required: required,
  validate: (value: string) => {
    return validateCNPJValue(value) || "CNPJ inválido."
  },
};

export function validateCNPJValue(cnpj: string) {
  let cnpj_numbers = String(cnpj).replace(/[^\d]+/g, '');
  let invalidsList = ['00000000000000', '11111111111111', '22222222222222', '33333333333333', '44444444444444', '55555555555555', '66666666666666', '77777777777777', '88888888888888', '99999999999999']
  if (invalidsList.indexOf(cnpj_numbers) !== -1) return false;

  if (validateFirstCNPJDigit(cnpj_numbers) && validateSecondCNPJDigit(cnpj_numbers)) return true;
  return false;
};

export const requiredSelect = {
  validate: (value: string | null) => {
    if (value !== null && typeof (value) !== "undefined")
      return value.toString().trim() !== '' || 'Campo obrigatório';
    else
      return 'Campo obrigatório';
  },
};

export const requiredRadio = {
  validate: (value: string | null) => {
    if (value !== null && typeof (value) !== "undefined")
      return value.toString().trim() !== '' || 'Campo obrigatório';
    else
      return 'Campo obrigatório';
  },
};

export const requiredCheckbox = {
  validate: (value: boolean | null) => {
    if (value !== null && typeof (value) !== "undefined")
      return value || 'Campo obrigatório';
    else
      return 'Campo obrigatório';
  },
};

export const requiredFile = {
  validate: (value: any) => {
    console.log('value', value);
    if (value !== null && typeof (value) !== "undefined")
      return value || 'Campo obrigatório';
    else
      return 'Campo obrigatório';
  },
};

function validateFirstCNPJDigit(cnpj: string) {
  if (cnpj.length !== 14) {
    return false;
  };

  var weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  var counter = 0;
  for (var i = 0; i < 12; i++) {
    counter += parseInt(cnpj[i]) * weights[i];
  };

  var mod11 = counter % 11;
  var expectedFirstDigit = '0';
  if (mod11 >= 2) {
    expectedFirstDigit = (11 - mod11).toString();
  };

  if (cnpj[12] === expectedFirstDigit) {
    return true;
  };
  return false;
};

function validateSecondCNPJDigit(cnpj: string) {
  if (cnpj.length !== 14) {
    return false;
  };

  var weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  var counter = 0;
  for (var i = 0; i < 13; i++) {
    counter += parseInt(cnpj[i]) * weights[i];
  };

  var mod11 = counter % 11;
  var expectedFirstDigit = '0';
  if (mod11 >= 2) {
    expectedFirstDigit = (11 - mod11).toString();
  };

  if (cnpj[13] === expectedFirstDigit) {
    return true;
  };
  return false;
};

export const requiredEmail = {
  required: required,
  validate: {
    isEmail: (value: string) => {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const val = value.trim();

      if (!val.match(emailRegex)) {
        return "E-mail inválido";
      }
      return true;
    },
    confirmation: (value: string): boolean | string => { return true; },
  },
};

export const requiredEmailLessConfirmation = {
  required: required,
  pattern: (value: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const val = value.trim();

    if (!val.match(emailRegex)) {
      return "E-mail inválido";
    };
    return true;
  }
};

export function requiredEmailWithConfirmation(Email1: string) {
  let myObject = Object.assign({}, requiredEmail);

  myObject.validate.confirmation = (value: string) => {
    const email1 = Email1;
    return strcmp(email1, value) || "Os e-mails não conferem"
  };

  return myObject;
};

export const requiredPassword = {
  required: required,
  validate: {
    isValid: (value: string) => {
      const val = value.trim();

      if (val.length < 6) {
        return "A senha deve ter no mínimo 6 caracteres!";
      };

      if (val.replace(/\d+/g, "").length === 0) {
        return "A senha deve ter alguma letra!";
      };

      if (val.replace(/\D+/g, "").length === 0) {
        return "A senha deve ter algum número!";
      };

      return true;
    },
    confirmation: (value: string): boolean | string => { return true; }
  },
}

export function requiredPasswordWithConfirmation(Password1: string) {
  let myObject = Object.assign({}, requiredPassword);

  myObject.validate.confirmation = (value: string) => {
    const password1 = Password1;

    return strcmp(password1, value) || "As senhas não conferem";
  };

  return myObject;
};

export const requiredCpf = {
  required: required,
  validate: (value: string) => {
    return validateCPF(value) || "CPF inválido";
  },
};

export const requiredCnpjOrCpf = {
  required: required,
  validate: (value: string) => {
    if (value.replace(/[^\d]+/g, '').length === 11)
      return validateCPF(value) || "CPF inválido";

    return validateCNPJValue(value) || "CNPJ inválido.";
  },
};

export function validateCPF(cpfIn: string) {
  const cpf = cpfIn.replace(/[^\d]+/g, '');

  if (cpf === '') return false;

  // Elimina CPFs inválidos já conhecidos	
  if (cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999")
    return false;

  // Valida 1º dígito	
  let i = 0;
  let rev = 0;
  let add = 0;
  for (i = 0; i < 9; i++)
    add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11)
    rev = 0;
  if (rev !== parseInt(cpf.charAt(9)))
    return false;

  // Valida 2º dígito	
  add = 0;
  for (i = 0; i < 10; i++)
    add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11)
    rev = 0;
  if (rev !== parseInt(cpf.charAt(10)))
    return false;

  return true;
};

function strcmp(string1: string, string2: string) {
  return string1.trim() === string2.trim();
};

export function pass2(value: string, Pass1: string | null) {
  return (value && value === Pass1) || "As senhas não conferem"
};

export function email2(value: string, Email1: string | null) {
  return (value && value === Email1) || "Os e-mails não conferem"
};
