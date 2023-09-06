import { PerformanceAssessmentInterface } from 'interfaces/performance-assessment';
import { ProfileUsageInterface } from 'interfaces/profile-usage';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PoliticianInterface {
  id?: string;
  biography: string;
  current_position: string;
  work_process: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  performance_assessment?: PerformanceAssessmentInterface[];
  profile_usage?: ProfileUsageInterface[];
  user?: UserInterface;
  _count?: {
    performance_assessment?: number;
    profile_usage?: number;
  };
}

export interface PoliticianGetQueryInterface extends GetQueryInterface {
  id?: string;
  biography?: string;
  current_position?: string;
  work_process?: string;
  user_id?: string;
}
