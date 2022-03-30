import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';

import titleInfo from './content';

const PageTitle: React.FC<React.ReactFragment> = (props) => {
  const location = useLocation();

  const matchedUrl = titleInfo.filter((item) => {
    return matchPath(item.path, location.pathname) !== null;
  });

  React.useEffect(() => {
    if (matchedUrl.length > 0)
      document.title = matchedUrl[0].title;
  }, [matchedUrl]);

  return (
    <React.Fragment>

    </React.Fragment>
  );
};

export default PageTitle;