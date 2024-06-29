import { Guest } from "./Guest";

export interface Table {
    id?: string;
    number: string;
    capacity: number;
    guests: Guest[]
  }