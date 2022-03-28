import React from 'react';
import {
  Box,
  Typography,

  useTheme,
} from '@mui/material';

import BreadCrumbs from '../../../../components/BreadCrumbs';
import PageTitle from '../../../../components/PageTitle';
import BackDrop from '../../BackDrop';
import AlertDialog from '../../AlertDialog';

import {
  IsQueryingAPIState,
  ErrorMessageState,
} from './types';

interface IAdminMainContentBoxProps {
  children?: React.ReactNode;
  primary?: string;

  hasBreadcrumb?: boolean;
  hasBrowseTitle?: boolean;

  isRenderBackDrop?: boolean;
  isRenderErrorMessages?: boolean;

  states?: {
    isQueryingAPI?: IsQueryingAPIState;

    errorMessage?: ErrorMessageState;
    setErrorMessage?: React.Dispatch<React.SetStateAction<ErrorMessageState>>;
  }

};

const AdminMainContentBox: React.FC<IAdminMainContentBoxProps> = (props) => {
  const theme = useTheme();

  const {
    children,
    primary,

    hasBreadcrumb,
    hasBrowseTitle,

    isRenderBackDrop,
    isRenderErrorMessages,

    states,
  } = props;

  const _onClose = () => {
    if (typeof (states?.setErrorMessage) !== "undefined")
      states.setErrorMessage(undefined);
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
          !!isRenderBackDrop && states?.isQueryingAPI &&
          <BackDrop
            open={states.isQueryingAPI}
          />
        }

        {
          !!isRenderErrorMessages && states &&
          <AlertDialog
            open={typeof (states.errorMessage) !== "undefined"}
            content={states.errorMessage || ""}
            onClose={_onClose}
          />
        }

        {
          (typeof (hasBrowseTitle) === "undefined" ? true : hasBrowseTitle) &&
          <PageTitle />
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
    </Box >
  );
};

export default AdminMainContentBox;