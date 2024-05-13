/* eslint-disable @typescript-eslint/no-namespace */

export namespace ResponseMessage {
  export const USER = {
    CREATED: 'User has been created',
    NOT_FOUND: 'User not found',
    UPDATED: 'User has been updated',
    DELETED: 'User has been deleted',
  } as const;
}

export namespace ErrorMessage {
  export const DB = {
    FAILED: 'Failed to persist data to database',
  } as const;
}
