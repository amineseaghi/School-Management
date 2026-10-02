import axios from "axios";
import { axiosClient } from "#api/axios.js";

const StudentApi = {
    getCsrfToken: async () => {
        return await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true
        });
    },

    login: async (email, password) => {
        return await axiosClient.post('/login', { email, password });
    },

    getUser: async () => {
        return await axiosClient.get('/user');
    }
};

export default StudentApi;

