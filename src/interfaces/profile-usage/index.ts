import { PoliticianInterface } from 'interfaces/politician';
import { GetQueryInterface } from 'interfaces';

export interface ProfileUsageInterface {
  id?: string;
  daily_usage: number;
  weekly_usage: number;
  monthly_usage: number;
  politician_id: string;
  created_at?: any;
  updated_at?: any;

  politician?: PoliticianInterface;
  _count?: {};
}

export interface ProfileUsageGetQueryInterface extends GetQueryInterface {
  id?: string;
  politician_id?: string;
}
