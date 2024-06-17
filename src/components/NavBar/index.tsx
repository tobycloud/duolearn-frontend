import { Divider, NavLink } from "@mantine/core";
import {
  IconChartBar,
  IconEye,
  IconHome,
  IconHome2,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const communities = [
  {
    name: "First",
    url: "/c/first", // to be updated
  },
  {
    name: "Second",
    url: "/c/second",
  },
  {
    name: "Third",
    url: "/c/third",
  },
];

export default function Navbar() {
  return (
    <>
      <NavLink
        p="md"
        label="Home" // personalized
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
        component={Link}
        to="/"
      />
      <NavLink
        p="md"
        label="Popular"
        leftSection={<IconChartBar size="1rem" stroke={1.5} />}
        component={Link}
        to="/popular"
      />
      <NavLink
        p="md"
        label="All"
        leftSection={<IconEye size="1rem" stroke={1.5} />}
        component={Link}
        to="/all"
      />

      <Divider my="md" mx="lg" />

      <NavLink
        p="md"
        label="Communities"
        leftSection={<IconHome size="1rem" stroke={1.5} />}
        childrenOffset={28}
        defaultOpened
      >
        {communities.map((community) => (
          <NavLink
            key={community.name}
            p="md"
            label={community.name}
            component={Link}
            to={community.url}
          />
        ))}
      </NavLink>
    </>
  );
}
