import { Message } from './message';

export class File{
  constructor(
    public id: number,
    public name: string,
    public messages: Message[],
    public upload_status: string,
    public uploaded_by: string,
    public created_at: Date,
    public updated_at: Date
  ) {
  }
}
