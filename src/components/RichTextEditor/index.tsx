import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Text,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { IconSend, IconTextResize, IconX } from "@tabler/icons-react";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ts from "highlight.js/lib/languages/typescript";
import { createLowlight } from "lowlight";
import { useState } from "react";
import { Link as ReactLink } from "react-router-dom";

const lowlight = createLowlight();

lowlight.register({ ts });

export default function RTEComponent({
  onCancel,
  isReplying,
  repliedTo,
}: {
  onCancel: () => void;
  isReplying?: boolean;
  repliedTo?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Highlight,
      Underline,
      Superscript,
      SubScript,
      Link,
      Mathematics,
    ],
  });

  const [showFormatting, setShowFormatting] = useState(false);

  const isMobile = useMediaQuery("(max-width: 36em)");

  return (
    <Flex direction="column">
      {isReplying && (
        <Text c="dimmed" size="sm" mb="xs">
          Replying to{" "}
          <ReactLink
            to={""}
            style={{
              color: "inherit",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {repliedTo}
          </ReactLink>
        </Text>
      )}
      <RichTextEditor editor={editor}>
        {showFormatting && (
          <RichTextEditor.Toolbar>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Strikethrough />
              <RichTextEditor.Highlight />
              <RichTextEditor.CodeBlock />
              <RichTextEditor.ClearFormatting />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup></RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
        )}

        <RichTextEditor.Content />
      </RichTextEditor>
      <Group mt="xs">
        <Tooltip
          label={`${showFormatting ? "Hide" : "Show"} formatting options`}
          position="bottom"
          offset={5}
          openDelay={250}
        >
          <ActionIcon
            variant="light"
            size="lg"
            radius="xl"
            onClick={() => setShowFormatting(!showFormatting)}
          >
            <IconTextResize />
          </ActionIcon>
        </Tooltip>
        <Box style={{ flexGrow: 1 }} />
        {isMobile ? (
          <Group>
            <ActionIcon
              variant="outline"
              size="lg"
              radius="xl"
              onClick={onCancel}
            >
              <IconX />
            </ActionIcon>
            <ActionIcon size="lg" radius="xl">
              <IconSend />
            </ActionIcon>
          </Group>
        ) : (
          <Group>
            <Button onClick={onCancel} variant="outline">
              Cancel
            </Button>
            <Button>{isReplying ? "Reply" : "Comment"}</Button>
          </Group>
        )}
      </Group>
    </Flex>
  );
}
