export type CompanyDataReturnAPI = {
  _id: number;
  cnpj: string;
  name: string;
  fantasy_name: string;
  municipal_code: string;
  settings: {
    provider_closing_day: string | number;
  };

  tributary_info: {
    is_service: boolean;
    is_service_civil_construction: boolean;
  };

  address: {
    cep: string;
    state: string;
    city: number;
    city_name: string;
    district: string;
    street: string;
    number: string;
    complement: string;
  };
};