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
import { upperFirst, useToggle } from '@mantine/hooks';
import styles from './styles/login.module.scss';
import { GoogleButton } from 'components/buttons/google';
import { useUserStore } from 'stores';

interface LoginProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  terms: boolean;
}

enum LoginType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export default function LoginPage() {
  const { login, googleLogin, register } = useUserStore();

  const [type, toggle] = useToggle<LoginType>([LoginType.LOGIN, LoginType.REGISTER]);

  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      terms: false,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => {
        if (val.length <= 6) {
          return 'Password should include at least 6 characters';
        }
        if (!/[^A-Za-z0-9]/.test(val)) {
          return 'Password should include at least one special character';
        }
        return null;
      },
      terms: (val) =>
        type === LoginType.REGISTER ? (val ? null : 'You must accept terms and conditions') : null,
    },
  });

  const handleSubmit = async (values: LoginProps) => {
    if (type === LoginType.LOGIN) {
      await login(values.email, values.password);
    } else if (type === LoginType.REGISTER) {
      await register(values.email, values.password);
    }
  };

  return (
    <div className={styles?.['loginPage']}>
      <Paper radius="md" p="xl" withBorder className={styles?.['container']}>
        <h2 className={styles?.['loginPage_header']}>
          {`Welcome to Crypto Screener${type === LoginType.LOGIN ? ', login with' : ''}`}
        </h2>

        {type === LoginType.LOGIN && (
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
          onSubmit={form.onSubmit((values) => {
            form.validate();
            handleSubmit(values);
          })}
        >
          <Stack>
            {type === LoginType.REGISTER && (
              <>
                <TextInput
                  required
                  label="First Name"
                  placeholder="Satoshi"
                  value={form.values.firstName}
                  onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                  radius="md"
                />
                <TextInput
                  required
                  label="Last Name"
                  placeholder="Nakamoto"
                  value={form.values.lastName}
                  onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                  radius="md"
                />
              </>
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@gmail.com"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password}
              radius="md"
              {...form.getInputProps('password')}
            />

            {type === LoginType.REGISTER && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                {...form.getInputProps('terms')}
                error={form.errors.terms}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl" className={styles?.['loginPage_footer']}>
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === LoginType.REGISTER
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
