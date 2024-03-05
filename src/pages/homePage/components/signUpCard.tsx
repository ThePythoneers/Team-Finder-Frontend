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
import { REGISTER_URL_ADMIN } from "@/api/URL";

const registerSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
  organization_name: z.string().min(4, {
    message: "Organization name must be at least 4 characters",
  }),
  hq_address: z.string().min(4, {
    message: "Headquarters address must be at least 4 characters",
  }),
});

export function SignUpCard() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      organization_name: "",
      hq_address: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const response = await fetch(REGISTER_URL_ADMIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("There was a problem");
      const data = await response.json();
      console.log(data);
      console.log("You registered with succes");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="lg:text-3xl">Sign Up</CardTitle>
          <CardDescription className="lg:text-lg">
            Create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg" htmlFor="password">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center border border-input rounded-md ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <Input
                          id="password"
                          type={isPasswordVisible ? "text" : "password"}
                          {...field}
                          className="border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-base"
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

              <FormField
                control={form.control}
                name="organization_name"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg">
                      Organization Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="ASSIST Software"
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
                name="hq_address"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="lg:text-lg">
                      Head Quarters Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Str. Zorilor"
                        className="lg:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="lg:text-lg">Sign Up</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
