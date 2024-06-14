import { Button, Group, Menu, Modal, rem, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconQuestionMark } from "@tabler/icons-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CreateModal(_props: { toggle: () => void }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Create new Question"
        transitionProps={{ transition: "rotate-left" }}
        centered
      >
        <CreatePostForm />
      </Modal>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>Add</Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Type you want to create</Menu.Label>
          <Menu.Item
            leftSection={
              <IconQuestionMark style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={open}
          >
            Create new Question
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

function CreatePostForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="Title"
        placeholder="type your title of the post"
        key={form.key("title")}
        {...form.getInputProps("title")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
