import fetchCompanyInfoAPI from './fetchCompanyInfoAPI';

import { IContextDataProps } from '../../../context';
import {
  CompanyDataReturnAPI,
} from '../types';

export interface IUseAPIs {
  fetchCompany: () => void;
};

export default function useAPIs(context: IContextDataProps): IUseAPIs {
  const fetchCompany = () => {
    const {
      clientCompany,
      setCompany
    } = context;

    fetchCompanyInfoAPI(clientCompany!).then((response) => {
      const data: CompanyDataReturnAPI = response.data;
      // console.log("RESPONSE => fetchCompany", response);

      setCompany({
        id: data._id,
        cnpj: data.cnpj,
        name: data.name,
        fantasyName: data.fantasy_name,
        municipalCode: data.municipal_code,
        settings: {
          providerClosingDay: data.settings.provider_closing_day,
        },

        tributaryInfo: {
          isService: data.tributary_info.is_service,
          isServiceCivilConstruction: data.tributary_info.is_service_civil_construction,
        },
        
        address: {
          cep: data.address.cep,
          state: parseInt(data.address.city.toString().slice(0, 2)),
          city: data.address.city,
          cityName: data.address.city_name,
          district: data.address.district,
          street: data.address.street,
          number: data.address.number,
          complement: data.address.complement,
        },
      });
    }).catch((error) => {
      console.error(error);
    })
  };
  return {
    fetchCompany,
  };
};