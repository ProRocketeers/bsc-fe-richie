import axios from 'axios'
import { Note } from '../contexts'


export const NotesService = new class {
  private endpoint = axios.create({
    baseURL: 'http://private-9aad-note10.apiary-mock.com',
  })

  async fetchNotes(): Promise<Array<Note>> {
    const response = await this.endpoint.get<Array<Note>>('/notes')
    return response.data
  }

  async fetchNote(id: number): Promise<Note | undefined> {
    const response = await this.endpoint.get<Note | undefined>(`/notes/${id}`)
    return response.data
  }

  async createNote(note: string): Promise<Note> {
    const response = await this.endpoint.post<Note>('/notes', {note})
    return response.data
  }

  async updateNote(note: Note): Promise<void> {
    await this.endpoint.put(`/notes/${note.id}`, note)
  }

  async deleteNote(id: number): Promise<void> {
    await this.endpoint.delete(`/notes/${id}`)
  }
}()