import { Schema, arrayOf } from 'normalizr';

export const user = new Schema('users', {
  idAttribute: 'id',
});

export const users = arrayOf(user);
