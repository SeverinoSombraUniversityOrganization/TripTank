import axios from 'axios';
import BACKEND_API_URL from '../config/backendApiUrlConfig';

class BaseEntityService {
    constructor(entityName) {
        this.entityName = entityName;
        this.baseUrl = BACKEND_API_URL;
    }

    async getList(userToken = null) {
        try {
            const response = await axios.get(`${this.baseUrl}/${this.entityName}/list`, {
                headers: {
                    Authorization: `Bearer ${userToken}` 
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getById(id, userToken = null) {
        try {
            const response = await axios.get(`${this.baseUrl}/${this.entityName}/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}` 
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async create(data, userToken = null) {
        try {
            const response = await axios.post(`${this.baseUrl}/${this.entityName}/create`, data, {
                headers: {
                    Authorization: `Bearer ${userToken}` 
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data, userToken = null) {
        try {
            const response = await axios.put(`${this.baseUrl}/${this.entityName}/update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${userToken}` 
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(id, userToken = null) {
        try {
            const response = await axios.delete(`${this.baseUrl}/${this.entityName}/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}` 
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BaseEntityService;
