import {
  Paper,
  Group,
  Divider,
  Stack,
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst } from '@mantine/hooks';
import styles from './styles/login.module.scss';
import { GoogleButton } from 'components/buttons/google';
import { useAuthStore } from 'stores';
import { useRouter } from 'next/router';
import { SignupValidation } from 'libs/types/validation';
import { useAlertMessage } from 'libs/context/alert.context';
import { updateDisplayName } from 'libs/services/user';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface LoginProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  terms: boolean;
}

enum LoginType {
  LOGIN = 'login',
  REGISTER = 'register',
}

export default function LoginPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { addAlert } = useAlertMessage();
  const { login, googleLogin, register, isLoading } = useAuthStore();

  const [isLoginForm, setIsLoginForm] = useState(true);

  useEffect(() => {
    const action = searchParams.get('action');
    setIsLoginForm(action !== 'register');
  }, [searchParams]);

  const toggleForm = () => {
    const loginFormCheck = !isLoginForm;
    setIsLoginForm(loginFormCheck);
    // Update URL without page reload
    router.replace(`${pathname}?action=${loginFormCheck ? 'login' : 'register'}`);
  };

  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      terms: false,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : SignupValidation.EMAIL),
      password: (val) => (isLoginForm ? null : validateForm(val)),
      terms: (val) => (!isLoginForm ? (val ? null : SignupValidation.TERMS) : null),
    },
  });

  const handleSubmit = async (values: LoginProps) => {
    try {
      // Login
      if (isLoginForm) {
        const response = await login(values?.email, values?.password);
        if (response?.error) {
          // Login error
          addAlert({
            type: 'error',
            color: 'red',
            variant: 'filled',
            messageBody: response?.error,
            timeout: 5000,
          });
          return;
        }
        // If login was successful, navigate and show success message
        addAlert({
          type: 'success',
          color: 'green',
          variant: 'filled',
          messageBody: 'Login successful!',
          timeout: 5000,
        });
        redirect('/');
        // Registration
      } else if (!isLoginForm) {
        const response = await register(values?.email, values?.password);
        // Handle registration errors similarly to login
        if (response?.error) {
          addAlert({
            type: 'error',
            color: 'red',
            variant: 'filled',
            messageBody: response?.error,
            timeout: 5000,
          });
          return;
        }

        // await RedisApi.setUserData(user?.uid, {
        //   email: user?.email,
        //   emailVerified: user?.emailVerified,
        //   favorites: [],
        // });

        // Update display name after successful registration
        const displayName = `${values?.firstName} ${values?.lastName}`;
        await updateDisplayName(displayName);
        // If registration was successful, navigate and show success message
        addAlert({
          type: 'success',
          color: 'green',
          variant: 'filled',
          messageBody: 'Registration successful!',
          timeout: 5000,
        });
        redirect('/verify');
      }
    } catch (error) {
      // Catch any unexpected errors
      console.error('Authentication error:', error);
      addAlert({
        type: 'error',
        color: 'red',
        variant: 'filled',
        messageBody: 'An unexpected error occurred. Please try again.',
        timeout: 5000,
      });
    }
  };

  return (
    <div className={styles?.['loginPage']}>
      <Paper radius="md" p="xl" withBorder className={styles?.['container']}>
        <h2 className={styles?.['loginPage_header']}>
          {`Welcome to CryptOwl${isLoginForm ? ', login with' : ''}`}
        </h2>
        {isLoginForm && (
          <>
            <Group grow mb="md" mt="md">
              <GoogleButton radius="xl" onClick={googleLogin}>
                Google
              </GoogleButton>
            </Group>
            <Divider label="Or continue with" labelPosition="center" my="lg" />
          </>
        )}

        <form
          onSubmit={form?.onSubmit?.((values, e) => {
            e?.preventDefault?.();
            form?.validate?.();
            handleSubmit(values);
          })}
        >
          <Stack>
            {!isLoginForm && (
              <>
                <TextInput
                  required
                  label="First Name"
                  placeholder="Satoshi"
                  value={form?.values?.firstName}
                  onChange={(event) =>
                    form?.setFieldValue?.('firstName', event?.currentTarget?.value)
                  }
                  radius="md"
                />
                <TextInput
                  required
                  label="Last Name"
                  placeholder="Nakamoto"
                  value={form?.values?.lastName}
                  onChange={(event) =>
                    form?.setFieldValue?.('lastName', event?.currentTarget?.value)
                  }
                  radius="md"
                />
              </>
            )}
            <TextInput
              required
              label="Email"
              placeholder="hello@gmail.com"
              value={form?.values?.email}
              onChange={(event) => form?.setFieldValue?.('email', event?.currentTarget?.value)}
              error={form?.errors?.email && 'Invalid email'}
              radius="md"
              {...form?.getInputProps?.('email')}
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form?.values?.password}
              onChange={(event) => form?.setFieldValue?.('password', event?.currentTarget?.value)}
              error={form?.errors?.password}
              radius="md"
              {...form?.getInputProps?.('password')}
            />
            {!isLoginForm && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form?.values?.terms}
                onChange={(event) => form?.setFieldValue?.('terms', event?.currentTarget?.checked)}
                {...form?.getInputProps?.('terms')}
                error={form?.errors?.terms}
              />
            )}
          </Stack>
          <Group justify="space-between" mt="xl" className={styles?.['loginPage_footer']}>
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggleForm()}
              size="xs"
            >
              {!isLoginForm ? 'Already have an account? Login' : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" loading={isLoading} className={styles?.['btn']}>
              {upperFirst(isLoginForm ? LoginType.LOGIN : LoginType.REGISTER)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}

/**
 * Form validation for password
 * @param formValue password
 * @returns null, unless validation fails then returns error message
 */
function validateForm(formValue: string) {
  // users must pass password validation for the following rules:
  // at least 6 characters
  if (formValue?.length <= 6) return SignupValidation.MIN_LENGTH;
  // at least one number
  if (!/[^A-Za-z0-9]/.test(formValue)) return SignupValidation.SPECIAL_CHARACTER;
  // at least one uppercase letter
  if (!/[A-Z]/.test(formValue)) return SignupValidation.UPPERCASE;
  // at least one lowercase letter
  if (!/[a-z]/.test(formValue)) return SignupValidation.LOWERCASE;
  // at least one number
  if (!/\d/.test(formValue)) return SignupValidation.NUMBER;
  return null;
}
