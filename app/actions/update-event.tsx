"use server";

import { EventSchema, EventSchemaType } from "@/schemas";
import { ReturnType } from "./type";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function updateEvent(id:string,data: EventSchemaType): Promise<ReturnType> {
  const validationResult = EventSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      error: "Field Error",
    };
  }

  let event;

  try {
    event = await db.event.update({
        where:{id},
      data: {
        ...data,
        roles: {
            deleteMany: {}, // Delete existing roles
            create: data.roles.map((role) => ({ role })), // Create new roles
        },
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update.",
    };
  }

  return { data: event };
}
