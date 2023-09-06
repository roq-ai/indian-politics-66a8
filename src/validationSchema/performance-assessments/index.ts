import * as yup from 'yup';

export const performanceAssessmentValidationSchema = yup.object().shape({
  performance_score: yup.number().integer().required(),
  demand_score: yup.number().integer().required(),
  assessment_date: yup.date().required(),
  politician_id: yup.string().nullable().required(),
});
