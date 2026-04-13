import { SubmitStatus } from "../enums/SubmitStatus";
import { User } from "./User";

export interface Post {
    id: string;
    author: User;
    title: string;
    description: string;
    createdAt: string;
    status: SubmitStatus;

    // mediaUrls?: string[];
}