import React from 'react';
import Router from 'next/router';
import { getTokenCookie } from './auth-cookies'
 
const WithAuth =  (gssp) =>  async context => {
  const token = getTokenCookie(context.req);
  if (!token) {
    context.res.writeHead(302, { Location: '/login' });
    context.res.end();
  }
  return await gssp(context);
}

export default WithAuth;