const url = process.env.REACT_APP_API_URL;

export const SIGN_UP_URL = `${url}/api/auth/register`;
export const LOGIN_URL = `${url}/api/auth/login`;
export const DONATE_FOOD_URL = `${url}/api/food/add`;
export const GET_FOOD_LISTINGS_URL = `${url}/api/food/available`;
export const GET_VOLUNTEER_URL = `${url}/api/food/assignments`;
export const GET_MY_REQUESTS_URL = `${url}/api/food/my-requests`;
export const GET_DONATIONS_URL = `${url}/api/food/my-donations`;
export const DELIVERED_URL = `${url}/api/food/deliver`;
export const POST_FOOD_REQUEST_URL = `${url}/api/food/request`;
