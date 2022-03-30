import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,

  useTheme,
  colors,
} from '@mui/material';
import { useForm, FormProvider } from "react-hook-form";

import ConfirmationDialog from '../../../../ui/components/ConfirmationDialog';
import UserDataForm from './components/UserDataForm';

import {
  UserFormData,
  UserDataSend,
} from './components/UserDataForm/types';

interface IOpenMenu {
  companiesMenu: boolean;
  usersMenu: boolean;
  tasksMenu: boolean;
  reportsMenu: boolean;
  avatarMenu: boolean;
  supportMenu: boolean;
}

const Navbar: React.FC = (props) => {
  const methods = useForm<UserFormData>({ mode: 'onBlur', reValidateMode: 'onBlur', shouldUnregister: false });
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    let controllerName = event.currentTarget.getAttribute('aria-controls') || '';
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };


  /**
   * Parte relacionada a função de mudança das informações do usuário logado
   */
  const [openUserModal, setOpenUserModal] = React.useState<boolean>(false);

  const handleClickUserModal = (event: React.MouseEvent<HTMLElement>) => {
    setOpenUserModal(true);
    handleClose(event);
  };

  const onSubmitUser = (data: UserFormData) => {
    console.log("data user", data);
    let userData: UserDataSend;

    userData = {
      new_email: data.newEmail,
      new_password: data.newPassword || "",
    };
  };

  var formRef = React.useRef<HTMLFormElement>(null);

  return (
    <Box
      sx={
        {

        }
      }
    >
      {/**
       * Componente que atualiza dados do usuário logado
       */}
      <ConfirmationDialog
        title="Seus dados"
        content={
          <FormProvider {...methods}>
            <form ref={formRef} onSubmit={methods.handleSubmit(onSubmitUser)}>
              <UserDataForm />
            </form>
          </FormProvider>
        }
        onConfirm={
          () => {
            formRef.current!.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          }
        }
        onClose={() => setOpenUserModal(false)}
        open={openUserModal}
      />

      {/**
       * Componente da barra de navegação
       */}
      <AppBar
        position="fixed"
        sx={
          {
            zIndex: theme.zIndex.drawer + 1,
          }
        }
      >
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            sx={
              {
                display: 'block',
                marginRight: theme.spacing(3),
              }
            }
          >
            viva saudável admin
          </Typography>

          <Box sx={{ flexGrow: 1, }} />

          {/**
           * Avatar e menu pessoal
           */}
          <IconButton
            aria-label="avatar"
            color="inherit"
            aria-controls="avatarMenu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Avatar
              sx={
                {
                  color: theme.palette.getContrastText(colors.deepPurple[500]),
                  backgroundColor: colors.deepPurple[500],
                  width: theme.spacing(4),
                  height: theme.spacing(4),
                  fontSize: 17,
                }
              }

            >
              JB
            </Avatar>
          </IconButton>
          <Menu
            id="avatarMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >

            <MenuItem onClick={handleClickUserModal}>Meus Dados</MenuItem>

            <MenuItem onClick={handleClose}>Sair</MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;