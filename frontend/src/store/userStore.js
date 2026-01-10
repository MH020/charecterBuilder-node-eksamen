import { navigate } from 'svelte-routing';
import { writable } from 'svelte/store'
import { fetchGet } from '../../util/fetchUtil';

export const user = writable({ id: null, username: '', email: '', role: '' })
export const loading = writable(true)


export async function refresh() {
  try {
    const res = await fetchGet("/api/me")

    console.log(res)

    if (res.status === 401) {
      user.set({ id: null, username: '', email: '', role: '' });
      navigate('/login');
      return;
    }
    user.set(res.data.user);
  } catch (err) {
    console.log(err)
    user.set({ id: null, username: '', email: '', role: '' });
    navigate('/login');
  } 
}