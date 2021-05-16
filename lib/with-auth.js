import * as React from 'react';
import nextCookie from 'next-cookies';
import Router from 'next/router';
import { getTokenCookie } from './auth-cookies'

 
const auth = async (ctx) => {
  // const { token } = nextCookie(ctx)
  const token = getTokenCookie(ctx.req)
  console.log("token1", token)
  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    } else {
      Router.push('/login')
    }
  }
  return token
}


const WithAuth = (WrappedComponent) => {
  const  Wrapper = (props) => {
    return (
      <WrappedComponent  {...props} />
    )
  }

  Wrapper.getInitialProps = async (ctx) => {
    console.log("ctx", ctx)
    const token = auth(ctx)
    const componentProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx)
    return { ...componentProps, token }
  }
  return  Wrapper;
}

export default auth;