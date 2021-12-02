import * as GlobalRoutes from '../../globals/routes';

export type CrumbData = {
  label: string;
  url: string;
}

export type BreadCrumbsInfo = Array<{
  path: string;
  data: Array<CrumbData>;
}>;

const breadCrumbsInfo: BreadCrumbsInfo = [
  // Index
  {
    path: GlobalRoutes.SCREEN_INDEX,
    data: [
      {
        label: "Início",
        url: "#"
      }
    ],
  },
];

export default breadCrumbsInfo;