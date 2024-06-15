import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Flex,
  Group,
  Text,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconMessage,
  IconShare,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { usePocketBase } from "../../contexts/pocketbase";
import { Comment, User } from "../../database/model";
import ThreeDots from "../ThreeDots";

export function CommentCard({ comment }: { comment: Comment }) {
  const pocketbase = usePocketBase();
  const [commentAuthor, setCommentAuthor] = useState<User>({
    avatar: "",
    created: "",
    email: "",
    emailVisibility: false,
    id: "",
    name: "",
    posts: [],
    updated: "",
    username: "",
    verified: false,
  });

  useEffect(() => {
    if (!comment) return;

    pocketbase
      .collection<User>("users")
      .getOne(comment.author, { requestKey: null }) // without requestkey null, some comments with the same author will not have the author's username displayed
      .then((user: User) => {
        setCommentAuthor(user);
      });
  }, [pocketbase, comment]);

  if (!comment) return null;

  return (
    <Card w="100%" shadow="sm" radius="md" mb="xl" display="flex" withBorder>
      <Card.Section>
        <Flex m="md" direction="column">
          <Flex justify="space-between">
            <Group>
              <Avatar />

              <div style={{ flex: 1 }}>
                <Text fw={500}>{commentAuthor.username}</Text>

                <Text c="dimmed" size="xs">
                  10 minutes ago
                </Text>
              </div>
            </Group>
            <ThreeDots />
          </Flex>
          <Text
            dangerouslySetInnerHTML={{
              __html: comment.content
                .split("\n")[0]
                .split(" ")
                .slice(0, 10)
                .join(" "),
            }}
          />
          <div style={{ flexGrow: 1 }} />
          <Group>
            <Button p="xs" variant="outline" radius="xl">
              <Group gap="xs">
                <IconChevronUp />
                <Text>20</Text>
              </Group>
            </Button>
            <Button p="xs" variant="outline" radius="xl">
              <Group gap="xs">
                <IconChevronDown />
                <Text>5</Text>
              </Group>
            </Button>
            <ActionIcon variant="outline" size="lg" radius="xl">
              <IconMessage />
            </ActionIcon>
            <ActionIcon variant="outline" size="lg" radius="xl">
              <IconShare />
            </ActionIcon>
          </Group>
        </Flex>
      </Card.Section>
    </Card>
  );
}
