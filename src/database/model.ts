import { RecordModel } from "pocketbase"

export interface User {
    avatar: string
    created: string
    email: string
    emailVisibility: boolean
    id: string
    name: string
    posts: string[]
    updated: string
    username: string | null
    verified: boolean
}

export interface Post extends RecordModel {
    content: string
    created: string
    id: string
    title: string
    updated: string
    author: string
    comments: string[]
    fullComments?: Comment[]
    thumbnail?: string
    fullAuthor: User
}

export interface Comment extends RecordModel {
    author: string
    post: string
    content: string
    parent: string
    fullAuthor?: User
}