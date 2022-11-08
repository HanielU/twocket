import { t } from "$trpc/app-router";
// import { z } from "zod";

export default t.router({
  isLoggedIn: t.procedure.query(async ({ ctx }) => {
    const user = ctx.locals.pocket.authStore.isValid;
    console.log(user);
    return !!user;
  }),

  get: t.procedure.query(async ({ ctx }) => {
    return ctx.locals.user;
  }),
});
