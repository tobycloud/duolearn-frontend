import { ActionIcon, Button, Group, Text } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconMessage,
  IconShare,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./index.module.css";

export default function PostInteractionBar({
  url,
  isComment,
}: {
  url?: string;
  isComment?: boolean;
}) {
  return (
    <Group>
      <Group wrap="nowrap" gap={0}>
        <Button className={classes.upvote} p="xs" variant="outline" radius="xl">
          <Group gap="xs">
            <IconChevronUp />
            <Text>20</Text>
          </Group>
        </Button>
        <Button
          className={classes.downvote}
          p="xs"
          variant="outline"
          radius="xl"
        >
          <IconChevronDown />
        </Button>
      </Group>
      {url ? (
        <ActionIcon
          variant="outline"
          size="lg"
          radius="xl"
          component={Link}
          to={url}
        >
          <IconMessage />
        </ActionIcon>
      ) : (
        <ActionIcon variant="outline" size="lg" radius="xl" onClick={() => {}}>
          <IconMessage />
        </ActionIcon>
      )}
      {!isComment && (
        <ActionIcon variant="outline" size="lg" radius="xl">
          <IconShare />
        </ActionIcon>
      )}
    </Group>
  );
}
