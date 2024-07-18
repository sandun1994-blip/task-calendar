"use server";

import { EventSchema, EventSchemaType } from "@/schemas";
import { ReturnType } from "./type";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function updateEvent(
  id: string,
  data: Partial<EventSchemaType>
): Promise<ReturnType> {
  if (!id) {
    return {
      error: "Can not find Id",
    };
  }

  const { roles, ...rest } = data;

  let event;
  try {
    event = await db.event.update({
      where: { id },
      data: {
        ...rest,
        ...(data.roles && {
          roles: {
            deleteMany: {}, // Delete existing roles
            create: data.roles.map((role) => ({ role })), // Create new roles
          },
        }),
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
