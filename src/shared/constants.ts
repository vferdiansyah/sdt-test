/* eslint-disable @typescript-eslint/no-namespace */

export namespace ResponseMessage {
  export const USER = {
    CREATED: 'User has been created',
  } as const;
}

export namespace ErrorMessage {
  export const DB = {
    FAILED: 'Failed to persist data to database',
  } as const;
}
