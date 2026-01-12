import { navigate } from 'svelte-routing';
import { writable } from 'svelte/store'
import { fetchGet } from '../../util/fetchUtil';

export const user = writable({ id: null, username: '', email: '', role: '' })



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


export async function softRefresh() {
  try {
    const res = await fetch("/api/me", {
      method: "GET",
      credentials: "include", // important if your session is cookie-based
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401) {
      user.set({ id: null, username: '', email: '', role: '' });
      return;
    }

    if (res.status === 200) {
      const data = await res.json(); 
      user.set(data.user); 
      return;
    }

  } catch (err) {
    console.error("softRefresh error:", err);
    user.set({ id: null, username: '', email: '', role: '' });
  }
}
