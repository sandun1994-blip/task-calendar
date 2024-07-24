import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { defaultEvent, EventSchema, EventSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import moment from "moment";
import { useCreateEvent, useUpdateEvent } from "@/services/mutaions";
import { Trash, Trash2Icon } from "lucide-react";
import { AlertDialogBox } from "./alert-box";
import { MultiSelect } from "../multi-select";
import { Options } from "@/data/data";
import { EventCategory, Role } from "@prisma/client";
import { DatePicker } from "../date-picker";
import {  timezoneFormat } from "@/lib/utils";

interface EventDataType extends EventSchemaType {
  id?: string | number;
}

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedEvent: EventDataType;
  handleClose: () => void;
  setSelectedEvent: Dispatch<SetStateAction<EventDataType>>
};

const EventForm = ({ open, setOpen, selectedEvent, handleClose,setSelectedEvent }: Props) => {
  const handleReset = () => {
    setOpen((pre) => !pre);
    setSelectedEvent(defaultEvent);
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
      updateEvent({
        data: {
          ...values,
          start: timezoneFormat(values.start, values.startTime),
          end: timezoneFormat(values.end, values.endTime),
        },
        id: selectedEvent.id as string,
      });
    } else {
      createEvent({
        ...values,
        start: timezoneFormat(values.start, values.startTime),
        end: timezoneFormat(values.end, values.endTime),
      });
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
                  <div className=" flex justify-between">
                    <FormField
                      control={form.control}
                      name="start"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <DatePicker
                              date={field.value}
                              setDate={field.onChange}
                            />
                            {/* <Input
                            {...field}
                            value={moment(field.value).format("YYYY-MM-DD")}
                            
                          /> */}
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
                            <DatePicker
                              date={field.value}
                              setDate={field.onChange}
                              shape={`ml-4`}
                            />
                            {/* <Input
                            {...field}
                            value={moment(field.value).format("YYYY-MM-DD")}
                            
                          /> */}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="roles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roles</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={Options}
                            onValueChange={field.onChange}
                            className="w-[360px]"
                            placeholder={"Add Roles"}
                            variant="inverted"
                            animation={2}
                            maxCount={3}
                            defaultValue={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-[360px]">
                    <FormField
                      control={form.control}
                      name="eventCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="space-y-5">
                              <SelectItem
                                value={EventCategory.ONE}
                                className="bg-red-500 mb-2 hover:bg-red-300"
                              >
                                {EventCategory.ONE}
                              </SelectItem>
                              <SelectItem
                                value={EventCategory.TWO}
                                className="bg-blue-500 mb-2 hover:bg-blue-300"
                              >
                                {EventCategory.TWO}
                              </SelectItem>
                              <SelectItem
                                value={EventCategory.THREE}
                                className="bg-green-500 mb-2 hover:bg-green-300"
                              >
                                {EventCategory.THREE}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            You can choose one category.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-5 justify-between">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
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

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
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
