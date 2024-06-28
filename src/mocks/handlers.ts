// import { rest } from 'msw';
// import { bigDays } from './data/bigDays';

// export const handlers = [
//   rest.get('/api/bigdays', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(bigDays));
//   }),
// ];

// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { bigDays } from "./data/bigDays";
import { guests } from "./data/guests";
import { tables } from "./data/tables";
import { rsvps } from "./data/rsvps";
import { menus } from "./data/menus";

export const handlers = [
  http.get("/api/users", () => {
    // resolver.request
    return HttpResponse.json([{ id: 1, name: "cruz" }]);
  }),

  http.get("/api/bigdays", () => {
    // Construct a JSON response with the list of all posts
    // as the response body.
    // return HttpResponse.json(Array.from(bigDays.values()))
    console.log("in bigdays");
    return HttpResponse.json(bigDays, { status: 200 });
  }),

  // Guests Handlers
  http.get("/api/guests", () => {
    return HttpResponse.json(guests, { status: 200 });
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
