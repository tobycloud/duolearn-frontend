import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function CreateModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  return (
    <Modal opened={opened} onClose={close} title="Create new question" centered>
      <CreatePostForm />
    </Modal>
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
    <form onSubmit={form.onSubmit(() => {})}>
      <TextInput
        withAsterisk
        label="Title"
        placeholder="Title of the post"
        key={form.key("title")}
        {...form.getInputProps("title")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
