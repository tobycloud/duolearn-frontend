import {
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Post } from "../../../database/model";
import PostInteractionBar from "../../PostInteractionBar";
import ThreeDots from "../../ThreeDots";

export function PostCardHome({ post }: { post: Post }) {
  // const pocketbase = usePocketBase();
  return (
    <Card w="100%" shadow="sm" radius="md" display="flex" withBorder mb="xl">
      <Card.Section>
        <Flex justify="space-between" m="0">
          <Flex m="md" direction="column" w="100%">
            <Flex>
              <Group>
                <Avatar />
                <Box>
                  <Text fw={600}>{post.fullAuthor.username}</Text>
                  <Text c="dimmed" size="xs">
                    10 minutes ago
                  </Text>
                </Box>
              </Group>
              <Box
                style={{ flexGrow: 1 }}
                component={Link}
                to={`post/${post.id}`}
              />
              <ThreeDots />
            </Flex>
            <Flex>
              <Badge color="blue" mt="md">
                Tag 1
              </Badge>
              <Badge ml={5} color="green" mt="md">
                Tag 2
              </Badge>
              <Box
                style={{ flexGrow: 1 }}
                component={Link}
                to={`post/${post.id}`}
              />
            </Flex>
            <Link
              to={`post/${post.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
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
            </Link>
            <Box
              style={{ flexGrow: 1 }}
              component={Link}
              to={`post/${post.id}`}
            />
            <Flex>
              <PostInteractionBar url={`post/${post.id}`} />
              <Box
                style={{ flexGrow: 1 }}
                component={Link}
                to={`post/${post.id}`}
              />
            </Flex>
          </Flex>
          <Box
            miw={220}
            w="45%"
            hidden={post.images.length == 0}
            visibleFrom="xs"
            component={Link}
            to={`post/${post.id}`}
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
  );
}
