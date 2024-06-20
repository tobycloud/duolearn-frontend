import { Avatar, Box, Card, Flex, Group, Text, Timeline } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { usePocketBase } from "../../contexts/pocketbase";
import { Comment, User } from "../../database/model";
import PostInteractionBar from "../PostInteractionBar";
import ThreeDots from "../ThreeDots";
import classes from "./index.module.css";

const mockdata = [
  {
    username: "pdteggman",
    content: "<p>chat is this riel? btw this is hardcoded</p>",
    elapsed: "8m",
  },
  {
    username: "tobycm",
    content:
      "<p><span style='font-weight: 600'>@pdteggman</span> he cooked</p>",
    elapsed: "7m",
  },
];

// Comments & replies Notes
// - Comments and replies cannot be shared/reposted.
// - Comments and replies can be upvoted and downvoted. (althought I want to replace this feature with a heart button)
// - Replies to comments are indented and they are all connected as a thread.

export function CommentCard({
  comment,
  mock,
}: {
  comment: Comment;
  mock?: boolean;
}) {
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

  const [viewReplies, setViewReplies] = useState(false);

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
        <Timeline bulletSize={38} lineWidth={2} m="md">
          <Timeline.Item bullet={<Avatar />}>
            <Flex>
              <Flex direction="column">
                <Group gap="xs">
                  <Text fw={600}>{commentAuthor.username}</Text>
                  <Text c="dimmed" size="xs">
                    10m
                  </Text>
                </Group>
                <Text
                  dangerouslySetInnerHTML={{
                    __html: comment.content
                      .split("\n")[0]
                      .split(" ")
                      .slice(0, 10)
                      .join(" "),
                  }}
                />
                <PostInteractionBar isComment />
              </Flex>
              <Box style={{ flexGrow: 1 }} />
              <ThreeDots />
            </Flex>
          </Timeline.Item>
        </Timeline>
      </Card.Section>
      <Card.Section ml="calc(var(--mantine-spacing-md) + 38px)">
        <Timeline bulletSize={38} lineWidth={2} m="md">
          {mock &&
            viewReplies &&
            mockdata.map((data, index) => (
              <Timeline.Item bullet={<Avatar />} key={`temp_reply_${index}`}>
                <Flex>
                  <Flex direction="column">
                    <Group gap="xs">
                      <Text fw={600}>{data.username}</Text>
                      <Text c="dimmed" size="xs">
                        {data.elapsed}
                      </Text>
                    </Group>
                    <Text
                      dangerouslySetInnerHTML={{
                        __html: data.content
                          .split("\n")[0]
                          .split(" ")
                          .slice(0, 10)
                          .join(" "),
                      }}
                    />
                    <PostInteractionBar isComment />
                  </Flex>
                  <Box style={{ flexGrow: 1 }} />
                  <ThreeDots />
                </Flex>
              </Timeline.Item>
            ))}
        </Timeline>
        {mock && (
          <Group gap="5" mb="md" className={classes.underlineOnHover}>
            {!viewReplies ? (
              <IconChevronDown size={18} color="var(--mantine-color-dimmed)" />
            ) : (
              <IconChevronUp size={18} color="var(--mantine-color-dimmed)" />
            )}
            <Text onClick={() => setViewReplies(!viewReplies)} c="dimmed">
              {viewReplies ? "Hide" : "Show"} replies
            </Text>
          </Group>
        )}
      </Card.Section>
    </Card>
  );
}
