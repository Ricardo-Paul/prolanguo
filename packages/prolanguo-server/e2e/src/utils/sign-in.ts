import Axios, { AxiosPromise } from 'axios';

export function signin(email: string, password: string): AxiosPromise{
  const API_URL = 'http://localhost:8000/api/v1';
  return Axios.post(API_URL + '/sign-in',{
    email,
    password
  });
}