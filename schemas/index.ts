import { EventCategory, Role } from "@prisma/client";
import { z } from "zod";



export const EventSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  start: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  end: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  startTime: z.string().min(1, { message: "Time is required" }),
  endTime: z.string().min(1, { message: "Time is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  eventCategory:z.enum([
    EventCategory.ONE,
    EventCategory.TWO,
    EventCategory.THREE
  ],{
    required_error:'Please select one category'
    }),
  roles: z
    .array(z.enum([Role.STUDENT, Role.PARENT]))
    .min(1, { message: "Add at least one role" }),
});

export type EventSchemaType = z.infer<typeof EventSchema>;

export const defaultEvent = {
  title: "",
  start: new Date(),
  end: new Date(),
  startTime: "",
  endTime:"",
  location: "",
  description: "",
  roles: [],
  eventCategory: EventCategory.ONE,
};
