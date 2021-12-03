import React from 'react';
import { useController } from 'react-hook-form';
import PropTypes from 'prop-types';

import {
  FormHelperText,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

export default function SelectInput({
  hookForm = null,
  fullWidth = true,
  autoWidth = false,
  label = "",
  options = [],
  className = null,
  defaultValue = " ",
  onClose = null,
  ...rest
}) {
  const [name, control, errors, validate] = hookForm || [];

  const {
    field: { ref, ...inputProps }
  } = useController({
    name: name,
    control: control,
    rules: { validate },
    defaultValue: defaultValue,
  });

  return (
    <FormControl
      variant="outlined"
      size="small"
      className={className}
      fullWidth={fullWidth}

      error={(errors ? errors[name] : rest.error) && true}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        {...rest}
        {...inputProps}
        inputRef={ref}
        autoWidth={autoWidth}
        label={label}
        onClose={typeof (onClose) === "function" ? onClose : null}
      >

        {options.map((item, key) => (
          <MenuItem key={key} value={item.value} disabled={item.value === " "}>
            {item.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{errors ? errors[name]?.message : rest.helperText}</FormHelperText>
    </FormControl>
  );
};

SelectInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array
};