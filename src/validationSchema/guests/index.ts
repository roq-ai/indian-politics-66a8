import * as yup from 'yup';

export const guestValidationSchema = yup.object().shape({
  search_history: yup.string().nullable(),
  viewed_profiles: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
