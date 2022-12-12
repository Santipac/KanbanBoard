import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  InputGroup,
  InputRightElement,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { AuthLayout } from '../layouts';

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <AuthLayout>
      <Stack spacing={4}>
        <Box>
          <FormControl id="firstName" isRequired>
            <FormLabel>Name</FormLabel>
            <Input size="lg" type="text" />
          </FormControl>
        </Box>

        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input size="lg" type="email" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input size="lg" type={showPassword ? 'text' : 'password'} />
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
        </FormControl>
        <FormControl id="confirmedPassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>

          <Input size="lg" type={'password'} />
        </FormControl>
        <Stack spacing={10} pt={2}>
          <Button
            loadingText="Submitting"
            size="lg"
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Sign up
          </Button>
        </Stack>
        <Link
          as={LinkRouter}
          to="/auth/login"
          color={'blue.400'}
          textAlign="end"
        >
          Already a user? Login
        </Link>
      </Stack>
    </AuthLayout>
  );
};
