export interface UserStore {
  user: User | undefined;
  setUser: (user: User) => void;
}

export interface User {
  id: string;
  avatar: string;
}

export interface Post {
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DeletedAt?: boolean;
  ID?: string;
  title: string;
  author: string;
  body: string;
}
export interface Reply {
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DeletedAt?: boolean;
  ID?: string;
  author: string;
  body: string;
  postId: string;
}
