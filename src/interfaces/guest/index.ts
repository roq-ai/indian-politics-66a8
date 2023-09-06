import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GuestInterface {
  id?: string;
  search_history?: string;
  viewed_profiles?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface GuestGetQueryInterface extends GetQueryInterface {
  id?: string;
  search_history?: string;
  viewed_profiles?: string;
  user_id?: string;
}
