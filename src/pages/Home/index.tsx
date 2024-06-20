import { Box, Card, Container, Grid, List, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import PostCard from "../../components/PostCard";
import { usePocketBase } from "../../contexts/pocketbase";
import { usePost } from "../../contexts/post";
import { Post } from "../../database/model";

export function HomePage() {
  const { posts, setPosts } = usePost();
  const pocketbase = usePocketBase();

  useEffect(() => {
    pocketbase
      .collection<Post>("posts")
      .subscribe("*", (event: { action: unknown; record: Post }) => {
        switch (event.action) {
          case "create":
            setPosts((posts) => [event.record, ...posts]);
            break;
          case "update":
            setPosts((posts) => {
              const index = posts.findIndex(
                (post) => post.id === event.record.id
              );
              if (index === -1) return posts;
              return [
                ...posts.slice(0, index),
                event.record,
                ...posts.slice(index + 1),
              ];
            });
            break;
          case "delete":
            setPosts((posts) =>
              posts.filter((post) => post.id !== event.record.id)
            );
            break;
          default:
            break;
        }
      });
  }, [pocketbase, setPosts]);

  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={{ base: 12, lg: 9 }}>
          {posts.map((post) => (
            <Box key={post.id}>
              <PostCard.Home post={post}></PostCard.Home>
            </Box>
          ))}
        </Grid.Col>
        <Grid.Col span={{ base: 0, lg: 3 }}>
          <Card shadow="sm">
            <Title order={5}>Notification (for example)</Title>
            <List mt="sm">
              {Array.from({ length: 5 }).map((_, index) => (
                <List.Item key={index}>
                  <Text>something</Text>
                </List.Item>
              ))}
            </List>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
