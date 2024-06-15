import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Wrapper } from "./components/Wrapper";
import { AuthProvider } from "./contexts/auth";
import { PocketBaseProvider } from "./contexts/pocketbase";
import { PostProvider } from "./contexts/post";
import { SignInPage } from "./pages/Auth/SignIn";
import AuthWrapper from "./pages/Auth/Wrapper";
import { HomePage } from "./pages/Home";
import { PostPage } from "./pages/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/post/:id", element: <PostPage /> },
      { path: "*", element: <div>404</div> },
    ],
  },
  {
    path: "/auth/",
    element: <AuthWrapper />,
    children: [{ path: "/auth/signin", element: <SignInPage /> }],
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
    <MantineProvider theme={theme} defaultColorScheme="light">
      <PocketBaseProvider>
        <AuthProvider>
          <PostProvider>
            <RouterProvider router={router} />
          </PostProvider>
        </AuthProvider>
      </PocketBaseProvider>
    </MantineProvider>
  );
}

export default App;
