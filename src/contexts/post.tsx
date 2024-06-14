import React, { useEffect } from "react";
import { usePocketBase } from "./pocketbase";
import { Post, Comment, User } from "../database/model";

export type GetSinglePostResult = Post & {
  fullComments: Comment[];
  fullAuthor: User;
};

export interface PostContextType {
  posts: Post[];
  getPost: (id: string) => Promise<GetSinglePostResult | undefined>;
  fetchPosts: (page: number) => Promise<Post[]>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export const PostContext = React.createContext<PostContextType>({
  posts: [],
  getPost: async () => undefined,
  fetchPosts: async () => [],
  setPosts: () => {},
});

export function usePost() {
  return React.useContext(PostContext);
}

const LimitOfFetch = 10;

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const pocketbase = usePocketBase();

  const getPost = async (id: string) => {
    const post = await pocketbase.collection("posts").getOne<Post>(id);
    // fetch comments of post
    const comments = await pocketbase
      .collection("comments")
      .getFullList<Comment>(LimitOfFetch, {
        filter: `post = "${id}"`,
        sort: "-created",
        perPage: LimitOfFetch,
        page: 0,
      });
    const author = await pocketbase
      .collection("users")
      .getOne<User>(post.author);
    post.fullAuthor = author;

    post.fullComments = comments || [];
    return post as GetSinglePostResult;
  };
  const fetchPosts = React.useCallback(
    async (page: number) => {
      const posts = await pocketbase
        .collection("posts")
        .getList<Post>(page, LimitOfFetch, {
          sort: "-created",
        });
      for (const post of posts.items) {
        const author = await pocketbase
          .collection("users")
          .getOne<User>(post.author);
        post.fullAuthor = author;
      }

      setPosts(posts.items);
      return posts.items;
    },
    [pocketbase]
  );
  useEffect(() => {
    fetchPosts(0);
  }, [fetchPosts]);

  return (
    <PostContext.Provider
      value={{ posts: posts, getPost, fetchPosts, setPosts }}
    >
      {children}
    </PostContext.Provider>
  );
}
