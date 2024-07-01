export interface RSVP {
    id?: string;
    guestName: string;
    status: string;
    guestType?: string;  // Include guestType field
    eventHashKey?: string;
  }