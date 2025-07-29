import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import HomeImage from "../Images/home.webp";
import { backendUrl } from "../App.jsx";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const toast = useToast();
  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleWelcome = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${backendUrl}/welcome`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Welcome",
        description: response?.data?.message || "Welcome authorize user",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      navigate("/welcome");
    } catch (error) {
      toast({
        title: "Unauthorized",
        description: error.response?.data?.message || "Login required",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Stack direction="column" margin="auto">
        <Heading>Your Digital Notebook</Heading>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100vw"
          backgroundSize="cover" // Ensuring the background image covers the box
          py={12} // Padding along the y-axis (top and bottom)
          bgImage={`url(${HomeImage})`}
          bgPosition="center"
          bgRepeat="no-repeat" // Preventing the background image from repeating
          mb={2}
          height="100vh" // Setting the height to 100% of the viewport height
        >
          <ButtonGroup gap="4">
            <Button colorScheme="blackAlpha" onClick={handleRegister} w="80px">
              Register
            </Button>
            <Button colorScheme="blackAlpha" onClick={handleLogin} w="80px">
              Login
            </Button>

            <Button colorScheme="blackAlpha" onClick={handleWelcome} w="80px">
              Welcome
            </Button>
          </ButtonGroup>
        </Box>
      </Stack>
    </>
  );
}

export default Home;
