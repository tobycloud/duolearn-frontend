import { Menu, rem } from "@mantine/core";
import {
  IconBookmark,
  IconDots,
  IconEyeX,
  IconFlag,
} from "@tabler/icons-react";

export default function ThreeDots() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <IconDots style={{ cursor: "pointer" }} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconFlag style={{ width: rem(14), height: rem(14) }} />}
        >
          Report
        </Menu.Item>
        <Menu.Item
          leftSection={<IconEyeX style={{ width: rem(14), height: rem(14) }} />}
        >
          Hide
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconBookmark style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Save
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
