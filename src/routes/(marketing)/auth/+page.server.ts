import type { Actions, PageServerLoad } from "./$types";
import { error, invalid, redirect } from "@sveltejs/kit";
import { z } from "zod";
import type { TwocketUser } from "$lib/types";
import { ClientResponseError } from "pocketbase";

export const load: PageServerLoad = async ({ url, locals }) => {
  if (locals.user) {
    throw redirect(301, "/home");
  }

  const currentAuthType = (url.searchParams.get("q") || "login") as
    | "login"
    | "signup";
  return { currentAuthType };
};

export const actions: Actions = {
  // REGISTER ACTION
  register: async ({ request, locals }) => {
    const data = await request.formData();
    const [fullname, username, email, password, passwordConfirm] = [
      "name",
      "username",
      "email",
      "password",
      "confirm-password",
    ].map(s => data.get(s)?.toString() as string);

    const UserRegisterSchema = z.object({
      fullname: z.string(),
      username: z.string(),
      email: z.string().email({ message: "This is not an email dawg" }),
      password: z.string().min(4),
      passwordConfirm: z.string().min(4),
    });

    try {
      UserRegisterSchema.parse({
        fullname,
        username,
        email,
        password,
        passwordConfirm,
      });

      if (password !== passwordConfirm)
        return invalid(401, { passwordMissmatch: true });

      const user = (await locals.pocket.users.create({
        email,
        password,
        passwordConfirm,
      })) as TwocketUser;

      await locals.pocket.records.update("profiles", user.profile.id, {
        fullname,
        username,
      });

      await locals.pocket.users.authViaEmail(email, password);
    } catch (e) {
      console.dir(e, { depth: 10 });
      if (e instanceof ClientResponseError) {
        if (e.data.username.code === "validation_not_unique") {
          return invalid(401, { usernameTaken: true });
        } else if (e.data.email) {
          return invalid(401);
        }
      } else {
        throw error(401, "Unknown error occured");
      }
    }

    throw redirect(301, "/home");
  },

  // LOGIN ACTION
  login: async ({ request, locals }) => {
    const data = await request.formData();
    const [userID, password] = ["userid", "password"].map(
      s => data.get(s)?.toString() as string
    );

    const UserLoginSchema = z.object({
      email: z.string().email({ message: "This is not an email dawg" }),
      password: z.string().min(4),
    });

    try {
      UserLoginSchema.parse({ email: userID, password });
      await locals.pocket.users.authViaEmail(userID, password);
      // console.log(res.token);
    } catch (e) {
      console.log((<Error>e).message);
      return invalid(401);
    }

    throw redirect(301, "/home");
  },

  logout: async ({ locals }) => {
    // logout the user
    locals.pocket.authStore.clear();
    throw redirect(301, "/");
  },
};
