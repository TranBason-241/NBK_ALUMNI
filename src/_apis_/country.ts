import axios from 'axios';

export class CountryManager {
  // get list country
  getListCountry = () =>
    axios
      .get(`api/v1/countries`)
      .then((res) => res)
      .catch((err) => err);
}
export const manageCountry = new CountryManager();
