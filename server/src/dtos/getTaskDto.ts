export interface Attachment {
    id: number;
    fileURL: string;
    fileName?: string;
    taskId: number;
    uploadedById: number;
}

export class getTaskDto {
    public Id: number = 0;
    public Name: string = "";
    public Description?: string = "";
    public StartDate: Date = new Date();
    public EndDate: Date = new Date();
    public Author: string = "";
    public Assignee: string = "";
    public Comments: string = "";
    public Attachments: Attachment[] = [];
    public status?: string = "None";
}