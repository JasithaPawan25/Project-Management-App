export class CreateTaskDto {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    dueDate: Date;
    projectId: number;
    authorId: number;
    assigneeId: number;
    points: number;
    status: string;
    priority: string;
    tags: string;
}