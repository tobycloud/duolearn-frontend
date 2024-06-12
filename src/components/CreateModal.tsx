import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

export function CreateModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" size="xl">
      </Modal>

      <Button onClick={open}>Add</Button>
    </>
  );
}
