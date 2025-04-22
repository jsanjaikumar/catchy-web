const url = process.env.REACT_APP_API_URL;

console.log(url);

export const SIGN_UP_URL = `${url}/api/auth/register`;
export const LOGIN_URL = `${url}/api/auth/login`;
