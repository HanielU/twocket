import { trpc } from "$trpc/client";
import { invalid, redirect } from "@sveltejs/kit";
import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, locals }) => {
  if (locals.user) {
    throw redirect(301, "/home");
  }

  const authType = (url.searchParams.get("q") || "login") as "login" | "signup";
  return { authType };
};

export const actions: Actions = {
  register: async ({ request, locals }) => {
    const data = await request.formData();
    const [email, password, passwordConfirm] = [
      "email",
      "password",
      "confirm-password",
    ].map(s => data.get(s)?.toString() as string);

    if (password !== passwordConfirm) return invalid(401);

    try {
      const user = await trpc().user.create.mutate({
        email,
        password,
        passwordConfirm,
      });
      console.log(user);
      await locals.pocket.users.authViaEmail(email, password);
    } catch (e) {
      console.log((<Error>e).message);
    }
  },

  login: async ({ request, locals }) => {
    const data = await request.formData();
    const [userID, password] = ["username", "password"].map(
      s => data.get(s)?.toString() as string
    );

    const UserLoginSchema = z.object({
      email: z.string().email({ message: "This is not an email dawg" }),
      password: z.string().min(4),
    });

    // const emailSchema = z.string().email({ message: "This is not an email bozo" })
    // const usernameSchema = z.string()

    try {
      UserLoginSchema.parse({ email: userID, password });
      await locals.pocket.users.authViaEmail(userID, password);
    } catch (e) {
      console.log((<Error>e).message);
    }
  },
};
