import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkRoles = (roles: string[], selectRoles: string[]) => {
  for (let value of roles) {
    if (selectRoles.includes(value)) {
      return true;
    }
  }

  return false;
};


export const addDate =(d:Date)=>{
  const endDate = moment(d);
  endDate.add(1, 'days');

  return endDate
}

export const formattedDate =(str:string)=> {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

export const timezoneFormat  =(date:Date,time:string)=>{
  const year = date.getFullYear();
  const month = date.getMonth(); // Month is zero-based in JavaScript
  const day = date.getDate();

  // Split the newTime string to get hours, minutes, and seconds
  const [hours, minutes, ] = time.split(':').map(Number);


  // Create a new Date object with the original date components and updated time
  const modifiedDate = new Date(year, month, day, hours, minutes, 0);


  return modifiedDate;
}

export const  getTime=(date:Date)=>{
  const dateObj = new Date(date);

  // Get hours, minutes, and seconds
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');
  
  // Formatted time string
  return  `${hours}:${minutes}`;
}