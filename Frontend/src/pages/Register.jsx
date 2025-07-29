import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, useToast } from "@chakra-ui/react";
import Loading from "../Status/Loading";
import registrationImage from "../Images/registration.jpg";

import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputRightElement,
  InputGroup,
  Button,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
import { backendUrl } from "../App";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [show, setShow] = useState(false);
  const myRef = useRef(null);

  // Function to focus the name input field when the component is mounted
  function handleFocus() {
    myRef.current.focus();
  }

  useEffect(() => {
    handleFocus();
  }, []);

  // Toggle function to show/hide the password field
  const handleClick = () => setShow(!show);

  // Function to display a success toast when the account is created
  function handleToast() {
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  }

  // Function to handle form submission and register a new user
  const handleSubmit = async () => {
    const payload = {
      name,
      email,
      password,
    };

    try {
      setLoading(true);
      await fetch(`${backendUrl}/user/register`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      setLoading(false);
      handleToast();
      navigate("/login");
    } catch (error) {
      alert(`An Error occurred ${error}`);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      width="100vw"
      backgroundSize="cover"
      py={12}
      bgImage={`url(${registrationImage})`}
      mb={2}
      height="100vh"
    >
      <Heading>Hi! Register Here</Heading>

      <VStack
        bg="#D6BCFA"
        p="5"
        w={["80%", "60%", "40%"]}
        margin="auto"
        borderRadius={10}
      >
        {/* Form control for the name input */}
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={myRef}
          />
        </FormControl>

        {/* Form control for the email input */}
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        {/* Form control for the password input */}
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}{" "}
                {/* Button to toggle password visibility */}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Submit button to trigger the handleSubmit function */}
        <Button colorScheme="blackAlpha" onClick={handleSubmit}>
          Register
        </Button>
        <HStack spacing={2}>
          <Text>Having Account?</Text>
          <Link to="/login" style={{ color: "blue", fontWeight: "bold" }}>
            login
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Register;
