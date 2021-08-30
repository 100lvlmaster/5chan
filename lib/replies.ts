import { Reply } from './types';
///
export const fetchReplies = async (url: string): Promise<Reply[]> => {
  const result = await fetch(url);
  if (result.status >= 400) {
    return [];
  }
  return (await result.json()) as Reply[];
};

///
export const postReply = async (reply: Reply): Promise<Reply | undefined> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL!}/api/v1/replies`;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    return;
  }
  const req: RequestInit = {
    method: `POST`,
    headers: { 'Content-Type': 'application/json', Authorization: apiKey },
    body: JSON.stringify(reply),
  };
  const result = await fetch(apiUrl, req);
  if (result.status >= 400) {
    return;
  }
  return (await result.json()) as Reply;
};
