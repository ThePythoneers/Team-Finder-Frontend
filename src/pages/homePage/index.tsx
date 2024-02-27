import businessTeam from "@/assets/images/business team.png";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { LogInCard } from "./components/logInCard";
import { SignUpCard } from "./components/signUpCard";

export function HomePage() {
  return (
    <>
      <main className="px-4 pt-4 h-screen lg:flex lg:justify-center lg:items-center">
        <Tabs
          defaultValue="logIn"
          className="lg:min-w-[550px] md:max-w-[750px] md:mx-auto lg:mx-0"
        >
          <TabsList className="w-full mb-2 md:h-auto">
            <TabsTrigger value="logIn" className="w-full md:text-xl">
              Log In
            </TabsTrigger>
            <TabsTrigger value="signUp" className="w-full md:text-xl">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="logIn">
            <LogInCard />
          </TabsContent>
          <TabsContent value="signUp">
            <SignUpCard />
          </TabsContent>
        </Tabs>
        <img
          src={businessTeam}
          alt="businessTeam"
          className="mx-auto lg:mx-0 lg:w-[40%]"
        />
      </main>
    </>
  );
}
