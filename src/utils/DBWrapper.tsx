import { openDB } from 'idb'

// Basic wrapper for DB management

const DB_NAME = 'chronicle-db'
const DB_VERSION = 1
const DOC_STORE = 'documents'
const INDEX_STORE = 'workspaces'

const getDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(DOC_STORE)) {
        db.createObjectStore(DOC_STORE)
      }
      if (!db.objectStoreNames.contains(INDEX_STORE)) {
        db.createObjectStore(INDEX_STORE, { keyPath: 'id' })
      }
    },
  })
}

export const listWorkspaces = async () => {
  const db = await getDB()
  return db.getAll(INDEX_STORE)
}

export const createWorkspace = async (name: string, id: string) => {
  const db = await getDB()
  const workspace = { id, name, updatedAt: Date.now() }
  await db.put(INDEX_STORE, workspace)
  await db.put(DOC_STORE, { type: 'doc', content: '' }, id)
  return workspace
}

export const deleteWorkspace = async (id: string) => {
  const db = await getDB()
  await db.delete(INDEX_STORE, id)
  await db.delete(DOC_STORE, id)
}

export const load = async (id: string) => {
  const db = await getDB()
  return db.get(DOC_STORE, id)
}
export const initWorkspace = async (id: string) => {
  const workspaces = await listWorkspaces()
  if (workspaces.length === 0) {
    if (!id) throw new Error('Missing ID for workspace creation')
    return await createWorkspace('Untitled', id)
  }
  return workspaces[0]
}


export const save = async (id: string, content: any) => {
  const db = await getDB()
  await db.put(DOC_STORE, content, id)

  const workspace = await db.get(INDEX_STORE, id)
  if (workspace) {
    workspace.updatedAt = Date.now()
    await db.put(INDEX_STORE, workspace)
  }
}
