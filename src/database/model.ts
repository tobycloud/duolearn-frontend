import { RecordModel } from "pocketbase";

export type CommentID = string;
export type UserID = string;
export type PostID = string;
export type Filename = string;

export interface User {
  avatar: Filename;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: UserID;
  name: string;
  posts: PostID[];
  updated: string;
  username: string;
  verified: boolean;
}

export interface Post extends RecordModel {
  content: string;
  created: string;
  id: string;
  title: string;
  updated: string;
  author: string;
  comments: CommentID[];
  fullComments?: Comment[];
  images: Filename[];
  fullAuthor: User;
}

export interface Comment extends RecordModel {
  id: CommentID;
  author: UserID;
  post: PostID;
  content: string;
  parent: CommentID;
  fullAuthor?: User;
}
