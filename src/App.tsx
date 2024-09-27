import "@mantine/core/styles.css";
import { MantineProvider, Center, Box } from "@mantine/core";
import { theme } from "./theme";
import { AutocompleteLoading } from "./AutocompleteLoading";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Center mt={100}>
        <Box>
          <AutocompleteLoading />
        </Box>
      </Center>
    </MantineProvider>
  );
}
