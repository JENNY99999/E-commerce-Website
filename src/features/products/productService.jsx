import axios from "axios"
import { base_url } from "../../utils/baseUrl"


const fetchProducts = async (data) => {
  console.log(data)
  const response = await axios.get(`${base_url}product?${data?.brand ? `brand=${data?.brand}&&` : ""}${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${data?.sort ? `sort=${data?.sort}&&` : ""}`)
  if (response.data) {
    return response.data
  }
}

const fetchProduct = async (prodId) => {
  const response = await axios.get(`${base_url}product/${prodId}`)
  if (response.data) {
    return response.data
  }
}

const productService = {
  fetchProducts,
  fetchProduct,
}

export default productService;