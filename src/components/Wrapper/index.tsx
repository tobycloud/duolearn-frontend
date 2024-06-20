import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../Header";
import Navbar from "../NavBar";
export function Wrapper() {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  // const dark = colorScheme === "dark";

  const [opened, { toggle }] = useDisclosure();

  const isAuth = ["/signin"].includes(window.location.pathname);

  return (
    <AppShell
      header={{ height: 70 }}
      p="md"
      navbar={{
        width: 250,
        breakpoint: "md",
        collapsed: { mobile: !opened, desktop: isAuth },
      }}
    >
      <ScrollRestoration />
      <AppShell.Header p="md">
        <Header toggle={toggle} opened={opened} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
