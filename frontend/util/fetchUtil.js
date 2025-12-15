import { openModal } from '../src/store/modalStore'
import toastrDisplayHTTPCode from './ToastrUtil'

const BASE_URL = import.meta.env.VITE_BASE_URL || window.location.origin

export async function fetchGet (endpoint) {
  try {
    const response = await fetch(BASE_URL + endpoint, {
      credentials: 'include'
    })
    const data = await response.json()
    return { status: response.status, data }
  } catch (error) {
    console.log(error)

    return { status: 0, data: null, message: 'server Error please try again later or inform the admin team on discord' }
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

    return { status: 0, data: null, message: 'server Error please try again later or inform the admin team on discord' }
  }
}

export async function fetchUpdate (endpoint, row) {
  try {
    console.log(row.id)
    const response = await fetch(BASE_URL + endpoint + `/${row.id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(row)
      }
    )

    const data = await response.json()
    return { status: response.status, ...data }
  } catch (error) {
    console.error(error)
    return {
      status: 0,
      data: null,
      message:
                  'Server error — please try again later or inform the admin team on Discord.'
    }
  }
}

export async function fetchDelete (endpoint, id) {
  try {
    const response = await fetch(BASE_URL + endpoint + `/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return { status: response.status, ...data }
  } catch (error) {
    console.log(error)

    return { status: 0, data: null, message: 'server Error please try again later or inform the admin team on discord' }
  }
}

export async function fetchModal (endpoint, modalPage) {
  const response = await fetchGet(endpoint)
  console.log(BASE_URL + endpoint)
  if (response.status === 200) {
    toastrDisplayHTTPCode(200, response.message)
    openModal(modalPage)
  } else {
    toastrDisplayHTTPCode(response.status, response.message)
  }
}
