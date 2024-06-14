import {
  Avatar,
  Badge,
  Card,
  Container,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePocketBase } from "../contexts/pocketbase";
import { GetSinglePostResult, usePost } from "../contexts/post";
import { Post, Comment, User } from "../database/model";

export function PostPage() {
  const { getPost } = usePost();
  const pocketbase = usePocketBase();
  const { id } = useParams();
  const [post, setPost] = useState<GetSinglePostResult>();

  useEffect(() => {
    if (!id) return;
    getPost(id).then((post) => {
      setPost(post);
    });
    pocketbase.collection<Post>("posts").subscribe(id, (e) => {
      console.log(e);
    });
    pocketbase.collection<Comment>("comments").subscribe("*", (e) => {
      switch (e.action) {
        case "create":
          setPost((p) => {
            if (!p) return p;
            return {
              ...p,
              fullComments: [e.record, ...p.fullComments],
            };
          });
          break;
        case "update":
          setPost((p) => {
            if (!p) return p;
            return {
              ...p,
              fullComments: p.fullComments.map((c) => {
                if (c.id === e.record.id) return e.record;
                return c;
              }),
            };
          });
          break;
        case "delete":
          setPost((p) => {
            if (!p) return p;
            return {
              ...p,
              fullComments: p.fullComments.filter((c) => c.id !== e.record.id),
            };
          });
          break;
        default:
      }
    });
  }, [getPost, id, pocketbase]);
  if (!id) return null;
  console.log(post);
  return (
    <Container>
      <h1>Post {id}</h1>
      {post && (
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          my={16}
          miw={{
            base: 350,
            md: 650,
          }}
        >
          <Card.Section mx="sm" my="md">
            <Group justify="space-between">
              <Group>
                <Avatar src={post.fullAuthor.avatar}></Avatar>
                <Text>{post.fullAuthor.username}</Text>
              </Group>
              <Badge color="pink">{post.fullAuthor.username}</Badge>
            </Group>
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Title fw={500}>{post.title}</Title>
          </Group>

          <Text
            size="sm"
            c="dimmed"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          ></Text>
          {/* show the thumbnail */}
          {post.thumbnail && (
            <Image
              src={post.thumbnail}
              //   height={160}
              alt="Norway"
              w="auto"
              mah={100}
              fit="contain"
            />
          )}
        </Card>
      )}
      {post && post.fullComments && post.fullComments.length > 0 && (
        <div>
          <h3>Comments</h3>
          {post.fullComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </Container>
  );
}

function CommentCard({ comment }: { comment: Comment }) {
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
    username: null,
    verified: false,
  });

  useEffect(() => {
    if (!comment) return;
    pocketbase
      .collection<User>("users")
      .getOne(comment.author)
      .then((user) => {
        setCommentAuthor(user);
      });
  }, [pocketbase, comment]);

  if (!comment) return null;
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      my={16}
      miw={{
        base: 350,
        md: 650,
      }}
    >
      <Card.Section mx="sm" my="md">
        <Group justify="space-between">
          <Group>
            <Avatar src={commentAuthor.avatar}></Avatar>
            <Text>
              {commentAuthor.username ? commentAuthor.username : "Unknown User"}
            </Text>
          </Group>
          <Badge color="pink">{commentAuthor.username}</Badge>
        </Group>
      </Card.Section>

      <Text
        size="sm"
        c="dimmed"
        dangerouslySetInnerHTML={{
          __html: comment.content,
        }}
      ></Text>
    </Card>
  );
}
