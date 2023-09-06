import * as yup from 'yup';

export const profileUsageValidationSchema = yup.object().shape({
  daily_usage: yup.number().integer().required(),
  weekly_usage: yup.number().integer().required(),
  monthly_usage: yup.number().integer().required(),
  politician_id: yup.string().nullable().required(),
});
