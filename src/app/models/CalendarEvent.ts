import { EventColor } from "calendar-utils";


export interface CalendarEvent<MetaType = any> {
    start: Date;
    end: Date;
    title: string;
    color: EventColor;
}