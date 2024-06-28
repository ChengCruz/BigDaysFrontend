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

export const handlers = [
    http.get('/api/users', ()=> {
        // resolver.request
        return HttpResponse.json([
            {id:1, name: 'cruz'}
        ])
    }),
  // Intercept "GET https://example.com/user" requests...
//   http.get("https://example.com/user", () => {
//     // ...and respond to them using this JSON response.
//     console.log("trigg");
//     return HttpResponse.json({
//       id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
//       firstName: "John",
//       lastName: "Maverick",
//     });
//   }),
//   http.get("/resource", () => HttpResponse.json({ id: "abc-123" })),
//   http.get("/api/bigdays", () => {
//     return HttpResponse.json(bigDays);
// //   }),
// http.get('/posts', () => {
//     // Response resolver allows you to react to captured requests,
//     // respond with mock responses or passthrough requests entirely.
//     // For now, let's just print a message to the console.
//     console.log('Captured a "GET /posts" request')
//   }),
http.get('/api/bigdays', () => {
    // Construct a JSON response with the list of all posts
    // as the response body.
    // return HttpResponse.json(Array.from(bigDays.values()))
    console.log('in bigdays')
    return HttpResponse.json(bigDays, { status: 200 })

  }),
];
