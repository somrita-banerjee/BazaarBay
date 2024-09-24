import axios from 'axios';
import {
    CreateProductDTO,
    LoginRequestBodyDTO,
    LoginResponseDTO,
    ProductDTO,
    RegisterRequestBodyDTO,
    UpdateProductDTO,
} from './dto';

const API_URL = 'http://localhost:5000'; // Replace with your backend API URL

// For login
export const loginUser = async (data: LoginRequestBodyDTO) => {
    return await axios.post<LoginResponseDTO>(`${API_URL}/auth/login`, data);
};

// For registration
export const registerUser = async (data: RegisterRequestBodyDTO) => {
    return await axios.post(`${API_URL}/auth/register`, data);
};

// Get all products
export const getProducts = async () => {
    return await axios.get<ProductDTO[]>(`${API_URL}/product`);
};

// For CRUD on products
export const createProduct = async (data: CreateProductDTO) => {
    return await axios.post(`${API_URL}/product`, data);
};
export const updateProduct = async (id: string, data: UpdateProductDTO) => {
    return await axios.patch(`${API_URL}/product/${id}`, data);
};
export const deleteProduct = async (id: string) => {
    return await axios.delete(`${API_URL}/product/${id}`);
};
