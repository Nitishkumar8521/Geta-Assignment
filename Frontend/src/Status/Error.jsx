import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
export default function Error() {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Something Went Wrong, Please Refress</AlertTitle>
    </Alert>
  );
}
