import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createPolitician } from 'apiSdk/politicians';
import { politicianValidationSchema } from 'validationSchema/politicians';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { PoliticianInterface } from 'interfaces/politician';

function PoliticianCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PoliticianInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPolitician(values);
      resetForm();
      router.push('/politicians');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PoliticianInterface>({
    initialValues: {
      biography: '',
      current_position: '',
      work_process: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: politicianValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Politicians',
              link: '/politicians',
            },
            {
              label: 'Create Politician',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Politician
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.biography}
            label={'Biography'}
            props={{
              name: 'biography',
              placeholder: 'Biography',
              value: formik.values?.biography,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.current_position}
            label={'Current Position'}
            props={{
              name: 'current_position',
              placeholder: 'Current Position',
              value: formik.values?.current_position,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.work_process}
            label={'Work Process'}
            props={{
              name: 'work_process',
              placeholder: 'Work Process',
              value: formik.values?.work_process,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/politicians')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'politician',
    operation: AccessOperationEnum.CREATE,
  }),
)(PoliticianCreatePage);
