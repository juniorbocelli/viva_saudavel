import React, { ReactNode } from 'react';
import {
  Box,
  Typography,

  useTheme,
} from '@mui/material';

import BreadCrumbs from '../../../../components/BreadCrumbs';
import PageTitle from '../../../../components/PageTitle';

interface IMainContentBoxProps {
  children?: ReactNode;
  primary?: string;

  hasBreadcrumb?: boolean;
  hasBrowseTitle?: boolean;
};

const MainContentBox: React.FC<IMainContentBoxProps> = (props) => {
  const theme = useTheme();

  const {
    children,
    primary,

    hasBreadcrumb,
    hasBrowseTitle,
  } = props;

  return (
    <div style={{ width: '100%', padding: 0, margin: 0 }}>
      {
        !!hasBreadcrumb && <BreadCrumbs />
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

        {children}
      </Box>
    </div>
  );
};

export default MainContentBox;