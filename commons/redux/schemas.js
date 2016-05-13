// Copyright (C) 2016 Goom Inc. All rights reserved.

import { Schema, arrayOf } from 'normalizr';

export const user = new Schema('users');
export const users = arrayOf(user);

export const product = new Schema('products');
export const products = arrayOf(product);

export const hotProduct = new Schema('hotProducts');
export const hotProducts = arrayOf(hotProduct);

export const order = new Schema('orders');
export const orders = arrayOf(order);

export const address = new Schema('addresses');
export const addresses = arrayOf(address);

export const wish = new Schema('wishes');
export const wishes = arrayOf(wish);

export const favoriteBrand = new Schema('favoriteBrands');
export const favoriteBrands = arrayOf(favoriteBrand);

export const building = new Schema('buildings');
export const buildings = arrayOf(building);
