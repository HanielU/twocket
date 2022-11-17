import type { AppRouter } from "$trpc"; // 👈 only the types are imported from the server
import type { LoadEvent } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { browser } from "$app/environment";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

const url = browser ? "/trpc" : "http://localhost:5173/trpc";

export const trpc = (params?: {
  loadFetch?: LoadEvent["fetch"];
  headers?: RequestEvent["request"]["headers"];
}) => {
  const loadFetch = params?.loadFetch;

  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: loadFetch ? "/trpc" : url,
        headers() {
          if (params?.headers) {
            const cookie = params.headers.get("cookie");

            return {
              // spreading headers doesn't work, so I have to get the cookie manually
              cookie: `${cookie}`,

              // optional - inform server that it's an ssr request
              "x-ssr": "1",
            };
          }
          return {};
        },
      }),
    ],
    ...(loadFetch && { fetch: loadFetch as typeof fetch }),
  });
};
