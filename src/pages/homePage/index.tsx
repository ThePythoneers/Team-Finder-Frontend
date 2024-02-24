import businessTeam from "@/assets/images/business team.png";
import logo from "@/assets/images/logo.jpg";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { LogInCard } from "./components/logInCard";
import { SignUpCard } from "./components/signUpCard";

export function HomePage() {
  return (
    <>
      <header className="p-4 flex items-center">
        <img src={logo} alt="logo" className="h-16 w-16 rounded-full" />
        Happy to see you
      </header>
      <main className="m-4 lg:flex lg:justify-center lg:items-center lg:max-h-[1000px]">
        <Tabs defaultValue="logIn" className="lg:min-w-[550px]">
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
        <img src={businessTeam} alt="businessTeam" className="mx-auto lg:mx-0 lg:w-[40%]" />
      </main>
    </>
  );
}
