import { fetchDelete } from './fetchUtil.js'
import toastrDisplayHTTPCode from './ToastrUtil.js'

export async function deleteItem (id, endpoint, list) {
  const response = await fetchDelete(endpoint, id)
  toastrDisplayHTTPCode(response.status, response.message)
  if (response.status === 200) {
    list = list.filter(item => item.id !== id)
  }
  return list
}

export function saveItem (updated, list) {
  list = list.map(item =>
    item.id === updated.id ? updated : item
  )
  return list
}
