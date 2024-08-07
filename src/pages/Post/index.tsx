import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  List,
  Text,
  Title,
} from "@mantine/core";

import { IconChevronDown, IconChevronLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CommentCard } from "../../components/CommentCard";
import PostCard from "../../components/PostCard";
import RTEComponent from "../../components/RichTextEditor";
import { usePocketBase } from "../../contexts/pocketbase";
import { GetSinglePostResult, usePost } from "../../contexts/post";
import { Comment, Post } from "../../database/model";

export function PostPage() {
  const { getPost } = usePost();
  const pocketbase = usePocketBase();
  const { id } = useParams();
  const [post, setPost] = useState<GetSinglePostResult>();

  const navigate = useNavigate();

  const [commentingBox, setCommentingBox] = useState(false);

  useEffect(() => {
    if (!id) return;
    getPost(id).then((post) => {
      setPost(post);
    });
    pocketbase.collection<Post>("posts").subscribe(id, (e: unknown) => {
      console.log(e);
    });
    pocketbase
      .collection<Comment>("comments")
      .subscribe("*", (e: { action: unknown; record: Comment }) => {
        switch (e.action) {
          case "create":
            setPost((post) => {
              if (!post) return post;
              return {
                ...post,
                fullComments: [e.record, ...post.fullComments],
              };
            });
            break;
          case "update":
            setPost((post) => {
              if (!post) return post;
              return {
                ...post,
                fullComments: post.fullComments.map((comment) => {
                  if (comment.id === e.record.id) return e.record;
                  return comment;
                }),
              };
            });
            break;
          case "delete":
            setPost((post) => {
              if (!post) return post;
              return {
                ...post,
                fullComments: post.fullComments.filter(
                  (comment) => comment.id !== e.record.id
                ),
              };
            });
            break;
          default:
        }
      });
  }, [getPost, id, pocketbase]);

  if (!id) return null;

  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={{ base: 12, lg: 9 }}>
          <Group
            gap="xs"
            mb="md"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <IconChevronLeft size={18} color="var(--mantine-color-dimmed)" />
            <Text c="dimmed">Back</Text>
          </Group>
          {post && <PostCard.Post post={post}></PostCard.Post>}
          {post && post.fullComments && post.fullComments.length > 0 && (
            <Box id="comments">
              <Divider my="xl" />
              {commentingBox ? (
                <Card w="100%" shadow="sm" radius="md" p="xl" withBorder>
                  <Card.Section>
                    <RTEComponent onCancel={() => setCommentingBox(false)} />
                  </Card.Section>
                </Card>
              ) : (
                <Card
                  w="100%"
                  shadow="sm"
                  radius="md"
                  p="xl"
                  withBorder
                  onClick={() => setCommentingBox(true)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Section>
                    <Text c="dimmed" lh={2}>
                      Add a comment
                    </Text>
                  </Card.Section>
                </Card>
              )}
              <Group my="xl" gap="xs">
                <Text c="dimmed">Sort by:</Text>

                {/* temp */}
                <Button
                  variant="light"
                  radius="xl"
                  rightSection={<IconChevronDown />}
                >
                  Newest
                </Button>
              </Group>
              {post.fullComments.map((comment, index) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  mock={index % 2 == 0}
                />
              ))}
            </Box>
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 0, lg: 3 }}>
          <Card shadow="sm" mt="calc(var(--mantine-spacing-md) + 28.4px)">
            <Title order={5}>
              Information about this community (for example)
            </Title>
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
