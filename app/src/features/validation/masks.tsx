// TODO: migrar para nova biblioteca. 'react-text-mask' parece estar abandonada.
// Alternativa possível: https://openbase.com/js/imask


// General Imports ==================================================================================================================================
import React, { ReactNode } from 'react';
import MaskedInput from 'react-text-mask';


// Types ============================================================================================================================================
type MaskProps = {
  inputRef?: any;
  children?: ReactNode;
};

type MaskType = (string | RegExp)[] | ((s: string) => Array<string | RegExp>);


// BASE Mask ========================================================================================================================================
function TextMaskBase(mask: MaskType, { inputRef, ...rest }: MaskProps): JSX.Element {
  React.useImperativeHandle(inputRef, () => ({
    focus: () => {
      // lógica para focar o componente de terceiro renderizado deve ser feita aqui
    },
    // ocultando o valor, por exemplo, react-stripe-elements
  }));

  return (
    <MaskedInput

      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}

      mask={mask}
      guide={false}
      {...rest}
    />
  );
};


// CPF Mask ========================================================================================================================================
export function TextMaskCpf(props: MaskProps): React.ReactElement {
  const maskCpf: MaskType = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  return TextMaskBase(maskCpf, props);
};

// Mobile Phone Mask ========================================================================================================================================
export function TextMaskCellPhone(props: MaskProps): React.ReactElement {
  const maskCpf: MaskType = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  return TextMaskBase(maskCpf, props);
};

// Phone Mask ========================================================================================================================================
export function TextMaskPhone(props: MaskProps): React.ReactElement {
  const maskCpf: MaskType = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  return TextMaskBase(maskCpf, props);
};

// CNPJ Mask ========================================================================================================================================
export function TextMaskCnpj(props: MaskProps): React.ReactElement {
  const maskCnpj: MaskType = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  return TextMaskBase(maskCnpj, props);
}

// CNPJ or CPF Mask ========================================================================================================================================
export function TextMaskCnpjOrCpf(props: MaskProps): React.ReactElement {
  const maskCnpj = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  const maskCpf: MaskType = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  const fun = (s: string) => {
    return s.replace(/[^\d]+/g, '').length !== 11 ? maskCnpj : maskCpf;
  };
  return TextMaskBase(fun, props);
};

// PIS Mask ========================================================================================================================================
export function TextMaskPis(props: MaskProps): React.ReactElement { // TODO: formato de PIS pode estar errado, deve-se testar isso com usuários antes de enviar para produção
  const maskPis: MaskType = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, '-', /\d/];
  return TextMaskBase(maskPis, props);
};

// DATE Mask =======================================================================================================================================
export function TextMaskDate(props: MaskProps): React.ReactElement {
  const maskDate: MaskType = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  return TextMaskBase(maskDate, props);
};

// COMPETENCE Mask =================================================================================================================================
export function TextMaskCompetence(props: MaskProps): React.ReactElement {
  const maskDate: MaskType = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  return TextMaskBase(maskDate, props);
};

// TIME Mask =======================================================================================================================================
export function TextMaskTime(props: MaskProps): React.ReactElement {
  const maskTime: MaskType = [/\d/, /\d/, ':', /\d/, /\d/];
  return TextMaskBase(maskTime, props);
};

// CEP Mask ========================================================================================================================================
export function TextMaskCep(props: MaskProps): React.ReactElement {
  const maskCep: MaskType = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  return TextMaskBase(maskCep, props);
};

// Credit Card Mask 0000 0000 0000 0000 ============================================================================================================
export function TextMaskCreditCard(props: MaskProps): React.ReactElement {
  const maskCreditCard: MaskType = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  return TextMaskBase(maskCreditCard, props);
};

// Credit Card CVV Mask 000 ========================================================================================================================
export function TextMaskCreditCardCvv(props: MaskProps): React.ReactElement {
  const maskCreditCardCvv: MaskType = [/\d/, /\d/, /\d/];
  return TextMaskBase(maskCreditCardCvv, props);
};

// Expiry Date Mask ================================================================================================================================
export function TextMaskExpiryDate(props: MaskProps): React.ReactElement {
  const maskExpiryDate: MaskType = [/\d/, /\d/, '/', /\d/, /\d/];
  return TextMaskBase(maskExpiryDate, props);
};