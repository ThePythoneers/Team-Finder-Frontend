import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { SignInCard } from "./components/signInCard";

export function SignInPage() {
  useAuthRedirect();
  return (
    <>
      <main className="h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="text-lg text-center md:text-3xl lg:text-4xl lg:leading-normal xl:text-5xl xl:leading-normal">
          Discover Your
          <span className="bg-primary text-primary-foreground rounded-md px-4 mx-2 font-bold">
            Perfect
          </span>
          <span className="bg-primary text-primary-foreground rounded-md px-4 mr-2 font-bold">
            Squad
          </span>
          with Ease!
        </h1>
        <SignInCard />
      </main>
    </>
  );
}
