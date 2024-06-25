import {format} from "date-fns";

export function datetimeFormatted(date :string){
    return format(new Date(date), " h:mm:ss, dd MMM yyyy")
}