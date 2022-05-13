// General Imports  =================================================================================================================================
import React from 'react';
import PropTypes from 'prop-types';

// Material-UI ======================================================================================================================================
import { TextField, OutlinedInput } from "@mui/material";

import { Controller } from 'react-hook-form';


// TextInput Component ==============================================================================================================================
/**
 * hookForm[name, register, errors, validate]
 *     'name' deve ser o nome do campo no formulário. Tanto 'register' quanto 'errors' dependem desse nome.
 *     'register' e 'errors' devem vir de da chamada de useForm() no formulário em que se usa react-hook-form.
 *     'validate' é a regra de validação do campo, nos moldes do react-hook-form.
 * mask: uma função nos moldes de react-text-mask
 * shrink: boolean indicando se a label deve sofrer encolhimento forçado (manual). Apenas para campos problemáticos em relação ao encolhimento automático.
 */
export default function ControlledTextInput({
  hookForm = null,
  mask = null,
  fullWidth = true,
  shrink = true,
  type = 'text',
  margin = 'normal',
  autoFocus = false,
  autoComplete = null,
  size = "small",
  inputRef = null,
  defaultValue = "",
  label = "",
  variant = "outlined",
  ...rest }) {
  const [name, control, errors, validate] = hookForm || [];

  return (
    <Controller
      name={name}

      control={control}
      rules={{ validate }}
      defaultValue={defaultValue}

      render={
        ({ field }) => {
          const { name, onBlur: _onBlur, onChange: _onChange, value: _value } = field;
          return (
            <TextField
              {...field}
              {...rest}

              autoFocus={autoFocus}

              type={type}
              margin={margin}
              autoComplete={autoComplete}
              size={size}
              inputRef={inputRef}

              onBlur={
                (e) => {
                  _onBlur(e);
                  if (typeof (rest.onBlur) !== "undefined")
                    rest.onBlur();
                }
              }

              onChange={
                (e) => {
                  _onChange(e);
                  if (typeof (rest.onChange) !== "undefined")
                    rest.onChange(e);
                }
              }

              value={typeof (rest.value) !== "undefined" ? rest.value : _value}

              error={(errors ? errors[name] : rest.error) && true}
              helperText={errors ? errors[name]?.message : rest.helperText}

              InputProps={mask != null ? { inputComponent: mask, ...rest.InputProps } : rest.InputProps}

              variant={variant}

              label={label}

              fullWidth={fullWidth}
              InputLabelProps={shrink ? { shrink: true, ...rest.InputLabelProps } : rest.InputLabelProps} // TODO: Workaround Material-UI + react-hook-forms por não conseguir determinar estado de preenchimento.
            />
          );
        }
      }
    />
  );
}

ControlledTextInput.propTypes = {
  hookForm: PropTypes.array, // [name, register, errors, validate]
  mask: PropTypes.any,
};
