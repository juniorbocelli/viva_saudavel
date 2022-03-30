export const cpfOrCnpjRegExp = /([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})|([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})/g;

export const cpfRegExp = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/g;
export const cnpjRegExp = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}/g;

export const dateRegExp = /\d{2}\/\d{2}\/\d{4}/g;

export const aliquotRegExp = /^\d{1,2},\d{2}$/g;

export const moneyRegExp = /^\d{1,3}(\.\d{3})*,\d{2}$/g;

export const integerRegExp = /^\d{1,}$/g;

export const gissServiceCode = /^\d{2}\.\d{2}$/g;

export const competenceRegExp = /^\d{2}\/\d{4}$/g;