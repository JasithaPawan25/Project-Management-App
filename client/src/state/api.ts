import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { create, result } from "lodash";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface Teams {
  id : number;       
  teamName : string;
  productOwnerUserId? : number;
  projectManagerUserId? : number;
}


export enum Status {
  Open = "Open",
  InProgress = "In Progress",
  WorkInProgress = "Work In Progress",
  Done = "Done",
  Ongoing = "Ongoing",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Todo = "To Do",
  InReview = "In Review",
  Blocked = "Blocked",
  Waiting = "Waiting",
  UnderReview = "Under Review",
  Approved = "Approved",
  Rejected = "Rejected",
}

export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Urgent = "Urgent",
  Critical = "Critical",
  Backlog = "Backlog",
  Normal = "Normal",
}

export interface User {
  userid?: number;
  username?: string;
  email?: string;
  teamId?: number;
  cognitoId?: string;
  profilePictureUrl?: string;
}

// export interface Comment {
//   id: number;
//   authorId: number;
//   taskId: number;
//   text: string;
//   date: string;
// }

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id : number;
  title : string;
  description? : string;
  startDate? : string;
  dueDate? : string;
  projectId? : number;
  authorId? : number;
  assigneeId? : number;
  points? : number;
  status? : Status;
  priority? : Priority;
  tags? : string;

  author? : User;
  assignee? : User;
  comments? : Comment[];
  attachments? : Attachment[];
}

export interface commonResponse<T> {
  message: string;
  extra: T;
  success: boolean;
}

export interface searchResults {
  tasks?: Task[],
  projects?:Project[],
  users?:User[]
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Projects", "Tasks", "searchResults", "Users","Teams"],
    endpoints: (builder) => ({
      // Define endpoints here

    getProjects: builder.query<commonResponse<Project[]>, void>({
        query: () => "projects",  // GET /projects
        providesTags: ["Projects","Tasks"],
    }),

    createProject: builder.mutation<Project, Partial<Project>>({
      query: (body) => ({
        url: `projects`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),

    getTasks: builder.query<commonResponse<Task[]>, {projectId: number}>({
      
      query: (projectId) => {
        return `tasks?projectId=${projectId.projectId}`},  // GET /projects
      providesTags: (result) => result ? 
        result.extra.map(({id}) => ({type: "Tasks" as const , id})) 
        : [{type: "Tasks" as const}],
    }),

    getUserTasks: builder.mutation<commonResponse<Task[]>, {userID:string}>({
      query: (body) => ({
        url: `tasks/user/task`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),

    getUsers: builder.query<commonResponse<User[]>, void>({
      query: () => "users",  // GET /projects
      providesTags: ["Users"],
    }),

    getTeams: builder.query<commonResponse<Teams[]>, void>({
      query: () => "teams",  // GET /projects
      providesTags: ["Teams"],
    }),

    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: `tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: `tasks/update`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    search:builder.mutation<commonResponse<searchResults>,{ searchTxt: string}>({
      query:(body)=>({
        url: `search`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["searchResults"],
    })

  }),
});

export const {
  useGetProjectsQuery, useCreateProjectMutation,
  useGetTasksQuery, useCreateTaskMutation,
  useUpdateTaskMutation, useSearchMutation,
  useGetUsersQuery,useGetTeamsQuery,
  useGetUserTasksMutation } = api;