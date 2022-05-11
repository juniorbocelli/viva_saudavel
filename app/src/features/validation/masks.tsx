// TODO: migrar para nova biblioteca. 'react-text-mask' parece estar abandonada.
// Alternativa possível: https://openbase.com/js/imask


// General Imports ==================================================================================================================================
import React, { ReactNode } from 'react';
import MaskedInput from 'react-text-mask';


// Types ============================================================================================================================================
type MaskProps = {
  inputRef?: Function;
  children?: ReactNode;
};

type MaskType = (string | RegExp)[] | ((s: string) => Array<string | RegExp>);


// BASE Mask ========================================================================================================================================
function TextMaskBase(mask: MaskType, { inputRef, ...rest }: MaskProps): JSX.Element {
  return (
    <MaskedInput
      {...rest}
      ref={(ref) => { inputRef && inputRef(ref ? ref.inputElement : null) }}
      mask={mask}
    />
  );
};


// CPF Mask ========================================================================================================================================
export function TextMaskCpf(props: MaskProps): JSX.Element {
  const maskCpf: MaskType = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  return TextMaskBase(maskCpf, props);
};

// Mobile Phone Mask ========================================================================================================================================
export function TextMaskCellPhone(props: MaskProps): JSX.Element {
  const maskCpf: MaskType = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  return TextMaskBase(maskCpf, props);
};

// Phone Mask ========================================================================================================================================
export function TextMaskPhone(props: MaskProps): JSX.Element {
  const maskCpf: MaskType = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  return TextMaskBase(maskCpf, props);
};

// CNPJ Mask ========================================================================================================================================
export function TextMaskCnpj(props: MaskProps): JSX.Element {
  const maskCnpj: MaskType = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  return TextMaskBase(maskCnpj, props);
}

// CNPJ or CPF Mask ========================================================================================================================================
export function TextMaskCnpjOrCpf(props: MaskProps): JSX.Element {
  const maskCnpj = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  const maskCpf: MaskType = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  const fun = (s: string) => {
    return s.replace(/[^\d]+/g, '').length !== 11 ? maskCnpj : maskCpf;
  };
  return TextMaskBase(fun, props);
};

// PIS Mask ========================================================================================================================================
export function TextMaskPis(props: MaskProps): JSX.Element { // TODO: formato de PIS pode estar errado, deve-se testar isso com usuários antes de enviar para produção
  const maskPis: MaskType = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, '-', /\d/];
  return TextMaskBase(maskPis, props);
}


// DATE Mask =======================================================================================================================================
export function TextMaskDate(props: MaskProps): JSX.Element {
  const maskDate: MaskType = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  return TextMaskBase(maskDate, props);
}

// COMPETENCE Mask =================================================================================================================================
export function TextMaskCompetence(props: MaskProps): JSX.Element {
  const maskDate: MaskType = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  return TextMaskBase(maskDate, props);
}

// TIME Mask =======================================================================================================================================
export function TextMaskTime(props: MaskProps): JSX.Element {
  const maskTime: MaskType = [/\d/, /\d/, ':', /\d/, /\d/];
  return TextMaskBase(maskTime, props);
}

// CEP Mask ========================================================================================================================================
export function TextMaskCep(props: MaskProps): JSX.Element {
  const maskTime: MaskType = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  return TextMaskBase(maskTime, props);
}

// Credit Card Mask ================================================================================================================================
export function TextMaskCreditCard(props: MaskProps): JSX.Element {
  const maskTime: MaskType = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  return TextMaskBase(maskTime, props);
}