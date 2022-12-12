import { Stack, Link, Button } from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';
import { AuthLayout } from '../layouts';
import { FormRegister } from './FormRegister';

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <Stack spacing={4}>
        <FormRegister />
        <Link
          as={LinkRouter}
          to="/auth/login"
          color={'blue.400'}
          textAlign="end"
        >
          Ya tienes una cuenta? Ingresar
        </Link>
      </Stack>
    </AuthLayout>
  );
};
