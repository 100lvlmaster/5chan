import { Post } from './types';
///
export const fetchPosts = async (url: string): Promise<Post[]> => {
  const result = await fetch(url);
  if (result.status >= 400) {
    return [];
  }
  return (await result.json()) as Post[];
};

export const fetchPostById = async (url: string): Promise<Post | undefined> => {
  const result = await fetch(url);
  if (result.status >= 400) {
    return;
  }
  return (await result.json()) as Post;
};

///
export const createPost = async (post: Post): Promise<Post | undefined> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL!}/api/v1/posts`;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    return;
  }
  const req: RequestInit = {
    method: `POST`,
    headers: { 'Content-Type': 'application/json', Authorization: apiKey },
    body: JSON.stringify({ ...post }),
  };
  const result = await fetch(apiUrl, req);
  if (result.status >= 400) {
    return;
  }
  return (await result.json()) as Post;
};
///

export const deletePost = async (url: string): Promise<boolean> => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const req: RequestInit = {
    method: `DELETE`,
    headers: { Authorization: apiKey! },
  };
  const result = await fetch(url, req);
  if (result.status >= 400) {
    return false;
  }

  return true;
};
