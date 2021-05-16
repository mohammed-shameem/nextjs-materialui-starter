import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import axios from 'axios';

const fetcher = async url => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    if (err.response.status === 401) Router.push('/login');
    throw err;
  }
}

export function useUser() {
  const { data, error } = useSWR('/api/user', fetcher);
  const user = data?.user;
  return error ? null : user;
}