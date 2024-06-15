import { ReactNode } from "react";
import { PostCardHome } from "./Home";
import PostCardPost from "./Post";

interface PostCardProps {
  children: ReactNode;
}

function PostCard({ children }: PostCardProps) {
  return <div>{children}</div>;
}

PostCard.Post = PostCardPost;
PostCard.Home = PostCardHome;

export default PostCard;
