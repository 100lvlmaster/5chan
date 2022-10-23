import * as cntlr from '@/controllers/posts.controller';
import { validate } from '@/server/middlewares/validation';
import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const getSchema = Joi.object({
  // page: Joi.number().required(),
  // offset: Joi.number().required(),
});

const createSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  author: Joi.string().required(),
});

///
export default nc<NextApiRequest, NextApiResponse>()
  .get(validate({ query: getSchema }), cntlr.getPosts)
  .post(validate({ body: createSchema }), cntlr.createPost);

// export default handler;
