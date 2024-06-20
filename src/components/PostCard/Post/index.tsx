import { Carousel } from "@mantine/carousel";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  Group,
  Image,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { Post } from "../../../database/model";
import PostInteractionBar from "../../PostInteractionBar";
import ThreeDots from "../../ThreeDots";

export default function PostCardPost({ post }: { post: Post }) {
  return (
    <Card w="100%" shadow="sm" radius="md" mb="xl" display="flex" withBorder>
      <Card.Section>
        <Flex m="md" direction="column">
          <Flex justify="space-between">
            <Group>
              <Avatar />
              <Box>
                <Text fw={600}>{post.fullAuthor.username}</Text>
                <Text c="dimmed" size="xs">
                  10 minutes ago
                </Text>
              </Box>
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
          <Carousel>
            {[1, 2, 3, 4].map((index) => (
              <Carousel.Slide key={`temp_${index}`}>
                <Image src="https://placehold.co/600x400" radius="md" />
              </Carousel.Slide>
            ))}
          </Carousel>
          <Space h="md" />
          <PostInteractionBar url="#comments" />
        </Flex>
      </Card.Section>
    </Card>
  );
}
