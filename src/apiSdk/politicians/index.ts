import axios from 'axios';
import queryString from 'query-string';
import { PoliticianInterface, PoliticianGetQueryInterface } from 'interfaces/politician';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPoliticians = async (
  query?: PoliticianGetQueryInterface,
): Promise<PaginatedInterface<PoliticianInterface>> => {
  const response = await axios.get('/api/politicians', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPolitician = async (politician: PoliticianInterface) => {
  const response = await axios.post('/api/politicians', politician);
  return response.data;
};

export const updatePoliticianById = async (id: string, politician: PoliticianInterface) => {
  const response = await axios.put(`/api/politicians/${id}`, politician);
  return response.data;
};

export const getPoliticianById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/politicians/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePoliticianById = async (id: string) => {
  const response = await axios.delete(`/api/politicians/${id}`);
  return response.data;
};
