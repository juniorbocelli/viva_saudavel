import React from 'react';
import {
  Box,
  Typography,

  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import BreadCrumbs from '../../../../components/BreadCrumbs';
import BackDrop from '../../../../ui/components/BackDrop';
import AlertDialog from '../../../../ui/components/AlertDialog';
import Footer from '../../../../ui/components/Footer';

import { useAuth } from '../../../../features/auth/context';

import {
  IsQueryingAPIState,
  DialogMessageState,
} from './types';
import * as Routes from '../../../../globals/routes';
import * as Strings from '../../../../globals/strings';

interface IMainContentBoxProps {
  children?: React.ReactNode;
  primary?: string;

  pageTitle?: string;

  hasBreadcrumb?: boolean;

  isRenderBackDrop?: boolean;
  isRenderDialogMessages?: boolean;

  isLoggedIn?: boolean;

  states?: {
    isQueryingAPI?: IsQueryingAPIState;

    dialogMessage?: DialogMessageState;
    setDialogMessage?: React.Dispatch<React.SetStateAction<DialogMessageState>>;
  };
};

const MainContentBox: React.FC<IMainContentBoxProps> = (props) => {
  const theme = useTheme();
  const auth = useAuth();
  const navigation = useNavigate();

  const {
    children,
    primary,

    pageTitle,

    hasBreadcrumb,

    isRenderBackDrop,
    isRenderDialogMessages,

    isLoggedIn,

    states,
  } = props;

  // Effects
  React.useEffect(() => {
    if (auth.isSignedIn() === false && !!isLoggedIn)
      navigation(Routes.API_CLIENT_LOGIN, { replace: true });
  }, [auth.isSignedIn()]);

  React.useEffect(() => {
    if (typeof (pageTitle) !== 'undefined')
      document.title = `${Strings.PAGE_TITLE_COMPANY_NAME}${Strings.PAGE_TITLE_SEPARATOR}${pageTitle}`;
    else
      document.title = `${Strings.PAGE_TITLE_COMPANY_NAME}`;
  }, [pageTitle]);

  const _onClose = () => {
    if (typeof (states?.setDialogMessage) !== "undefined")
      states.setDialogMessage(undefined);
  };

  return (
    <Box sx={
      {
        width: '100%',
        padding: 0,
        margin: 0,
      }
    }
    >
      <Box>
        {
          !!hasBreadcrumb && <BreadCrumbs />
        }

        {
          !isRenderBackDrop && states?.isQueryingAPI &&
          <BackDrop
            open={states.isQueryingAPI}
          />
        }

        {
          !isRenderDialogMessages && states &&
          <AlertDialog
            open={typeof (states.dialogMessage) !== "undefined"}
            title={states.dialogMessage?.title}
            content={states.dialogMessage?.message || ''}
            onClose={_onClose}
          />
        }

        <Box sx={{ flexGrow: 1, p: theme.spacing(2), minHeight: '70vh' }}>
          {
            typeof (primary) !== "undefined" &&
            <Typography
              component="h1"
              variant="h4"
              color="primary.dark"
              gutterBottom

              sx={
                {
                  fontSize: { xs: '1.4rem', md: '2.1rem' },
                  mb: { xs: theme.spacing(2), md: theme.spacing(3) },
                }
              }
            >
              {primary}
            </Typography>
          }

          {children}
        </Box>

      </Box>

      <Footer />
    </Box >
  );
};

export default MainContentBox;