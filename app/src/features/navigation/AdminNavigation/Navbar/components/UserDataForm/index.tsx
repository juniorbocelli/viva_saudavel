import React from 'react';
import { useFormContext } from "react-hook-form";
import {
  Grid,
  Typography,
  Box,

  useTheme,
} from '@mui/material';

import ControlledTextInput from '../../../../../../ui/components/form/ControlledTextInput';
import PasswordInput from '../../../../../../ui/components/form/ControlledTextInput';

import * as Rules from '../../../../../../features/validation/rules';

const UserDataForm: React.FC<React.ReactFragment> = (props) => {
  const methods = useFormContext();
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, }}>
      <Grid
        container
        sx={
          {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(3),
          }
        }
      >
        <Grid item md={12}>
          <ControlledTextInput
            hookForm={["firstName", methods.control, methods.formState.errors, Rules.requiredText]}
            label="Nome"
            fullWidth={true}
            defaultValue="Júnior"
            sx={
              {
                margin: theme.spacing(0),
                minWidth: 200,
              }
            }
            disabled={true}
          />
        </Grid>
      </Grid>

      <Grid
        container
        sx={
          {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(3),
          }
        }
      >
        <Grid item md={12}>
          <ControlledTextInput
            hookForm={["lastName", methods.control, methods.formState.errors, Rules.requiredText]}
            label="Sobrenome"
            fullWidth={true}
            defaultValue="Bocelli"
            sx={
              {
                margin: theme.spacing(0),
                minWidth: 200,
              }
            }
            disabled={true}
          />
        </Grid>
      </Grid>

      <Grid
        container
        sx={
          {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(3),
          }
        }
      >
        <Grid item md={12}>
          <ControlledTextInput
            hookForm={["username", methods.control, methods.formState.errors, Rules.requiredText]}
            label="Usuário"
            fullWidth={true}
            defaultValue="juniorbocelli"
            sx={
              {
                margin: theme.spacing(0),
                minWidth: 200,
              }
            }
            disabled={true}
          />
        </Grid>
      </Grid>

      <Grid
        container
        sx={
          {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(3),
          }
        }
      >
        <Grid item container>
          <Grid item md={12}>
            <ControlledTextInput
              hookForm={["newEmail", methods.control, methods.formState.errors, Rules.requiredEmailLessConfirmation]}
              label="E-mail"
              fullWidth={true}
              defaultValue="juniorbocelli@gmail.com"
              sx={
                {
                  margin: theme.spacing(0),
                  minWidth: 200,
                }
              }
            />
          </Grid>
        </Grid>

        <Grid item container>
        </Grid>
        <Typography
          variant="caption"
          sx={
            {
              marginTop: theme.spacing(0.5),
              marginBottom: -theme.spacing(1.5),
              marginLeft: theme.spacing(0.9),
            }
          }
        >
          Caso o e-mail informado seja diferente, será necessário confirmá-lo
        </Typography>
      </Grid>

      <Grid
        container
        sx={
          {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(3),
          }
        }
      >
        <Grid item container>
          <Grid item md={12}>
            <PasswordInput
              hookForm={["newPassword", methods.register, methods.formState.errors, {}]}
              label="Senha"
              sx={
                {
                  margin: theme.spacing(0),
                  minWidth: 200,
                }
              }
            />
          </Grid>
        </Grid>

        <Grid item container>
        </Grid>
        <Typography
          variant="caption"
          sx={
            {
              marginTop: theme.spacing(0.5),
              marginBottom: -theme.spacing(1.5),
              marginLeft: theme.spacing(0.9),
            }
          }
        >
          Caso queira manter a sua senha antiga, deixe este campo em branco
        </Typography>
      </Grid>
    </Box>
  );
};

export default UserDataForm;