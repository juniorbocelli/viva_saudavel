// General Imports  =================================================================================================================================
import React from 'react';
import PropTypes from 'prop-types';

// Material-UI ======================================================================================================================================
import { TextField } from '@mui/material';


// TextInput Component ==============================================================================================================================
/**
 * hookForm[name, register, errors, validate]
 *     'name' deve ser o nome do campo no formulário. Tanto 'register' quanto 'errors' dependem desse nome.
 *     'register' e 'errors' devem vir de da chamada de useForm() no formulário em que se usa react-hook-form.
 *     'validate' é a regra de validação do campo, nos moldes do react-hook-form.
 * mask: uma função nos moldes de react-text-mask
 * shrink: boolean indicando se a label deve sofrer encolhimento forçado (manual). Apenas para campos problemáticos em relação ao encolhimento automático.
 */
export default function TextInput({
  hookForm,
  mask = null,
  fullWidth = true,
  shrink = false,
  type = 'text',
  margin = 'normal',
  autoFocus = false,
  autoComplete,
  size = "small",
  inputRef=null,
  ...rest }) {
  const [name, register, errors, validate] = hookForm || [];

  return (
    <TextField
      name={hookForm ? null : rest.name}

      type={type}
      margin={margin}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      size={size}
      inputRef={inputRef}

      {...register(name, { validate: validate })}
      error={(errors ? errors[name] : rest.error) && true}
      helperText={errors ? errors[name]?.message : rest.helperText}

      InputProps={mask != null ? { inputComponent: mask, ...rest.InputProps } : rest.InputProps}

      variant="outlined"

      fullWidth={fullWidth}
      InputLabelProps={shrink ? { shrink: true, ...rest.InputLabelProps } : rest.InputLabelProps} // TODO: Workaround Material-UI + react-hook-forms por não conseguir determinar estado de preenchimento.
      {...rest}
    />
  );
}

TextInput.propTypes = {
  hookForm: PropTypes.array, // [name, register, errors, validate]
  mask: PropTypes.func,
};

TextInput.defaultProps = {
  hookForm: undefined,
  autoComplete: undefined,
};