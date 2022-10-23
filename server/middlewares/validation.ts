import withJoi from 'next-joi';

export const validate = withJoi({
  onValidationError: (_, res, error) => {
    return res.status(400).send({ error: error.message });
  },
});
