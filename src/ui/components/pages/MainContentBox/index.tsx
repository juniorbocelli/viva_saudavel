import React from 'react';
import {
  Box,
  Typography,

  useTheme,
} from '@mui/material';

import BreadCrumbs from '../../../../components/BreadCrumbs';
import PageTitle from '../../../../components/PageTitle';
import BackDrop from '../../../../ui/components/BackDrop';
import AlertDialog from '../../../../ui/components/AlertDialog';

import useModelPageStates, { IUseModelPageState } from './states';

interface IMainContentBoxProps {
  children?: React.FC<{ modelPageStates: IUseModelPageState }>;
  primary?: string;

  hasBreadcrumb?: boolean;
  hasBrowseTitle?: boolean;

  isRenderBackDrop?: boolean;
  isRenderErrorMessages?: boolean;
};

const MainContentBox: React.FC<IMainContentBoxProps> = (props) => {
  const theme = useTheme();
  const states = useModelPageStates();

  const {
    children,
    primary,

    hasBreadcrumb,
    hasBrowseTitle,

    isRenderBackDrop,
    isRenderErrorMessages,
  } = props;

  return (
    <div style={{ width: '100%', padding: 0, margin: 0 }}>
      {
        !!hasBreadcrumb && <BreadCrumbs />
      }

      {
        !!isRenderBackDrop &&
        <BackDrop
          open={states.isQueryingAPI}
        />
      }

      {
        !!isRenderErrorMessages &&
        <AlertDialog
          open={typeof (states.errorMessage) !== "undefined"}
          content={states.errorMessage || ""}
          onClose={() => states.setErrorMessage(undefined)}
        />
      }

      {
        (typeof (hasBrowseTitle) === "undefined" ? true : hasBrowseTitle) &&
        <PageTitle />
      }

      <Box sx={{ flexGrow: 1, p: theme.spacing(2) }}>
        {
          typeof (primary) !== "undefined" &&
          <Typography
            component="h1"
            variant="h4"
            color="primary.dark"
            gutterBottom
          >
            {primary}
          </Typography>
        }

        {
          typeof (children) !== "undefined" && children({ modelPageStates: states })
        }
      </Box>
    </div>
  );
};

export default MainContentBox;