import axios from 'axios';

export class CountryManager {
  // get list country
  getListCountry = (p_size: number, p_number: number) =>
    axios
      .get(`api/v1/countries`, {
        params: {
          page_size: p_size,
          page_number: p_number + 1
        }
      })
      .then((res) => res)
      .catch((err) => err);
}
export const manageCountry = new CountryManager();
