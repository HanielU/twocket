import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  return {
    user: { name: "Frankie Thorne", username: params.username },
  };
};
