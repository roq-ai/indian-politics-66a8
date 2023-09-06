import { PoliticianInterface } from 'interfaces/politician';
import { GetQueryInterface } from 'interfaces';

export interface PerformanceAssessmentInterface {
  id?: string;
  performance_score: number;
  demand_score: number;
  assessment_date: any;
  politician_id: string;
  created_at?: any;
  updated_at?: any;

  politician?: PoliticianInterface;
  _count?: {};
}

export interface PerformanceAssessmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  politician_id?: string;
}
