import { HttpStatus } from '@nestjs/common';

import { GraphQLError } from 'graphql/error';

type ErrorMessage = { type: string; message: string };

export const ERROR_MESSAGES = {
  WRONG_PASSWORD: { type: 'invalid_password', message: 'Your Password Is Invalid' },
  INVALIDATED_TOKEN: { type: 'invalidated_token', message: 'This Token Had Been Invalidated' },
  INVALID_TOKEN: { type: 'invalid_token', message: 'This Token Is Invalid' },
  ALREADY_EXISTS: (instance: string) => ({ type: 'already_exists', message: `${instance} Already Exists` }),
  NOT_FOUND: (instance: string) => ({ type: 'not_found', message: `${instance} not found` }),
  FORBIDDEN: (resource: string) => ({ type: 'forbidden', message: `Access to this ${resource} is forbidden` }),
  ZOD_ERROR: (message) => ({
    type: 'validation_error',
    message,
  }),
};

export const ErrorHandler = (code: HttpStatus, message: ErrorMessage) =>
  new GraphQLError(JSON.stringify({ status: code, message }));
