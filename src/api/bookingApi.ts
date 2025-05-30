import { OfferedService } from '../types/models';

const API_BASE = 'http://localhost:8080/api';

export const getServices = async (): Promise<OfferedService[]> => {
  const res = await fetch(`${API_BASE}/offered-services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
};
