import PocketBase from "pocketbase";
import type { Handle } from "@sveltejs/kit";
import type { TwocketUser } from "$lib/types";
import { appRouter as trpcRouter } from "$trpc";
import { createContext } from "$trpc/app-router";
import { createTRPCHandle } from "trpc-sveltekit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pocket = new PocketBase("http://127.0.0.1:8090"); // initialise client

  // get users auth state from the jwt cookie stored
  event.locals.pocket.authStore.loadFromCookie(
    event.request.headers.get("cookie") || ""
  );

  console.log("(hooks)authStoreValid:", event.locals.pocket.authStore.isValid);

  // update user state based on authstore
  if (event.locals.pocket.authStore.isValid) {
    event.locals.user = event.locals.pocket.authStore.model as TwocketUser;
  }

  const response = await createTRPCHandle({
    url: "/trpc",
    router: trpcRouter,
    createContext,
    event,
    resolve,
  });

  response.headers.set(
    "set-cookie",
    event.locals.pocket.authStore.exportToCookie()
  );

  return response;
};
