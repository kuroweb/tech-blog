import { ContentResponse, ListContentsResponse } from './api';

export type BlogListResponse = ListContentsResponse<BlogResponse>;

export type BlogResponse = ContentResponse<{
  title: string;
  thumbnail?: {
    url: string;
  };
  body: string;
  tags: {
    id: string;
    name: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}>;
