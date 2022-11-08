// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    pocket: import("pocketbase").default;
    user: import("$lib/types").TwocketUser /* import("pocketbase").BaseAuthStore["model"] */;
  }
  // interface Platform {}
  // interface PrivateEnv {}
  // interface PublicEnv {}
}
