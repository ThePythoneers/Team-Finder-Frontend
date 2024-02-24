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
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
});

export function LogInCard() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);
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
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg">Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center border border-input rounded-md ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <Input
                          id="password"
                          type={isPasswordVisible ? "text" : "password"}
                          {...field}
                          className="lg:text-base border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Label
                          htmlFor="password"
                          className="mx-4 cursor-pointer"
                          onClick={() => setIsPasswordVisible((prev) => !prev)}
                        >
                          {isPasswordVisible ? (
                            <EyeOpenIcon />
                          ) : (
                            <EyeNoneIcon />
                          )}
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mt-2 lg:text-lg">Log In</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
