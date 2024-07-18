import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { defaultEvent, EventSchema, EventSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import moment from "moment";
import {
  useCreateEvent,
  useUpdateEvent,
} from "@/services/mutaions";
import { Trash, Trash2Icon } from "lucide-react";
import { AlertDialogBox } from "./alert-box";

interface EventDataType extends EventSchemaType {
  id?: string | number;
}

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedEvent: EventDataType;
  handleClose: () => void;
};

const EventForm = ({ open, setOpen, selectedEvent, handleClose }: Props) => {
  const handleReset = () => {
    setOpen((pre) => !pre);
  };
  const id = selectedEvent?.id;
  const { mutate: createEvent, isPending: createStatus } =
    useCreateEvent(handleReset);
  const { mutate: updateEvent, isPending: updateStatus } =
    useUpdateEvent(handleReset);

  const [alertOpen, setAlertOpen] = useState(false);

  const defaultFormData = useMemo(() => {
    if (selectedEvent.id) {
      return selectedEvent;
    }
    return {
      ...defaultEvent,
      start: selectedEvent.start,
      end: selectedEvent.end,
    };
  }, [selectedEvent]);

  const form = useForm<EventSchemaType>({
    resolver: zodResolver(EventSchema),
    defaultValues: defaultFormData,
  });

  const onSubmit = (values: EventSchemaType) => {
    if (selectedEvent?.id) {
      // update
      updateEvent({ data: values, id: selectedEvent.id as string });
    } else {
      console.log("add", values);
      createEvent(values);
      // create
    }
  };

  return (
    <>
      {id && alertOpen && (
        <AlertDialogBox
          id={id}
          open={alertOpen}
          setOpen={setAlertOpen}
          handleReset={handleReset}
        />
      )}
      <Dialog onOpenChange={handleClose} open={open}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent?.id ? "Edit" : "Add"} Event
            </DialogTitle>

            <DialogDescription>
              {selectedEvent?.id ? "Make changes to" : "Add"} your event here.
              Click save when you are done.
            </DialogDescription>
            {id && (
              <div className="absolute right-10 top-8">
                <Button
                  variant={"ghost"}
                  color="red"
                  onClick={() => {
                    setAlertOpen((pre) => !pre);
                  }}
                >
                  <Trash2Icon className="text-red-600" />
                </Button>
              </div>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Type your title here"
                            type="text"

                            //disabled={isPending || isPendingTwo}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Type your description here."
                            //disabled={isPending || isPendingTwo}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Type your location here."
                            //disabled={isPending || isPendingTwo}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={moment(field.value).format("YYYY-MM-DD")}
                            readOnly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="end"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={moment(field.value).format("YYYY-MM-DD")}
                            readOnly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="time" // Set type to 'time' for time input
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full border-b-0 mt-5"
                  disabled={createStatus || updateStatus}
                >
                  Save
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventForm;
