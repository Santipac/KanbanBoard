import { useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { AuthLayout } from '../layouts';
import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Link,
  Button,
  InputGroup,
  InputRightElement,
  Flex,
  Divider,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <AuthLayout>
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input size="lg" type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              size="lg"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
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
        </FormControl>
        <Stack spacing={10}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Sign in
          </Button>
          <Flex alignItems="center" gap={2}>
            <Divider />
            <Text fontWeight="semibold" color="gray.300">
              Or
            </Text>
            <Divider />
          </Flex>
          <Button
            bgColor="whiteAlpha.900"
            variant="outline"
            colorScheme="gray"
            display="flex"
            gap={2}
          >
            <FcGoogle size="25px" />
            Sign in With Google
          </Button>
        </Stack>
        <Link
          as={LinkRouter}
          to="/auth/register"
          color={'blue.400'}
          textAlign="end"
        >
          Register Now
        </Link>
      </Stack>
    </AuthLayout>
  );
};
