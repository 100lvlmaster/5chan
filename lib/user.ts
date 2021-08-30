import { customAlphabet } from 'nanoid/async';
import { User } from './types';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/micah';

const userKey = 'currentUid';
const createUser = async (): Promise<User> => {
  const nanoid = customAlphabet('0123456789', 10);
  const id = await nanoid();
  const avatar = createAvatar(style, {
    seed: 'id',
    dataUri: true,
  });
  const user: User = { id, avatar };
  localStorage.setItem(userKey, JSON.stringify(user));
  return user;
};

export const getUser = async (): Promise<User> => {
  let result = localStorage.getItem(userKey);
  let user: User;
  if (!result) {
    return await createUser();
  }
  user = JSON.parse(result) as User;
  return user;
};
