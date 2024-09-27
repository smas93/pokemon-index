import "@mantine/core/styles.css";
import { MantineProvider, Center, Box } from "@mantine/core";
import { AutocompleteLoading } from "./AutocompleteLoading";

export default function App() {
  return (
    <MantineProvider>
      <Center mt={100}>
        <Box>
          <AutocompleteLoading />
        </Box>
      </Center>
    </MantineProvider>
  );
}
