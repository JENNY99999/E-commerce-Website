import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getToken = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const configHeader = {
  headers: {
    Authorization: `Bearer ${getToken?.token}`,
    Accept: "application/json",
  },
};


const register = async (user) => {
  const response = await axios.post(`${base_url}user/register`, user);
  if (response.data) {
    return response.data;
  }
};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/login`, user);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  }
};


//Cart
//Add to cart
const addProductToCart = async (product) => {
  const response = await axios.post(
    `${base_url}user/cart`,
    product,
    configHeader
  );
  if (response.data) {
    return response.data;
  }
};


//Get a user cart
const getCart = async () => {
  const response = await axios.get(
    `${base_url}user/cart`,
    configHeader
  );
  if (response.data) {
    return response.data;

  }
};


//Remove item from cart
const removeCartItem = async (cartItemId) => {
  console.log(cartItemId);
  const response = await axios.delete(
    `${base_url}user/delete-cart-product/${cartItemId}`,
    configHeader
  );
  if (response.data) {
    return response.data;
  }
};


const updateCartQuantity = async (cartDetail) => {
  const response = await axios.put(
    `${base_url}user/update-quantity/${cartDetail.cartItemId}/${cartDetail.quantity}`, "",
    configHeader
  );
  if (response.data) {
    return response.data;
  }
};

//Order
const createOrder = async (orderDetail) => {
  const response = await axios.post(`${base_url}user/cart/cash-order`, orderDetail, configHeader)
  if (response.data) {
    return response.data;
  }
}

const userOrders = async () => {
  const response = await axios.get(`${base_url}user/getmyorders`, configHeader)
  if (response.data) {
    return response.data;
  }
}

const updateAUser = async (userData) => {
  const response = await axios.put(`${base_url}user/update-user`, userData, configHeader)
  if (response.data) {
    return response.data;
  }
}

const forgotAPassword = async (email) => {
  const response = await axios.post(`${base_url}user/forgot-password-token`, email)
  if (response.data) {
    return response.data;
  }
}

const changeAPassword = async (data) => {
  const response = await axios.put(`${base_url}user/reset-password/${data.token}`, { password: data?.password })
  if (response.data) {
    return response.data;
  }
}

const emptyCart = async () => {
  const response = await axios.delete(`${base_url}user/emptycart`, configHeader)
  console.log('Response from emptyCart:', response);

  if (response.data) {
    return response.data;
  }
}

const authService = {
  register,
  login,
  addProductToCart,
  getCart,
  removeCartItem,
  updateCartQuantity,
  createOrder,
  userOrders,
  updateAUser,
  forgotAPassword,
  changeAPassword,
  emptyCart,
};

export default authService;