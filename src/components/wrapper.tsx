import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Menu,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconMoonStars,
  IconSettings,
  IconSun,
  IconTrash,
} from "@tabler/icons-react";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { CreateModal } from "./CreateModal";
import { useAuth } from "../contexts/auth";
import { User } from "../database/model";
export function Wrapper() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          desktop: !opened,
          mobile: !opened,
        },
      }}
      padding="md"
    >
      <ScrollRestoration />
      <AppShell.Header p="md">
        <Flex align="center" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* image the logo */}
          <Box component={Link} to="/" visibleFrom="sm">
            <Image src={Logo} alt="logo" />
          </Box>

          <Flex align="center" gap="md">
            <Flex
              visibleFrom="sm"
              gap="md"
              justify="space-between"
              align="center"
            >
              <NavbarOptions opened={opened} toggle={toggle}></NavbarOptions>
            </Flex>

            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? (
                <IconSun size="1.1rem" />
              ) : (
                <IconMoonStars size="1.1rem" />
              )}
            </ActionIcon>
          </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {opened && (
          <Container>
            <NavbarOptions opened={opened} toggle={toggle}></NavbarOptions>
          </Container>
        )}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

function NavbarOptions({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const user = useAuth().user;
  return (
    <>
      {user ? (
        <>
          <CreateModal></CreateModal>
          <ProfileButton opened={opened} user={user}></ProfileButton>
        </>
      ) : (
        <>
          <Box component={Link} to="/login">
            <Button onClick={() => opened && toggle()}>Login / Signup</Button>
          </Box>
        </>
      )}
    </>
  );
}

function ProfileButton({ opened, user }: { opened: boolean; user: User }) {
  const { logout, getAvatar } = useAuth();
  if (!user) return <></>;
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Center>
            <Avatar
              src={getAvatar(user)}
              {...(opened ? { my: 10 } : { mx: 10 })}
            />
          </Center>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            leftSection={
              <IconSettings style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
          >
            <Button variant="transparent" onClick={() => logout()}>
              Logout
            </Button>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
