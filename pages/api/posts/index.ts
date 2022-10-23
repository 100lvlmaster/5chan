import * as cntlr from '@/controllers/posts.controller';
import { validate } from '@/server/middlewares/validation';
import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const schema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  author: Joi.string().required(),
});
///
export default nc<NextApiRequest, NextApiResponse>()
  .get(validate({ body: schema }), cntlr.createPost)
  .post(validate({ body: schema }), cntlr.createPost);

// export default handler;
