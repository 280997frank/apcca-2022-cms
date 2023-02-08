import { ApiResponse, ListThreadsInput } from "@/types/api";
interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Thread {
  id: string;
}

type ListDiscussionForumResponse = ApiResponse & {
  data: TDiscussionData[];
};

export interface TDiscussionData {
  id: string;
  title: string;
  text: string;
  creator: User;
  likes: User[];
  replies: Thread[];
  totalReplies: number;
  createdAt: number;
  isActive: boolean;
  status: string;
}
export interface DiscussionForumList {
  listThreads: ListDiscussionForumResponse;
}

export interface DiscussionForumInput {
  param: ListThreadsInput;
}

interface TReqUpdateThreadsInput {
  id: string | undefined;
  status: string;
  isDelete: boolean;
}

export interface TDiscussionForumUpdate {
  param: TReqUpdateThreadsInput;
}

export interface TResDiscussionForumUpdate {
  status: string;
}

export interface TReqDiscussion {
  limit: number;
  page: number;
  search: string;
  status?: string;
  orderBy?: string;
  updateType?: string;
  sortBy?: string;
}
