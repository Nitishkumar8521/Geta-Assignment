import { useState, useRef, useEffect } from "react"; // Importing hooks from React for state management, references, and side effects
import { Link, useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation
import Error from "../Status/Error"; // Importing Error component to display in case of failure
import Loading from "../Status/Loading"; // Importing Loading component to show a loading state
import loginImage from "../Images/login.jpg";
import {
  useToast, // Chakra UI hook for displaying notifications
  Input,
  InputRightElement,
  InputGroup,
  Button,
  InputLeftElement,
  VStack,
  Heading,
  Box,
  Text,
  HStack,
} from "@chakra-ui/react";

import { EmailIcon } from "@chakra-ui/icons";
import { backendUrl } from "../App";

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const toast = useToast();
  const myRef = useRef(null);

  function handleFocus() {
    myRef.current.focus();
  }

  useEffect(() => {
    handleFocus();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => setShow(!show); // Toggles the visibility of the password (show/hide)

  // Function to display a toast notification based on the status
  function handleToast({ status }) {
    toast({
      title:
        status === "success" ? "Login Successfully" : "Something Went Wrong",
      description:
        status === "success"
          ? "Hi! Welcome Back."
          : "Please try After some time",
      status,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }

  // Function to handle login request
  const handleLogin = async () => {
    const payload = {
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setLoading(false);
      if (data.token) {
        localStorage.setItem("token", data.token);
        handleToast({ status: "success" });
        navigate("/welcome");
      } else {
        handleToast({ status: "error" });
      }
    } catch (error) {
      console.log(error);
      return <Error />;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      backgroundSize="cover"
      py={12}
      bgImage={`url(${loginImage})`}
      mb={2}
      height="100vh"
    >
      <VStack
        boxShadow="md"
        p="6"
        rounded="md"
        bg="#F0FFF4"
        w={["80%", "60%", "40%"]}
      >
        <Heading as="h4" size="md" bg="blue.100" p="1" borderRadius="2px">
          Login Here
        </Heading>

        {/* Email input field */}
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            color="black"
            ref={myRef}
          />
        </InputGroup>

        {/* Password input field */}
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color="black"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button
          onClick={() => {
            handleLogin(), handleToast();
          }}
        >
          Login
        </Button>
        <HStack justifyContent="flex-end" spacing={2}>
          <Text>New User?</Text>
          <Link to="/register" style={{ color: "blue", fontWeight: "bold" }}>
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Login; 