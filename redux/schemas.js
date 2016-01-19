import { Schema, arrayOf } from 'normalizr';

export const user = new Schema('users');
export const users = arrayOf(user);

export const product = new Schema('products');
export const products = arrayOf(product);
