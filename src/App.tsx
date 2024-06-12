import { createTheme, MantineProvider } from "@mantine/core";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Wrapper } from "./components/wrapper";
import { HomePage } from "./routes/Home";
import { LoginPage } from "./routes/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "*", element: <div>404</div> },
    ],
  },
]);
const theme = createTheme({
  primaryColor: "blue",
  colors: {
    dark: [
      "#d5d7e0",
      "#acaebf",
      "#8c8fa3",
      "#666980",
      "#4d4f66",
      "#34354a",
      "#2b2c3d",
      "#1d1e30",
      "#0c0d21",
      "#01010a",
    ],
  },
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
