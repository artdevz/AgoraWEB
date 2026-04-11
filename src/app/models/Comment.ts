import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
    id: string;
    post: Post;
    author: User;
    createdAt: string;
    content: string;
    edited: boolean;
    deleted: boolean;
    parentID?: string | null;
    children: Comment[];
}