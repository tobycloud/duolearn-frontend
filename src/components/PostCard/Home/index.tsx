import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconMessage,
  IconShare,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Post } from "../../../database/model";
import ThreeDots from "../../ThreeDots";

export function PostCardHome({ post }: { post: Post }) {
  // const pocketbase = usePocketBase();
  return (
    <>
      <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
        <Card w="100%" shadow="sm" radius="md" display="flex" withBorder>
          <Card.Section>
            <Flex justify="space-between" m="0">
              <Flex m="md" direction="column" w="100%">
                <Flex justify="space-between">
                  <Group>
                    <Avatar />

                    <div>
                      <Text fw={500}>{post.fullAuthor.username}</Text>

                      <Text c="dimmed" size="xs">
                        10 minutes ago
                      </Text>
                    </div>
                  </Group>
                  <ThreeDots />
                </Flex>
                <Flex mt="md">
                  <Badge color="blue">Tag 1</Badge>
                  <Badge ml={5} color="green">
                    Tag 2
                  </Badge>
                </Flex>
                <Title order={3} mt="md">
                  {post.title}
                </Title>
                <Text
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .split("\n")[0]
                      .split(" ")
                      .slice(0, 10)
                      .join(" "),
                  }}
                />
                <div style={{ flexGrow: 1 }} />
                <Box h={36} />
              </Flex>
              <Box
                miw={220}
                w="45%"
                hidden={post.images.length == 0}
                visibleFrom="xs"
              >
                <Image
                  // src={
                  //   post.images.length > 0
                  //     ? pocketbase.getFileUrl(post, post.images[0])
                  //     : null
                  // }
                  // ERR_BLOCKED_BY_ORB no idea why
                  src="https://placehold.co/300x300"
                  style={{
                    aspectRatio: "1/1",
                  }}
                  mih={250}
                />
              </Box>
            </Flex>
          </Card.Section>
        </Card>
      </Link>
      <Group ml="md" mt="calc(-36px - var(--mantine-spacing-md))" mb="xl">
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
        <ActionIcon
          variant="outline"
          size="lg"
          radius="xl"
          component={Link}
          to={`post/${post.id}`}
        >
          <IconMessage />
        </ActionIcon>
        <ActionIcon variant="outline" size="lg" radius="xl">
          <IconShare />
        </ActionIcon>
      </Group>
    </>
  );
}
