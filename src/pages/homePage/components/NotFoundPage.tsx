import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import notFoundIMG from "@/assets/images/404.jpg";

type NotFoundPageProps = {
  errorMsg?: string;
};

export function NotFoundPage({ errorMsg }: NotFoundPageProps) {
  return (
    <>
      <main className="container h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold text-center">
          {errorMsg ? errorMsg : "404 NOT FOUND"}
        </h1>
        <Button className="text-4xl py-6" asChild>
          <Link to="/">Go back to safety</Link>
        </Button>
        <img
          src={notFoundIMG}
          alt="404 Not Found Image"
          className="w-[50%] rounded-lg"
        />
      </main>
    </>
  );
}
