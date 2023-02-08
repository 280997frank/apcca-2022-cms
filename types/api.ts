export interface ApiResponse {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface PaginationInput {
  limit: number;
  page: number;
  search?: { keyword: string };
  status?: string;
  order?: { orderBy: string; sortBy: string };
}

export interface ListThreadsInput {
  page: number;
  limit: number;
  search: string;
  sortBy?: string;
  orderBy?: string;
}
