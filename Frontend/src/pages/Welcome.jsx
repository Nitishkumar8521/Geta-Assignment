import { Heading, HStack, Button, useToast } from "@chakra-ui/react";
import axios from 'axios'
import { backendUrl } from "../App";
import { useEffect } from "react";

const Welcome = () => {
  const toast = useToast();
  function handleToast({ status }) {
    toast({
      title: status === "success" ? "See you soon..." : "Please check console", 
      status, 
      duration: 3000, 
      isClosable: true, 
      position: "top", 
    });
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    handleToast({ status: "success" }); 
    window.location.href = "/login"; 
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

  useEffect(()=>{
    handleWelcome()
  },[])

  return (
    <HStack display='flex' justifyContent='space-around' border='2px solid black' borderRadius='5px'>
      <Heading>Welcome</Heading>
      <Button margin='5px' onClick={handleLogout} colorScheme="blue">
        LOGOUT
      </Button>
    </HStack>
  );
};

export default Welcome;
