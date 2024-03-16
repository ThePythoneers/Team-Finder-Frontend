import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import { EyeOffIcon, EyeIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "@/api/auth";
import { Link, useNavigate } from "react-router-dom";

const loginSchema = z.object({
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

const signInDefaultValues = {
  email: "",
  password: "",
};

export function SignInCard() {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: signInDefaultValues,
  });
  const { mutateAsync: signInMutation, isPending: signInIsPending } =
    useMutation({
      mutationFn: signInUser,
    });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const data = await signInMutation(values);
    if (!data) return;
    signIn({
      auth: {
        token: data.access_token,
        type: data.token_type,
      },
      userState: { ...data.user },
    });
    form.reset(signInDefaultValues);
    navigate(`/${data.user.organization_name}`);
  };
  return (
    <>
      <Card className="w-full md:max-w-[500px] md:mx-auto lg:mx-0">
        <CardHeader>
          <CardTitle className="lg:text-3xl">Sign In</CardTitle>
          <CardDescription className="lg:text-lg">
            Don't miss out on what awaits you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        {...field}
                        className="lg:text-base"
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
                    <FormLabel className="lg:text-lg" htmlFor="passwordInput">
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
              <div className="flex items-center justify-between">
                <Button className="lg:text-lg" disabled={signInIsPending}>
                  {signInIsPending && (
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                  )}
                  Sign In
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/">Don't have an account ?</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
