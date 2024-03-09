import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeOffIcon, EyeIcon, Loader2Icon, MapPinIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkOrganizationInvite, registerEmployee } from "@/api/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { NotFoundPage } from "../homePage/components/NotFoundPage";

const registerSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: "Username must be at least 4 characters.",
    })
    .max(50, {
      message: "Username can't be longer than 50 characters",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(50, {
      message: "Password can't be longer than 50 characters",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number",
    })
    .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
      message: "Password must contain at least one symbol",
    }),
});

const registerDefaultValues = {
  username: "",
  email: "",
  password: "",
};

export function RegisterEmployeePage() {
  const navigate = useNavigate();
  const params = useParams();
  const link_ref = params.organization_invite_id;

  const {
    data: organizationInfo,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => checkOrganizationInvite(link_ref),
    queryKey: ["organization", { link_ref }],
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const { mutateAsync: registerMutation, isPending: registerIsPending } =
    useMutation({
      mutationFn: registerEmployee,
    });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const body = { ...values, link_ref: link_ref };

    await registerMutation(body);
    form.reset(registerDefaultValues);
    navigate("/authentication/signIn");
  };
  if (isLoading)
    return (
      <>
        <main className="flex flex-col items-center p-16">
          <Skeleton className="h-[125px] w-full max-w-[700px] rounded-xl mb-16" />
          <Skeleton className="h-[325px] w-full max-w-[700px] rounded-xl" />
        </main>
      </>
    );
  if (error) return <NotFoundPage errorMsg={error.message} />;
  return (
    <>
      <main className="h-screen px-4 pt-36 md:mx-auto md:max-w-[800px]">
        <header className="flex justify-between mb-4">
          <h1 className="bg-primary text-primary-foreground rounded-md px-4 mx-2 font-bold">
            {organizationInfo.organization_name}
          </h1>
          <div className="flex items-center gap-2">
            <MapPinIcon /> <p>{organizationInfo.hq_address}</p>
          </div>
        </header>
        <h2 className="mb-6 text-xl md:text-2xl lg:text-3xl text-center">
          Congratulations! The organization
          <span className="rounded-md px-4 font-bold">
            {organizationInfo.organization_name}
          </span>
          invited you to be part of their team!
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel className="lg:text-lg">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Team Finder"
                      className="lg:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel className="lg:text-lg">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@example.com"
                      type="email"
                      className="lg:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="lg:text-lg" htmlFor="password">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center border border-input rounded-md ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                      <Input
                        id="passwordInput"
                        type={isPasswordVisible ? "text" : "password"}
                        {...field}
                        className="lg:text-base border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <Button
                        variant="ghost"
                        type="button"
                        size="icon"
                        className="mx-4 cursor-pointer"
                        onClick={() => setIsPasswordVisible((prev) => !prev)}
                      >
                        {isPasswordVisible ? (
                          <EyeIcon className="size-5" />
                        ) : (
                          <EyeOffIcon className="size-5" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <Button className="lg:text-lg" disabled={registerIsPending}>
                {registerIsPending && (
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                )}
                Sign Up
              </Button>
              <Button variant="ghost" className="lg:text-lg" asChild>
                <Link to="/">Not for you ?</Link>
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
}
