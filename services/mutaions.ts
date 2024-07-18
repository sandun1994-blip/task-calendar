import { createEvent } from "@/app/actions/create-event";
import { deleteEvent } from "@/app/actions/delete-event";
import { updateEvent } from "@/app/actions/update-event";
import { EventSchemaType } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateEvent(handleReset: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EventSchemaType) => {
      const event = await createEvent(data);
      if (event.error) {
        throw new Error(event.error);
      }
      if (event.fieldErrors?.title) {
        console.log(event.fieldErrors);

        throw new Error(event.fieldErrors?.title.toString());
      }
      if (event.data) {
        return event.data;
      }
    },

    onSuccess: (res) => {
      toast.success(`Event created successfully!`, {
        position: "top-right",
        className: "text-green-500",
        duration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      handleReset();
    },
    onError: (error, variables, context) => {
      console.log(error.message, 88);

      toast.error(error.message, {
        position: "top-right",
        duration: 5000,
      });
    },
    onSettled: () => {},
  });
}

export function useUpdateEvent(handleReset: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: Partial<EventSchemaType>;
      id: string;
    }) => {
      const event = await updateEvent(id, data);
      if (event.error) {
        throw new Error(event.error);
      }
      if (event.fieldErrors?.title) {
        console.log(event.fieldErrors);

        throw new Error(event.fieldErrors?.title.toString());
      }
      if (event.data) {
        return event.data;
      }
    },

    onSuccess: (data, variables) => {
      toast.success(`Event Updated successfully!`, {
        position: "top-right",
        className: "text-green-500",
        duration: 1000,
      });
      // queryClient.setQueryData(['events', { id: variables.id }], data)
      queryClient.invalidateQueries({ queryKey: ["events"] });
      handleReset();
    },
    onError: (error, variables, context) => {
      // console.log(error.message, 88);

      toast.error(error.message, {
        position: "top-right",
        duration: 3000,
      });
    },
    onSettled: () => {},
  });
}

export function useDeleteEvent(handleReset: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: string) => {
      const event = await deleteEvent(data);
      if (event.error) {
        throw new Error(event.error);
      }
      if (event.data) {
        return event.data;
      }
    },

    onSuccess: (res) => {
      toast.success(`Event deleted successfully!`, {
        position: "top-right",
        className: "text-green-500",
        duration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      handleReset();
    },
    onError: (error, variables, context) => {
      console.log(error.message, 88);

      toast.error(error.message, {
        position: "top-right",
        duration: 5000,
      });
    },
    onSettled: () => {},
  });
}
