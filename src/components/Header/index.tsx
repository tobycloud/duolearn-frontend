import {
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Menu,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconPlus,
  IconQuestionMark,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { useAuth } from "../../contexts/auth";
import { User } from "../../database/model";
import CreateModal from "../CreateModal";

export default function Header({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  return (
    <Flex align="center" justify="space-between">
      <Group>
        <Burger onClick={toggle} opened={opened} hiddenFrom="md" />
        {/* image the logo */}
        <Box component={Link} to="/">
          <Image src={Logo} alt="logo" />
        </Box>
      </Group>

      <Flex align="center" gap="md">
        <Flex gap="md" justify="space-between" align="center">
          <NavbarOptions />
        </Flex>

        {/* <ActionIcon
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
    </ActionIcon> */}
      </Flex>
    </Flex>
  );
}

function NavbarOptions() {
  const user = useAuth().user;
  return (
    <>
      {user ? (
        <>
          <Box visibleFrom="xs">
            <CreateMenu />
          </Box>
          <ProfileButton user={user}></ProfileButton>
        </>
      ) : (
        <>
          <Button component={Link} to="/auth/signin">
            Sign in
          </Button>
        </>
      )}
    </>
  );
}

function ProfileButton({ user }: { user: User }) {
  const { signout, getAvatar } = useAuth();
  if (!user) return <></>;
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Center>
            <Avatar src={getAvatar(user)} />
          </Center>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconSettings style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={() => signout()}
            color="red"
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

function CreateMenu() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Menu shadow="md" width={200}>
        <CreateModal opened={opened} close={close} />

        <Menu.Target>
          <Button variant="light">
            <Group>
              <IconPlus width={14} stroke={3} />
              <IconChevronDown width={14} stroke={3} />
            </Group>
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconQuestionMark width={14} />}
            onClick={open}
          >
            New question
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
