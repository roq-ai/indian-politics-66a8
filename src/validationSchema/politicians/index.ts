import * as yup from 'yup';

export const politicianValidationSchema = yup.object().shape({
  biography: yup.string().required(),
  current_position: yup.string().required(),
  work_process: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
