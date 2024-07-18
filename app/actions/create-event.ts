"use server";

import { EventSchema, EventSchemaType } from "@/schemas";
import { ReturnType } from "./type";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createEvent(data: EventSchemaType): Promise<ReturnType> {
  const validationResult = EventSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      error: "Field Error",
    };
  }

  let event;

  try {
    event = await db.event.create({
      data: {
        ...data,
        roles: {
          create: data.roles.map((role) => ({ role })),
        },
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create.",
    };
  }


  return { data: event };
}
