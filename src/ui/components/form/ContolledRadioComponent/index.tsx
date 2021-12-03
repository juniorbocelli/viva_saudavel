import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

export type Data = {
  label: string;
  value: string;

  color?: "default" | "primary" | "secondary";
  classe?: string;
};

export interface IControlledRadioComponentProps {
  name: string;
  defaultValue?: string;
  label?: string;
  options: Array<Data>;
  labelPlacement?: "top" | "start" | "bottom" | "end";
  row?: boolean;

  // Valor para o caso de componente controladio
  value?: string | null;

  validate?: any;

  methods: UseFormReturn<any>;

  // Executa quando o quando é alterado manualmente
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | undefined) => void;
};

const ControlledRadioComponent: React.FC<IControlledRadioComponentProps> = (props) => {
  const {
    name,
    label,
    defaultValue,
    options,
    labelPlacement,
    row,

    value,

    validate,

    methods,

    onChange,
  } = props;

  // Quando monta o componente, temos de usar o setValue do react-hook-form para setar o valor inicial;
  // Também já monitoramos o estado externo no campo para aturalizar o setValue.
  React.useEffect(() => {
    if (typeof (value) !== "undefined")
      methods.setValue(name, value);
  }, [value]);

  const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof (onChange) !== "undefined") onChange(event);
  };

  return (
    <React.Fragment>
      <Controller
        rules={typeof (validate) !== "undefined" ? { validate } : {}}
        control={methods.control}
        defaultValue={defaultValue}
        name={name}
        render={({ field }) => {
          const { name, onBlur: _onBlur, onChange: _onChange, value: _value } = field;
          return (
            <FormControl component="fieldset" error={methods.formState.errors[name] && true}>
              {
                label &&
                <FormLabel component="legend">{label}</FormLabel>
              }
              <RadioGroup
                row={!!row}
                value={
                  typeof (value) === "undefined" ? _value : value
                }
                onBlur={_onBlur}
                onChange={
                  (event) => {
                    _onChange(event);
                    _handleChange(event);
                  }
                }
              >
                {
                  options.map((item, key) =>
                    <FormControlLabel
                      key={`item_${key}`}
                      value={item.value}
                      control={<Radio color={item.color} className={item.classe} />}
                      label={item.label}
                      labelPlacement={labelPlacement}
                    />
                  )
                }
              </RadioGroup>

              <FormHelperText>{methods.formState.errors[name]?.message}</FormHelperText>
            </FormControl>
          );
        }}
      />
    </React.Fragment>
  );
};

export default ControlledRadioComponent;