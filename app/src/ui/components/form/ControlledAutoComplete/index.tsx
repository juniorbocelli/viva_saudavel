import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import {
  TextField,
  InputBaseComponentProps
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import {
  Option,
  Options,
} from './type';

export interface IControlledAutoCompleteProps {
  name: string;
  label: string;
  options: Options;
  defaultValue?: string | number;

  validate?: any;
  methods: UseFormReturn<any>;

  onChange?: (e: React.ChangeEvent<{}>, item: Option | null) => void;
  value?: string | number;

  inputRef?: React.Ref<HTMLElement>
  fullWidth?: boolean;
  size?: "medium" | "small";
  className?: string;

  inputProps?: InputBaseComponentProps;
};

const ControlledAutoComplete: React.FC<IControlledAutoCompleteProps> = (props) => {
  const {
    name,
    label,
    options,
    defaultValue,

    validate,
    methods,

    onChange,
    value,  // TODO: Fazer monitoramento para estado externo

    inputRef,
    fullWidth,
    size,
    className,

    inputProps,
  } = props;

  // Encontra o label para um determinado valor
  const getLabel = (value: string): string => {
    for (let i = 0; i < options.length; i++) {
      if (options[i].value.toString() === value) {
        return options[i].label.toString();
      }
    }
    return "";
  };

  // Controla o estado interno do componente, uma vez que temos um Option com 
  // label e value (não são nativos do Autocomplete).
  const [_value, set_value] = React.useState<Option | null>(null);

  const handleChange = (e: React.ChangeEvent<{}>, item: Option | null) => {
    set_value(item);
    if (typeof (onChange) === "function") onChange(e, item);

    // Seta valor segundo o react-hoot-form
    methods.setValue(name, item ? item.value : "");
  };

  // Efeito quando temos um defaultValue para o componente
  React.useEffect(() => {
    let myLabel: string;

    if (typeof (defaultValue) !== "undefined" && defaultValue !== "") {
      myLabel = getLabel(defaultValue?.toString());
      if (myLabel !== "") {
        methods.setValue(name, defaultValue?.toString());
        set_value({
          label: myLabel,
          value: defaultValue,
        });
      } else {
        methods.setValue(name, "");
      };
    };
  }, [defaultValue]);

  // Monitoramento do valor do componente, necessário para mudanças por setValue do react-hook-form
  React.useEffect(() => {
    const newValue = methods.getValues(name);
    if (typeof (newValue) !== "undefined")
      set_value({
        label: getLabel(newValue),
        value: newValue,
      });

  }, [methods.watch(name), options]);

  return (
    <div style={{width: "100%"}}>
      <Controller
        name={name}
        rules={typeof (validate) !== "undefined" ? { validate } : {}}
        control={methods.control}

        render={
          ({ field }) => {
            const { name, onBlur: _onBlur, onChange: _onChange, value } = field;
            return (
              <Autocomplete
                options={options}
                getOptionLabel={(option) => String(option.label)}
                value={_value}
                size={size || "medium"}

                onBlur={_onBlur}

                onChange={
                  (e, value: Option | null) => {
                    _onChange(e);
                    handleChange(e, value);
                  }
                }

                className={className}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    error={methods.formState.errors[name] && true}
                    helperText={methods.formState.errors[name]?.message}
                    fullWidth={!!fullWidth}
                    inputRef={inputRef}
                    onFocus={
                      inputProps?.onFocus
                    }

                    onBlur={
                      inputProps?.onFocus
                    }
                  />
                )}
              />
            );
          }
        }
      />
    </div>
  );
};

export default ControlledAutoComplete;