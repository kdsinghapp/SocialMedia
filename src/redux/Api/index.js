import axios from 'axios';

//  base URL
// export const API = axios.create({
//   baseURL: 'https://loveeatsdb.com/',
// });
// export const base_url = {
//  url : 'https://loveeatsdb.com/'
// }
export const API = axios.create({
  baseURL: 'https://server-php-8-3.technorizen.com/oneTen/api',
});
export const base_url = {
 url : 'https://server-php-8-3.technorizen.com/oneTen/api'
}
// api.js
export const placeBet = async (parms) => {

  try {

    console.log('parms',parms);
    const formdata = new FormData();
    formdata.append("game_id", parms?.id);
    formdata.append("bet_amount", parms?.amount);
    formdata.append("bet_option", parms?.betNumber);
    const response = await fetch("https://server-php-8-3.technorizen.com/oneTen/api/user/userBet", {
      method: "POST",
      headers: { Authorization: `Bearer ${parms?.token}` },
      body: formdata,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error placing bet:", error);
    throw error;
  }
};
