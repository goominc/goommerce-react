// Copyright (C) 2016 Goom Inc. All rights reserved.

import { Schema, arrayOf } from 'normalizr';

export const user = new Schema('users');
export const users = arrayOf(user);

export const product = new Schema('products');
export const products = arrayOf(product);

export const order = new Schema('orders');
export const orders = arrayOf(order);

export const address = new Schema('addresses');
export const addresses = arrayOf(address);
