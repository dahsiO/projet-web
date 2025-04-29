// models/user.model.ts

export interface User {
  user_id?: number;
  first_name: string;
  last_name: string;
  role: 'client' | 'admin';
  status: 'ENABLED' | 'DISABLED';
}
