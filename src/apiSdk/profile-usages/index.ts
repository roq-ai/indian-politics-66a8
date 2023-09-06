import axios from 'axios';
import queryString from 'query-string';
import { ProfileUsageInterface, ProfileUsageGetQueryInterface } from 'interfaces/profile-usage';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getProfileUsages = async (
  query?: ProfileUsageGetQueryInterface,
): Promise<PaginatedInterface<ProfileUsageInterface>> => {
  const response = await axios.get('/api/profile-usages', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createProfileUsage = async (profileUsage: ProfileUsageInterface) => {
  const response = await axios.post('/api/profile-usages', profileUsage);
  return response.data;
};

export const updateProfileUsageById = async (id: string, profileUsage: ProfileUsageInterface) => {
  const response = await axios.put(`/api/profile-usages/${id}`, profileUsage);
  return response.data;
};

export const getProfileUsageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/profile-usages/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteProfileUsageById = async (id: string) => {
  const response = await axios.delete(`/api/profile-usages/${id}`);
  return response.data;
};
