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

import { createProfileUsage } from 'apiSdk/profile-usages';
import { profileUsageValidationSchema } from 'validationSchema/profile-usages';
import { PoliticianInterface } from 'interfaces/politician';
import { getPoliticians } from 'apiSdk/politicians';
import { ProfileUsageInterface } from 'interfaces/profile-usage';

function ProfileUsageCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProfileUsageInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProfileUsage(values);
      resetForm();
      router.push('/profile-usages');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProfileUsageInterface>({
    initialValues: {
      daily_usage: 0,
      weekly_usage: 0,
      monthly_usage: 0,
      politician_id: (router.query.politician_id as string) ?? null,
    },
    validationSchema: profileUsageValidationSchema,
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
              label: 'Profile Usages',
              link: '/profile-usages',
            },
            {
              label: 'Create Profile Usage',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Profile Usage
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Daily Usage"
            formControlProps={{
              id: 'daily_usage',
              isInvalid: !!formik.errors?.daily_usage,
            }}
            name="daily_usage"
            error={formik.errors?.daily_usage}
            value={formik.values?.daily_usage}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('daily_usage', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Weekly Usage"
            formControlProps={{
              id: 'weekly_usage',
              isInvalid: !!formik.errors?.weekly_usage,
            }}
            name="weekly_usage"
            error={formik.errors?.weekly_usage}
            value={formik.values?.weekly_usage}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('weekly_usage', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Monthly Usage"
            formControlProps={{
              id: 'monthly_usage',
              isInvalid: !!formik.errors?.monthly_usage,
            }}
            name="monthly_usage"
            error={formik.errors?.monthly_usage}
            value={formik.values?.monthly_usage}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('monthly_usage', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<PoliticianInterface>
            formik={formik}
            name={'politician_id'}
            label={'Select Politician'}
            placeholder={'Select Politician'}
            fetcher={getPoliticians}
            labelField={'biography'}
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
              onClick={() => router.push('/profile-usages')}
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
    entity: 'profile_usage',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProfileUsageCreatePage);
