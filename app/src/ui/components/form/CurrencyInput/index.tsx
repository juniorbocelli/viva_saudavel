import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import ControlledTextInput from '../ControlledTextInput';
import * as MaksApply from '../../../../features/validation/maskApply';

export interface ICurrencyInputProps {
  name: string;
  label: string;

  placeholder?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  className?: string;
  size?: "small" | "medium";
  ref?: React.Ref<HTMLInputElement>;

  // Para executar efeitos com onChange
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Caso em que se deseja um controle com estado do componente pai
  state?: {
    value: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
  }

  setValue?: () => void;

  methods: UseFormReturn<any>;
  validate?: any;

  inputProps?: Object;
};

const CurrencyInput: React.FC<ICurrencyInputProps> = (props) => {
  const {
    name,
    label,

    placeholder,
    defaultValue,
    fullWidth,
    className,
    size,
    ref,

    onChange,

    state,
    setValue,

    methods,
    validate,

    inputProps,
  } = props;

  // const [_value, set_value] = React.useState(MaksApply.maskMoney(defaultValue || ""));

  // - Vai setar o valor inicial do campo;
  // Para o componente controlado monitoramos ações de setValue. Para os não controlados, devemos monitorar
  // o valor atual do estado para então alteramos o valor do campo com setValue.
  React.useEffect(() => {
    if (typeof (state) === "undefined") { // Componente não controlado
      // set_value(typeof (defaultValue) !== "undefined" ? MaksApply.maskMoney(defaultValue) : "");
      if (typeof (defaultValue) !== "undefined")
        methods.setValue(name, MaksApply.maskMoney(defaultValue));
    } else {  // Componente controlado
      if (state.value !== "")
        methods.setValue(name, MaksApply.maskMoney(state.value));
      if (typeof (state.setValue) !== "undefined") state.setValue(MaksApply.maskMoney(state.value));
    };
  }, [state?.value]);

  // Quando o componente é controlado, devemos monitorar seu valor par podermos atualizar o estado a cada mudança
  React.useEffect(() => {
    if (typeof (state) !== "undefined") {
      // Altera o estado caso seja enviado a função que altera o estado
      if (typeof (state.setValue) !== "undefined")
        state.setValue(MaksApply.maskMoney(methods.getValues(name)));

      // Executa uma função qualquer, caso tenha sido enviada
      if (typeof (setValue) !== "undefined")
        setValue();
    };

  }, [methods.watch(name)]);

  return (
    <ControlledTextInput
      hookForm={[name, methods.control, methods.formState.errors, validate]}
      label={label}
      placeholder={placeholder}
      fullWidth={!!fullWidth}
      size={size || "small"}

      value={typeof (state) !== "undefined" ? state.value : undefined}
      onChange={
        (e: React.ChangeEvent<HTMLInputElement>) => {
          if (typeof (state) !== "undefined")
            if (typeof (state.setValue) !== "undefined") state.setValue(MaksApply.maskMoney(e.target.value));

          methods.setValue(name, MaksApply.maskMoney(e.target.value));

          if (typeof (onChange) !== "undefined") onChange(e);
        }
      }

      className={className}
      inputRef={ref}

      inputProps={inputProps}
    />
  );
};

export default CurrencyInput;