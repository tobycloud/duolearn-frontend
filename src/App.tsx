import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Wrapper } from "./components/wrapper";
import { PocketBaseProvider } from "./contexts/pocketbase";
import { HomePage } from "./routes/Home";
import { LoginPage } from "./routes/Login";
import { AuthProvider } from "./contexts/auth";

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
      <PocketBaseProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </PocketBaseProvider>
    </MantineProvider>
  );
}

export default App;
