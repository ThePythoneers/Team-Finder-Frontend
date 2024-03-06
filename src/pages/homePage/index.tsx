import businessTeam from "@/assets/images/business team.png";
import { SignUpCard } from "./components/signUpCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export function HomePage() {
  useAuthRedirect();
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur min-h-12 py-2 px-4 flex items-center justify-between border-b border-border/40 bg-background/25 md:px-[10%]">
        <Button className="ml-auto" size="lg" variant="ghost" asChild>
          <Link to={"/authentication/signIn"}>Sign In</Link>
        </Button>
      </nav>

      <main className="mx-4 mb-6 lg:mt-20 lg:flex lg:justify-center lg:items-center">
        <h1 className="md:max-w-[750px] md:mx-auto lg:hidden text-lg md:text-4xl md:py-4 text-center">
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
          <h1 className="hidden lg:block text-4xl lg:leading-normal xl:text-5xl xl:leading-normal">
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
            className="mx-auto lg:mx-0 lg:w-full"
          />
        </div>
      </main>
    </>
  );
}
