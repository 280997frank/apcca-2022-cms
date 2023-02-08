import { ApiResponse, PaginationInput } from "@/types/api";

export enum NoticeboardAssetType {
  VIDEO = "VIDEO",
  PHOTO = "PHOTO",
  DOCUMENT = "DOCUMENT",
}

export interface NoticeboardAsset {
  id: string;
  noticeboardId: string;
  title: string;
  url: string;
  noticeboardAssetType: NoticeboardAssetType;
}

type ListNoticeBoardResponse = ApiResponse & {
  data: {
    id: string;
    title: string;
    description: string;
    totalLike: number;
    isActive: boolean;
    documents: NoticeboardAsset[];
    photosAndVideos: NoticeboardAsset[];
    isLike: boolean;
    updatedAt: string;
    noticeBoardReactionCount: number;
  }[];
};

export interface NoticeboardList {
  listNoticeboard: ListNoticeBoardResponse;
}

export interface NoticeboardInput {
  listNoticeboardInput: PaginationInput;
}

export interface GetNoticeboardByIdInput {
  getNoticeboardByIdInput: {
    id: string;
  };
}
export interface GetNoticeboardByIdResponse {
  getNoticeboardById: {
    id: string;
    title: string;
    description: string;
    totalLike: number;
    isActive: boolean;
    documents: NoticeboardAsset[];
    photosAndVideos: NoticeboardAsset[];
    isLike: boolean;
    noticeBoardReactionCount: number;
  };
}

export interface TReqNotice {
  limit: number;
  page: number;
  search?: { keyword: string };
  status?: string;
  order?: { orderBy: string; sortBy: string };
}

export interface TReqNoticeBoardToggleInput {
  toggleStatusNoticeboardInput: {
    status: boolean;
    id: string | undefined;
  };
}
export interface TReqNoticeBoardDeleteInput {
  deleteNoticeboardInput: {
    id: string;
  };
}
export interface TResNoticeBoardSingleResponse {
  data: {
    id: string;
    title: string;
    description: string;
    totalLike: number;
    isActive: boolean;
    documents: NoticeboardAsset[];
    photosAndVideos: NoticeboardAsset[];
    isLike: boolean;
    noticeBoardReactionCount: number;
  };
}
export interface TResDeleteNoticeBoardResponse {
  data: {
    deleteNoticeboard: {
      success: boolean;
    };
  };
}

export interface InitialNoticeboardValues {
  title: string;
  description: string;
  multimedias: File[];
  documents: File[];
}

export interface InitialEditNoticeboardValues
  extends Omit<InitialNoticeboardValues, "multimedias" | "documents"> {
  multimedias: (File | string)[];
  documents: (File | string)[];
}

export interface NoticeboardAssetPayload
  extends Omit<NoticeboardAsset, "id" | "noticeboardId"> {}

interface CreateNoticeboardPayload {
  title: string;
  description: string;
  photosAndVideos: NoticeboardAssetPayload[];
  documents: NoticeboardAssetPayload[];
}

export interface CreateNoticeboardInput {
  createNoticeboardInput: CreateNoticeboardPayload;
}

interface UpdateNoticeboardPayload extends CreateNoticeboardPayload {
  id: string;
}

export interface UpdateNoticeboardInput {
  editNoticeboardInput: UpdateNoticeboardPayload;
}
