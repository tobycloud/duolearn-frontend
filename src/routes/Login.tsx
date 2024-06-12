import { Alert, Button, Center, Container, Flex, Title } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export function LoginPage() {
  const { userSignInOAuth2 } = useAuth();
  const [errorDuringSignIn, setErrorDuringSignIn] = React.useState<
    string | null
  >(null);
  const navigate = useNavigate();
  const handleSignIn = (name: string) => async () => {
    try {
      await userSignInOAuth2(name.toLowerCase());
      navigate("/");
    } catch (error) {
      setErrorDuringSignIn((error as Error).message);
    }
  };
  return (
    <Flex justify="center" align="center" h="100vh">
      <Container p={50}>
        <Center>
          {!!errorDuringSignIn && (
            <Alert variant="light" color="red" title="Error!" mt="xl">
              {errorDuringSignIn}
            </Alert>
          )}
        </Center>
        <Center>
          <Title order={1} mb={20}>
            Login
          </Title>
        </Center>
        <Center>
          <Button display="block" mb={20} onClick={handleSignIn("discord")}>
            Login with Discord
          </Button>
        </Center>
        <Center>
          <Button display="block" mb={20} onClick={handleSignIn("google")}>
            Login with Google ( not yet )
          </Button>
        </Center>
        <Center>
          <Button display="block" mb={20} onClick={handleSignIn("github")}>
            Login with Github ( not yet )
          </Button>
        </Center>
      </Container>
    </Flex>
  );
}
