<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
  $: userAction = data.currentAuthType == "login" ? "Login" : "Sign up";
  let loading = false;
  let showPassword = false;
</script>

<div
  class="px-4 grid items-center h-50vh min-h-600px absolute top-0 left-0 w-full"
>
  <div class="w-full px-6">
    <h1 class="font-semibold text-2xl mb-5">
      {userAction}
    </h1>

    <form
      class="flex flex-col gap-4 [&_>_input]:border max-w-sm mx-auto"
      method="post"
      action={data.currentAuthType == "signup" ? "?/register" : "?/login"}
      use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          await update({ reset: false });
          loading = false;
        };
      }}
    >
      <!-- shows only during sign up -->
      <input
        class:hidden={data.currentAuthType !== "signup"}
        class="px-4 h-3rem bg-base-100 w-full rounded-lg"
        placeholder="Name"
        name="name"
        type="text"
        required={!(data.currentAuthType !== "signup")}
      />

      <!-- shows only during sign up -->
      <div class:hidden={data.currentAuthType !== "signup"}>
        <input
          class="px-4 h-3rem bg-base-100 w-full rounded-lg"
          placeholder="Username (must be unique)"
          name="username"
          type="text"
          required={!(data.currentAuthType !== "signup")}
        />

        {#if form?.usernameTaken}
          <p>Username must be unique</p>
        {/if}
      </div>

      <input
        class="px-4 h-3rem bg-base-100 w-full rounded-lg"
        placeholder={data.currentAuthType == "login"
          ? "Email or Username"
          : "Email"}
        name={data.currentAuthType == "login" ? "userid" : "email"}
        type="text"
        required
      />

      <div class="relative">
        <input
          class="pl-4 pr-8 h-3rem bg-base-100 w-full rounded-lg"
          placeholder="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          required
        />

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- showPassword icon -->
        <div
          class="absolute right-0 top-0 h-full px-5 flex-u-center"
          on:click={() => (showPassword = !showPassword)}
        >
          <div
            class="transition-all"
            class:i-ri-eye-close-line={!showPassword}
            class:i-ri-eye-line={showPassword}
          />
        </div>
      </div>

      <!-- shows only during sign up -->
      <input
        class:hidden={data.currentAuthType !== "signup"}
        class="px-4 h-3rem bg-base-100 w-full rounded-lg"
        placeholder="Confirm Password"
        name="confirm-password"
        type="password"
        required={!(data.currentAuthType !== "signup")}
      />

      <button class="bg-primary text-primary-content w-full py-1.8 rounded-lg">
        <div class="flex-u-center">
          {userAction}

          <div class="animate-spin ml-2 hidden" class:flex={loading}>
            <div class="i-prime-spinner" />
          </div>
        </div>
      </button>

      <p>
        {data.currentAuthType == "login"
          ? "Don't have an account"
          : "Already have an account?"}
        <a
          class="text-accent-focus underline"
          href="/auth?q={data.currentAuthType == 'login' ? 'signup' : 'login'}"
        >
          {userAction == "Login" ? "Sign Up" : "Login"}
        </a>
      </p>
    </form>
  </div>
</div>
