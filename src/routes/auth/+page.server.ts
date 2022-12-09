import type { Actions, PageServerLoad } from "./$types";
import type { TwocketUser } from "$lib/types";
import { ClientResponseError } from "pocketbase";
import { error, invalid, redirect } from "@sveltejs/kit";
import { object, string } from "zod";

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
      "fullname",
      "username",
      "email",
      "password",
      "confirm-password",
    ].map(s => data.get(s)?.toString() as string);

    const UserRegisterSchema = object({
      fullname: string(),
      username: string(),
      email: string().email({ message: "This is not an email dawg" }),
      password: string().min(4),
      passwordConfirm: string().min(4),
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

      const user = await locals.pocket.collection("users").create<TwocketUser>({
        email,
        password,
        passwordConfirm,
        fullname,
        username,
      });

      console.dir({ user }, { depth: 10 });

      // await locals.pocket.collection("profiles").update(user.profile.id, {
      // });

      await locals.pocket.collection("users").authWithPassword(email, password);
    } catch (e) {
      console.dir(e, { depth: 10 });
      if (e instanceof ClientResponseError) {
        if (e.data.username.code === "validation_not_unique") {
          return invalid(401, { usernameTaken: true });
        } else if (e.data.email.code === "validation_invalid_email") {
          return invalid(401, { emailTaken: true });
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

    const UserLoginSchema = object({
      email: string().email({ message: "This is not an email dawg" }),
      password: string().min(4),
    });

    try {
      UserLoginSchema.parse({ email: userID, password });
      await locals.pocket
        .collection("users")
        .authWithPassword(userID, password);
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
