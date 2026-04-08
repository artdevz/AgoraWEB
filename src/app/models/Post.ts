import { User } from "./User";

export interface Post {
    id: string;
    author: User;
    title: string;
    description: string;
    createdAt: string;

    // mediaUrls?: string[];
}