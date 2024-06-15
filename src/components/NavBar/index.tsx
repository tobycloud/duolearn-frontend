import { Divider, NavLink } from "@mantine/core";
import {
  IconChartBar,
  IconEye,
  IconHome,
  IconHome2,
} from "@tabler/icons-react";

export default function Navbar() {
  return (
    <>
      <NavLink
        p="md"
        label="Home"
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink
        p="md"
        label="Popular"
        leftSection={<IconChartBar size="1rem" stroke={1.5} />}
      />
      <NavLink
        p="md"
        label="All"
        leftSection={<IconEye size="1rem" stroke={1.5} />}
      />

      <Divider my="md" mx="lg" />

      <NavLink
        p="md"
        label="Communities"
        leftSection={<IconHome size="1rem" stroke={1.5} />}
        childrenOffset={28}
        defaultOpened
      >
        <NavLink label="First" />
        <NavLink label="Second" />
        <NavLink label="Third" />
      </NavLink>
    </>
  );
}
