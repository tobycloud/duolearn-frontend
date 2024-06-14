import { Card, Image, Text, Button, Group, Badge } from "@mantine/core";
import { Post } from "../database/model";
import { Link } from "react-router-dom";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder my={16} miw={{
      base: 350,
      md: 650
    }}>
      <Card.Section>
        {post.thumbnail && (
          <Image src={post.thumbnail} height={160} alt="Norway" />
        )}
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{post.title}</Text>
        <Badge color="pink">Posted by {post.fullAuthor.username}</Badge>
      </Group>

      <Text
        size="sm"
        c="dimmed"
        dangerouslySetInnerHTML={{
          __html: post.content.split("\n")[0].split(" ").slice(0, 10).join(" "),
        }}
      ></Text>

      <Button
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        component={Link}
        to={`/post/${post.id}`}
      >
        More info
      </Button>
    </Card>
  );
}
