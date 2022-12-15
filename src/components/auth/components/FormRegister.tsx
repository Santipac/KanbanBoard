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
  Link,
  Text,
  Flex,
} from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';
import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { initialRegister, yupRegister } from '../../../helpers';
import { useAuthStore } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
export const FormRegister = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { startRegisterUser } = useAuthStore();
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  return (
    <Flex flexDirection="column" gap={3}>
      <Formik
        initialValues={initialRegister}
        validationSchema={yupRegister}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          startRegisterUser(values);
          resetForm();
          navigate('/');
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Box>
              <FormControl
                id="displayName"
                isRequired
                pt="4"
                isInvalid={!!errors.displayName && touched.displayName}
              >
                <FormLabel htmlFor="displayName">Nombre</FormLabel>
                <Field
                  as={Input}
                  name="displayName"
                  size="lg"
                  type="text"
                  value={values.displayName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Text color="red.400" mt={2}>
                  <ErrorMessage name="displayName" />
                </Text>
              </FormControl>
            </Box>

            <FormControl
              id="email"
              isRequired
              pt="4"
              isInvalid={!!errors.email && touched.email}
            >
              <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
              <Field
                as={Input}
                name="email"
                size="lg"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Text color="red.400" mt={2}>
                <ErrorMessage name="email" />
              </Text>
            </FormControl>
            <FormControl
              id="password"
              isRequired
              pt="4"
              isInvalid={!!errors.password && touched.password}
            >
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <InputGroup>
                <Field
                  as={Input}
                  name="password"
                  size="lg"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputRightElement h={'full'}>
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
              <Text color="red.400" mt={2}>
                <ErrorMessage name="password" />
              </Text>
            </FormControl>
            <FormControl
              id="confirmedPassword"
              isRequired
              pt="4"
              isInvalid={
                !!errors.confirmedPassword && touched.confirmedPassword
              }
            >
              <FormLabel htmlFor="confirmedPassword">
                Repetir Contraseña
              </FormLabel>
              <Field
                as={Input}
                name="confirmedPassword"
                size="lg"
                type={'password'}
                value={values.confirmedPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Text color="red.400" mt={2}>
                <ErrorMessage name="confirmedPassword" />
              </Text>
            </FormControl>
            <Stack spacing={10} pt={4}>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Registrarse
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <Link as={LinkRouter} to="/auth/login" color={'blue.400'} textAlign="end">
        Ya tienes una cuenta? Ingresar
      </Link>
    </Flex>
  );
};
