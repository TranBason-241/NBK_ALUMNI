import axios from 'axios';

export class LoginManager {
  // get list student
  createLogin = (tokenId: string) => {
    const data = {
      token: tokenId
    };
    return axios
      .post('/api/v1/login', data)
      .then((response) => response)
      .catch((err) => err);
  };
}
export const managerLogin = new LoginManager();
