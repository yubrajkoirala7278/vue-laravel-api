import axios from "axios";
import { displaySuccessMessage, displayErrorMessage } from "@/utils";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

// ========FETCH(GET) Product with filter==============
export const fetchProductsApi = async (productFilter = {}) => {
  try {
    const response = await api.get("products", {
      params: productFilter,
    });
    return response;
  } catch (error) {
    displayErrorMessage("Something went wrong!");
    console.log(error);
  }
};
// ===================================================

// ===============DELETE==========================
export const deleteProductApi = async (slug) => {
  try {
    const response = await api.delete(`products/${slug}`);
    displaySuccessMessage("Product deleted successfully");
  } catch (error) {
    displayErrorMessage("Something went wrong");
    console.log(error);
  }
};
// ===============================================

// =========POST(ADD PRODUCT)====================
// 'Content-Type':'application/json'
// 'Content-Type':'multipart/form-data',
export const addProductApi = async (data) => {
  try {
    const response = await api.post("products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    displaySuccessMessage(response.data.message);
    return response;
  } catch (error) {
    console.log(error);
    displayErrorMessage("Something went wrong");
  }
};
// ==============================================

// ===============Fetch single Product===========
export const fetchSingleProductsApi = async (slug) => {
  try {
    const response = await api.get(`products/${slug}`);
    return response;
  } catch (error) {
    displayErrorMessage("Something went wrong");
    console.log(error);
  }
};
// ==============================================

// =======UPDATE(PUT)============================
export const updateProductApi = async (data) => {
  try {
    const response = await api.post(`products/${data.slug}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        _method: "put",
      },
    });
    displaySuccessMessage(response.data.message);
    return response.data.product;
  } catch (err) {
    displayErrorMessage("Something went wrong!");
  }
};
// ==============================================
