// AUTH
export const AUTH_SIGNIN = 'auth/signin';
export const AUTH_SIGNUP = 'auth/signup';

// USERS
export const GET_ALL_USERS = 'users';
export const GET_USER_BY_USERNAME = 'users/username';
export const UPLOAD_AVATAR = 'users/avatar/upload';
export const CREATE_USER = 'users';
export const DELETE_USER = 'users';
export const GET_USER_BY_ID = 'users';

// CARS
export const GET_NEWEST_CARS = 'cars/newest/cars';
export const GET_CAR_BY_SLUG = 'cars/slug';
export const SEARCH_CARS = 'cars/search/cars';
export const GET_ALL_CARS = 'cars';
export const GET_ALL_MY_CAR = 'cars/user/my-cars';
export const UPDATE_CAR_STATUS = 'cars/status';
export const DELETE_CAR = 'cars';

// STRIPE
export const CHECKOUT = 'stripe/checkout';
export const GET_SESSION_BY_ID = 'stripe/session';

// ORDERS
export const CREATE_ORDER = 'orders';

// ORDER DETAILS
export const GET_ORDER_DETAIL_BY_USER_ID = 'order-detail/user/my-orders';
export const UPDATE_ORDER_DETAIL_STATUS_BY_ID = 'order-detail/update/status';
export const UPDATE_PAYMENT_STATUS_BY_ID = 'order-detail/update/payment-status';
