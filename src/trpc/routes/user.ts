import { t } from "$trpc/app-router";
import { z } from "zod";

export default t.router({
  create: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(4),
        passwordConfirm: z.string().min(4),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newUser = await ctx.locals.pocket.users
        .create({
          ...input,
        })
        .catch(e => {
          console.log(e.message);
          return null;
        });

      /* const updatedProfile = await ctx.locals.pocket.records.create(
      "profiles",
      newUser.profile?.id,
      {
        name: "Try me out bro",
      }
    ); */

      return newUser;
    }),
});
