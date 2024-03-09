import businessTeam from "@/assets/svg/Collaboration-cuate.svg";
import { SignUpCard } from "./components/signUpCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export function HomePage() {
  useAuthRedirect();
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur min-h-12 py-2 px-4 flex items-center justify-between border-b border-border/40 bg-background/25 md:px-[10%]">
        <Button className="ml-auto" variant="ghost" asChild>
          <Link to={"/authentication/signIn"}>Sign In</Link>
        </Button>
      </nav>

      <main className="mx-4 lg:mt-20 lg:flex lg:justify-center lg:items-center">
        <h1 className="text-lg text-center md:max-w-[750px] md:mx-auto md:text-4xl md:py-4 lg:hidden  ">
          Discover Your
          <span className="bg-primary text-primary-foreground rounded-md px-4 mx-2 font-bold">
            Perfect
          </span>
          <span className="bg-primary text-primary-foreground rounded-md px-4 mr-2 font-bold">
            Squad
          </span>
          with Ease!
        </h1>
        <SignUpCard />

        <div className="flex flex-col items-center justify-center mx-4">
          <h1 className="hidden text-4xl lg:block lg:leading-normal xl:text-5xl xl:leading-normal">
            Discover Your
            <span className="bg-primary text-primary-foreground rounded-md px-4 mx-2 font-bold">
              Perfect
            </span>
            <span className="bg-primary text-primary-foreground rounded-md px-4 mr-2 font-bold">
              Squad
            </span>
            with Ease!
          </h1>

          <img
            src={businessTeam}
            alt="businessTeam"
            className="mx-auto pointer-events-none select-none w-[75%] lg:mx-0 "
          />
        </div>
      </main>
    </>
  );
}
