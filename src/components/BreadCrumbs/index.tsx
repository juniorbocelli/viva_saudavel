import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Link,

  useTheme,
} from '@mui/material';

import breadCrumbsInfo from './content';

const BreadCrumbs: React.FC<React.ReactFragment> = (props) => {
  const location = useLocation();
  const theme = useTheme();

  const matchedUrl = breadCrumbsInfo.filter((item) => {
    return matchPath(item.path, location.pathname) !== null;
  });

  return (
    <Box sx={{display: {xs: "none", sm: "block"}, pt: theme.spacing(1), pl: theme.spacing(1), pr: theme.spacing(1)}}>
      {
        matchedUrl.length > 0 &&
        <Breadcrumbs aria-label="breadcrumb">
          {
            matchedUrl[0].data.map((item, key) => {
              if (key !== matchedUrl.length - 1)
                return (
                  <Link key={key} color="inherit" href={item.url}>{item.label}</Link>
                );

              return (
                <Link
                  key={key}
                  color="textPrimary"
                  href={item.url}
                  aria-current="page"
                >
                  {item.label}
                </Link>
              );
            })
          }
        </Breadcrumbs>
      }
    </Box>
  );
}

export default BreadCrumbs;