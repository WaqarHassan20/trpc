import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
      headers() {
        return {
          Authorization: "Bearer 123",
        };
      },
    }),
  ],
});

async function main() {
  const response = await trpc.createTodo.mutate({
    title: "Go to gym",
    description: "As a man, avoid the drama and hit the gym",
  });
  console.log("Todo created with id : ", response.id);

  const signUpResponse = await trpc.signUp.mutate({
    email: "OneTwoThree@gmail.com",
    password: "SecurePassword123",
  });
  console.log(signUpResponse);
}

await main();
