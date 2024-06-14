import { usePost } from "../contexts/post";
import { Center } from "@mantine/core";
import { PostCard } from "../components/PostCard";
import { usePocketBase } from "../contexts/pocketbase";
import { useEffect } from "react";
import { Post } from "../database/model";

export function HomePage() {
  const { posts, setPosts } = usePost();
  const pocketbase = usePocketBase();
  useEffect(() => {
    pocketbase.collection<Post>("posts").subscribe("*", (e) => {
      console.log(e);
      switch (e.action) {
        case "create":
          setPosts((p) => [e.record, ...p]);
          break;
        case "update":
          setPosts((p) => {
            const index = p.findIndex((post) => post.id === e.record.id);
            if (index === -1) return p;
            return [...p.slice(0, index), e.record, ...p.slice(index + 1)];
          });
          break;
        case "delete":
          setPosts((p) => p.filter((post) => post.id !== e.record.id));
          break;
        default:
          break;
      }
    });
  },[]);
  console.log(posts);
  return (
    <div>
      {/* <h1>Home</h1> */}
      <div>
        {posts.map((p) => (
          <Center key={p.id}>
            <PostCard post={p}></PostCard>
          </Center>
        ))}
      </div>
    </div>
  );
}
