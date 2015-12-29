import { Schema, arrayOf } from 'normalizr';

export const user = new Schema('users', {
  idAttribute: '_id',
});

export const users = arrayOf(user);
