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
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { LOGIN_URL } from "@/api/URL";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
});

export function LogInCard() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signIn = useSignIn();
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=password&clientId=my-trusted-client&username=${values.email}&password=${values.password}&scope=user_info`,
      });
      if (!response.ok) throw new Error("There was a problem");
      const data = await response.json();
      signIn({
        auth: {
          token: data.access_token,
          type: data.token_type,
        },
        userState: {
          user_id: data.id,
          username: data.username,
          email: data.email,
          organization_id: data.organization_id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="lg:text-3xl">Log In</CardTitle>
          <CardDescription className="lg:text-lg">
            Put your credidentials to authenticate you
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

              <Button className="lg:text-lg">Log In</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
