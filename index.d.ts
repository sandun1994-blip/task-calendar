import { Event } from "react-big-calendar";
import { EventSchemaType } from "@/schemas";

export type ID= {id:number}
declare module "react-big-calendar" {
  interface Event {
    id: string | number;
    data: EventSchemaType;
  }
}
