import type { TwocketUser } from "$lib/types";
import { t } from "$trpc/app-router";
import { invalid } from "@sveltejs/kit";
import { z } from "zod";

export default t.router({
  isLoggedIn: t.procedure.query(async ({ ctx }) => {
    const user = ctx.locals.pocket.authStore.isValid;
    console.log(user);
    return !!user;
  }),

  get: t.procedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      // console.log("query:", ctx.locals.pocket.authStore.isValid);
      return await ctx.locals.pocket
        .collection("users")
        .getFirstListItem<TwocketUser>(
          `username = "${input.username}"`
        )
        .catch(e => {
          // console.log(e);
          return null;
        });
    }),

  createCollection: t.procedure.mutation(async ({ ctx }) => {
    await ctx.locals.pocket.admins.authWithPassword(
      "hanieltobi@gmail.com",
      "haniel2004"
    );
    return await ctx.locals.pocket.collections.create({
      name: "demo",
      schema: [
        {
          name: "title",
          type: "text",
          required: true,
          options: {
            min: 10,
          },
        },
        {
          name: "status",
          type: "bool",
        },
      ],
    });
  }),

  //
  //
  signup: t.procedure
    .input(
      z.object({
        fullname: z.string(),
        username: z.string(),
        email: z
          .string()
          .email({ message: "This is not an email dawg" }),
        password: z.string().min(4),
        passwordConfirm: z.string().min(4),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { fullname, username, email, password, passwordConfirm } =
        input;
      if (password !== passwordConfirm)
        return invalid(401, { passwordMissmatch: true });

      const user = await ctx.locals.pocket
        .collection("users")
        .create<TwocketUser>({
          email,
          password,
          passwordConfirm,
        });

      await ctx.locals.pocket
        .collection("users")
        .update(user.profile.id, {
          fullname,
          username,
        });

      await ctx.locals.pocket
        .collection("users")
        .authWithPassword(email, password);
    }),
});
