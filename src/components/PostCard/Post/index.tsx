import { Carousel } from "@mantine/carousel";
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
  Space,
  Text,
  Title,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconMessage,
  IconShare,
} from "@tabler/icons-react";
import { Post } from "../../../database/model";
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
                <Text fw={500}>{post.fullAuthor.username}</Text>
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
