import { initTRPC } from "@trpc/server";
import type { inferAsyncReturnType } from "@trpc/server";
import type { RequestEvent } from "@sveltejs/kit";

export const createContext = async (event: RequestEvent) => {
  return {
    ...event,
  };
};

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

// const isAuthed = t.middleware(async ({ next, ctx }) => {
//   console.log(ctx.request.headers.get("cookie"));
//   return next();
// });

// export const authedProcedure = t.procedure.use(isAuthed);
