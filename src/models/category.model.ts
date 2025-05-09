export type CategoryStatus = 'AVAILABLE' | 'UNAVAILABLE';

export interface Category {
  id: number;
  name: string;
  description: string;
  status: CategoryStatus;
}
