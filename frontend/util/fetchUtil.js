const BASE_URL = import.meta.env.VITE_BASE_URL || window.location.origin;

export async function fetchGet (endpoint) {
  try {
    const response = await fetch(BASE_URL + endpoint, {
      credentials: 'include'
    })
    const data = await response.json()
    return { status: response.status, data }
    
  } catch (error) {

    console.log(error)

    return {status: 0, data: null,}
  }
}

export async function fetchPost (endpoint, body) {
  try {
    const response = await fetch(BASE_URL + endpoint, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  console.log(response)
  console.log(BASE_URL + endpoint)
  const data = await response.json()
  return { status: response.status, ...data }

  } catch (error) {
    console.log(error)

    return {status: 0,data: null,}
  }
}
