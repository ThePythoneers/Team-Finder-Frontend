import businessTeam from "@/assets/images/business team.png";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LogInCard } from "./components/logInCard";
import { SignUpCard } from "./components/signUpCard";

export function HomePage() {
  return (
    <>
      <main className="px-4 pt-4 h-screen lg:flex lg:justify-center lg:items-center">
        <Tabs
          defaultValue="logIn"
          className="md:max-w-[750px] md:mx-auto lg:mx-0 lg:min-w-[550px]"
        >
          <TabsList className="w-full h-auto">
            <TabsTrigger value="logIn" className="w-full text-lg lg:text-xl">
              Log In
            </TabsTrigger>
            <TabsTrigger value="signUp" className="w-full text-lg lg:text-xl">
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
