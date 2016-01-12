import { Schema, arrayOf } from 'normalizr';

export const user = new Schema('users', {
  idAttribute: 'id',
});

export const users = arrayOf(user);

export const product = new Schema('products', {
  idAttribute: 'id',
});

export const products = arrayOf(product);
