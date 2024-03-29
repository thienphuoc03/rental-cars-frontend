// AUTH
export const AUTH_SIGNIN = 'auth/signin';
export const AUTH_SIGNUP = 'auth/signup';

// USERS
export const GET_ALL_USERS = 'users';
export const GET_USER_BY_USERNAME = 'users/username';
export const GET_USER_BY_ID = 'users';
export const GET_ALL_OWNER_REGISTRATION = 'users/register/role/owner';
export const UPLOAD_AVATAR = 'users/avatar/upload';
export const CREATE_USER = 'users';
export const DELETE_USER = 'users';
export const UPDATE_ROLE_OWNER = 'users/register/role/owner';
export const UPDATE_USER = 'users';
export const UPDATE_REQUEST_OWNER_REGISTRATION = 'users/register/role/owner';
export const UPDATE_PASSWORD = 'users/password/update';

// CARS
export const GET_NEWEST_CARS = 'cars/newest/cars';
export const GET_CAR_BY_SLUG = 'cars/slug';
export const SEARCH_CARS = 'cars/search/cars';
export const GET_ALL_CARS = 'cars';
export const GET_ALL_MY_CAR = 'cars/user/my-cars';
export const GET_CAR_BY_ID = 'cars';
export const GET_ALL_CAR_IS_RENTING = 'cars/status/renting';
export const GET_ALL_CAR_REGISTRATION = 'cars/status/get-all';
export const DELETE_CAR = 'cars';
export const UPDATE_CAR_STATUS = 'cars/status';
export const CREATE_CAR = 'cars';
export const UPDATE_CAR = 'cars';

// STRIPE
export const CHECKOUT = 'stripe/checkout';
export const GET_SESSION_BY_ID = 'stripe/session';

// ORDERS
export const GET_ALL_ORDERS = 'orders';
export const CREATE_ORDER = 'orders';
export const GET_ORDER_BY_USER_ID = 'orders';
export const GET_ORDER_BY_ID = 'orders';
export const GET_MY_ORDERS = 'orders/user/my-orders';
export const UPDATE_ORDER_STATUS_BY_ID = 'orders/update/status';
export const UPDATE_ORDER_PAYMENT_STATUS_BY_ID = 'orders/update/payment-status';

// ORDER DETAILS
export const GET_ORDER_DETAIL_BY_USER_ID = 'order-detail/user/my-orders';
export const GET_ORDER_DETAIL_BY_ID = 'order-detail';
export const UPDATE_ORDER_DETAIL_STATUS_BY_ID = 'order-detail/update/status';
export const UPDATE_PAYMENT_STATUS_BY_ID = 'order-detail/update/payment-status';
export const GET_DISABLE_DATE_BY_CAR_ID = 'order-detail/disable-date/car';

// ANALYTICS
export const GET_ANALYTICS = 'analytics';
export const GET_REVENUE_ANALYTICS = 'analytics/revenue';
export const GET_USER_TYPE_ANALYTICS = 'analytics/user-type';

// BRANDS
export const GET_BRANDS_AND_MODELS = 'car-brands/and/models';

// MODELS
export const GET_ALL_MODELS = 'car-brands';

// FEATURES
export const GET_ALL_FEATURES = 'features';

// REVIEWS
export const CREATE_REVIEW = 'reviews';
export const GET_REVIEW_BY_CAR_ID = 'reviews/car';
