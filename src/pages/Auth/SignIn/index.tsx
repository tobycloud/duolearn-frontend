import {
  ActionIcon,
  Alert,
  Anchor,
  Button,
  Checkbox,
  Divider,
  Flex,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/auth";
import classes from "./index.module.css";

export function SignInPage() {
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
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to DuoLearn!
        </Title>

        <Text ta="center" mt="md">
          Sign in with
        </Text>

        <Flex w="80%" align="center" justify="space-around" mt="lg" mx="auto">
          <ActionIcon
            variant="light"
            color="green"
            onClick={handleSignIn("google")}
            title="Sign in with Google"
            disabled
            w={60}
            h={60}
            radius="50%"
          >
            <IconBrandGoogle size="2.5rem" />
          </ActionIcon>
          <ActionIcon
            variant="light"
            color="#5865F2"
            onClick={handleSignIn("discord")}
            title="Sign in with Discord"
            w={60}
            h={60}
            radius="50%"
          >
            <IconBrandDiscord size="2.5rem" />
          </ActionIcon>
          <ActionIcon
            variant="light"
            color="black"
            onClick={handleSignIn("github")}
            title="Sign in with GitHub"
            disabled
            w={60}
            h={60}
            radius="50%"
          >
            <IconBrandGithub size="2.5rem" />
          </ActionIcon>
        </Flex>

        <Divider my="xl" />

        {errorDuringSignIn && (
          <Alert variant="light" color="red" title="Error!" my="md">
            {errorDuringSignIn}
          </Alert>
        )}

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Checkbox label="Keep me signed in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md">
          Sign in
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor<"a">
            href="#"
            fw={700}
            onClick={(event) => event.preventDefault()}
          >
            Register
          </Anchor>
        </Text>

        <Text ta="center" mt="md">
          <Anchor<"a">
            href="#"
            fw={700}
            onClick={(event) => event.preventDefault()}
          >
            Forgot password?
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
