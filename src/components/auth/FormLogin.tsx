import { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  Stack,
  Text,
  Flex,
  Divider,
  Link,
} from '@chakra-ui/react';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { initialLogin, yupLogin } from '../../helpers';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useAuthStore } from '../../hooks';

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const { startLoginWithGoogle, startLoginWithEmailPassword } = useAuthStore();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialLogin}
      validationSchema={yupLogin}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        startLoginWithEmailPassword(values);
        resetForm();
        navigate('/');
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
      }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={3}>
            <FormControl id="email" isInvalid={!!errors.email && touched.email}>
              <FormLabel>Correo Eletrónico</FormLabel>
              <Field
                as={Input}
                size="lg"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Text color="red.500" mt={2}>
                <ErrorMessage name="email" />
              </Text>
            </FormControl>
            <FormControl
              id="password"
              isInvalid={!!errors.password && touched.password}
            >
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Field
                  as={Input}
                  size="lg"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputRightElement h="full">
                  <IconButton
                    bgColor="transparent"
                    _focus={{ bgColor: 'transparent' }}
                    _hover={{ bgColor: 'transparent' }}
                    aria-label="Show password"
                    icon={
                      showPassword ? (
                        <AiOutlineEye size="25px" color="#888" />
                      ) : (
                        <AiOutlineEyeInvisible size="25px" color="#888" />
                      )
                    }
                    onClick={handleShowClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Text color="red.500" mt={2}>
                <ErrorMessage name="password" />
              </Text>
            </FormControl>
          </Box>
          <Stack spacing={10}>
            <Button
              type="submit"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              mt={4}
            >
              Ingresar
            </Button>
            <Flex alignItems="center" gap={2}>
              <Divider />
              <Text fontWeight="semibold" color="gray.300">
                O
              </Text>
              <Divider />
            </Flex>
            <Button
              bgColor="whiteAlpha.900"
              variant="outline"
              colorScheme="gray"
              display="flex"
              gap={2}
              onClick={() => startLoginWithGoogle()}
            >
              <FcGoogle size="25px" />
              Iniciar Sesión
            </Button>
            <Link
              as={LinkRouter}
              to="/auth/register"
              color={'blue.400'}
              textAlign="end"
            >
              No tienes una cuenta?
            </Link>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
