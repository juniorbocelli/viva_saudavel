// General Imports  =================================================================================================================================
import React from 'react';
import PropTypes from 'prop-types';

// Material-UI ======================================================================================================================================
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from '@mui/material';


// SwitchInput Component ============================================================================================================================
export default function SwitchInput({
  hookForm = [],
  label = null,
  className = null,
  formHelperText = null,
  ...rest }) {
  const [name, register, errors, validate] = hookForm;

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Switch
            name={hookForm.length === 0 || rest.name}

            {...register(name, { validate: validate })}

            color="primary"
            {...rest}
          />
        }

        error={(errors ? errors[name] : rest.error) && true}

        //helperText={hookForm ? errors[name]?.message : rest.helperText} {/* TODO: programar FormHelperText */}
        label={label}
        className={className}
      />
      {formHelperText && <FormHelperText>{formHelperText}</FormHelperText>}
    </FormControl>
  );
};

SwitchInput.propTypes = {
  label: PropTypes.node,
};