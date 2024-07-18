import { EventSchemaType } from "@/schemas";
import { Event, EventRole, Role } from "@prisma/client";



type FieldErrors<T> = {
    [K in keyof T]?: string[];
  };
  
type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput>;
    error?: string | null;
    data?: TOutput;
  }

export type ReturnType= ActionState<EventSchemaType,Event>

export type GetReturnType= ActionState<EventSchemaType,Event[]>