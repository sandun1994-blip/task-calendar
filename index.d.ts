import { Event } from "react-big-calendar";
import { EventSchemaType } from "@/schemas";
import { Role } from "@prisma/client";

export type ID= {id:number}
declare module "react-big-calendar" {
  interface Event {
    id: string | number;
    data: EventSchemaType;
    // roles:Role[]
  }
}
