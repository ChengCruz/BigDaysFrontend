// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { bigDays } from "./data/bigDays";
import { guests } from "./data/guests";
import { tables } from "./data/tables";
import { rsvps } from "./data/rsvps";
import { menus } from "./data/menus";

// "proxy": "https://v5yyi5bfh9.execute-api.ap-southeast-1.amazonaws.com"

export const handlers = [

  http.get("/api/bigdays", () => {
    // Construct a JSON response with the list of all posts
    // as the response body.
    // return HttpResponse.json(Array.from(bigDays.values()))
    console.log("in bigdays");
    return HttpResponse.json(bigDays, { status: 200 });
  }),
  http.post("/api/bigdays", async ({ request }) => {
    const data: any = await request.json();

    const newBigDay = {
      ...data,
      id: bigDays.length + 1,
    };
    bigDays.push(newBigDay);
    return HttpResponse.json(newBigDay, { status: 201 });
  }),
  http.put("/api/bigdays/:id", async ({ request, params }) => {
    const data: any = await request.json();
    const { id } = params;
    const index = bigDays.findIndex((b) => b.id === id);
    if (index !== -1) {
      bigDays[index] = { ...data, id: id };
      return HttpResponse.json(bigDays[index], { status: 200 });
    }
    return new HttpResponse(null, { status: 404 });
    // const updated =bigDays.map((bigday) => (bigday.id === id ? { ...data } : bigday));
  }),
  http.delete('/api/bigdays/:id', async({ params }) => {
    const { id } = params;
    const index = bigDays.findIndex(b => b.id === (id));
    if (index !== -1) {
      bigDays.splice(index, 1);
      return new HttpResponse(null, { status: 204 });
    }
    return new HttpResponse('Bigday not found', { status: 404 });
  }),

  // Guests Handlers
  http.get("/api/guests", () => {
    return HttpResponse.json(guests, { status: 200 });
  }),
  http.post("/api/guests", async ({ request }) => {
    const data: any = await request.json();
    const newGuest = {
      ...data,
      id: guests.length + 1,
    };
    guests.push(newGuest);
    return HttpResponse.json(newGuest, { status: 201 });
  }),
  http.put("/api/guests/:id", async ({ request, params }) => {
    const data: any = await request.json();
    const { id } = params;
    const index = guests.findIndex((b) => b.id === id);
    if (index !== -1) {
      guests[index] = { ...data, id: id };
      return HttpResponse.json(guests[index], { status: 200 });
    }
    return new HttpResponse(null, { status: 404 });
  }),
  http.delete('/api/guests/:id', async({ params }) => {
    const { id } = params;
    const index = guests.findIndex(b => b.id === (id));
    if (index !== -1) {
      guests.splice(index, 1);
      return new HttpResponse(null, { status: 204 });
    }
    return new HttpResponse('Guest not found', { status: 404 });
  }),

  // Tables Handlers
  http.get("/api/tables", () => {
    return HttpResponse.json(tables, { status: 200 });
  }),

  // RSVPs Handlers
  http.get("/api/rsvps", () => {
    return HttpResponse.json(rsvps, { status: 200 });
  }),
  // Menus Handlers
  http.get("/api/menus", () => {
    return HttpResponse.json(menus, { status: 200 });
  }),
];
