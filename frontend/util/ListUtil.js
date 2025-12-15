import { modalSelectCallback, openModal } from '../src/store/modalStore.js'
import { fetchDelete } from './fetchUtil.js'
import toastrDisplayHTTPCode from './ToastrUtil.js'

export async function deleteEntity (id, endpoint, list) {
  const response = await fetchDelete(endpoint, id)
  toastrDisplayHTTPCode(response.status, response.message)
  if (response.status === 200) {
    list = list.filter(item => item.id !== id)
  }
  return list
}

export function saveEntity (updated, list) {
  list = list.map(item =>
    item.id === updated.id ? updated : item
  )
  return list
}

export function selectSingleFromModal(target, field, component) {
  modalSelectCallback.set((selected) => {
    target[field] = selected

    target = { ...target }

    modalSelectCallback.set(null)
  })

  openModal(component)
}

export function selectMultibleFromModal(component, onSelect) {
  modalSelectCallback.set((selected) => {
    onSelect(selected);   
    modalSelectCallback.set(null);
  });

  openModal(component);
}
