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

import { Controller } from 'react-hook-form';


// SwitchInput Component ============================================================================================================================
export default function ControlledSwitchInput({
  hookForm = [],
  label = null,
  className = null,
  formHelperText = null,
  defaultValue = false,
  handleChange = null,
  ...rest }) {
  const [name, control, errors, validate] = hookForm;

  return (
    <Controller
      name={hookForm.length !== 0 ? name : rest.name}

      control={control}
      rules={{ validate }}
      defaultValue={defaultValue}

      render={({ field }) =>
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                {...rest}
                {...field}
                color="primary"
                checked={field.value}
                onChange={
                  (e) => {
                    field.onChange(e);
                    if (typeof (handleChange) === "function") handleChange(e);
                  }
                }
              />
            }
            label={label}
            className={className}
          />
          {errors && <FormHelperText error={true}>{errors[name]?.message}</FormHelperText>}
          {formHelperText && <FormHelperText>{formHelperText}</FormHelperText>}
        </FormControl>
      }
    />
  );
};

ControlledSwitchInput.propTypes = {
  label: PropTypes.node,
};