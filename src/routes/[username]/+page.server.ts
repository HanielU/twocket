import { trpc } from "$trpc/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, request }) => {
  const user = await trpc({ headers: request.headers }).user.get.query({
    username: params.username,
  });

  console.log("user", user);

  return {
    user: { name: "Frankie Thorne", username: params.username },
  };
};
