import PocketBase from "pocketbase";
import type { Handle } from "@sveltejs/kit";
import { appRouter as trpcRouter } from "$trpc";
import { createContext } from "$trpc/app-router";
import { createTRPCHandle } from "trpc-sveltekit";
import { sequence } from "@sveltejs/kit/hooks";

const trpcHandle: Handle = async ({ event, resolve }) => {
  // 👇 add this handle
  const response = await createTRPCHandle({
    url: "/trpc",
    router: trpcRouter,
    createContext,
    event,
    resolve,
  });

  return response;
};

const pocketHandle: Handle = async ({ event, resolve }) => {
  event.locals.pocket = new PocketBase("http://127.0.0.1:8090"); // initialise client

  // get users auth state from the jwt cookie stored
  event.locals.pocket.authStore.loadFromCookie(
    event.request.headers.get("cookie") || ""
  );

  // update user state based on authstore
  if (event.locals.pocket.authStore.isValid) {
    event.locals.user = event.locals.pocket.authStore.model;
  }

  // await event.locals.pocket.admins.authViaEmail(
  //   "hanieltobi@gmail.com",
  //   "mWyE8HNn!7bFpxV"
  // );

  const response = await resolve(event);
  response.headers.set(
    "set-cookie",
    event.locals.pocket.authStore.exportToCookie()
  );

  return response;
};

export const handle = sequence(pocketHandle, trpcHandle);
