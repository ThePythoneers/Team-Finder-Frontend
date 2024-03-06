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
import { useMutation } from "@tanstack/react-query";
import { registerAdminUser } from "@/api/auth";
import { toast } from "sonner";
import { serverErrorMsg } from "@/api/URL";
import { useNavigate } from "react-router-dom";

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
  organization_name: z.string().min(4, {
    message: "Organization name must be at least 4 characters",
  }),
  hq_address: z.string().min(4, {
    message: "Headquarters address must be at least 4 characters",
  }),
});

const registerDefaultValues = {
  username: "",
  email: "",
  password: "",
  organization_name: "",
  hq_address: "",
};

export function SignUpCard() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });
  const { mutateAsync: registerMutation, isPending: registerIsPending } =
    useMutation({
      mutationFn: registerAdminUser,
    });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await registerMutation(values);
      form.reset(registerDefaultValues);
      toast.success("You registered with succes");
      navigate("/authentication/signIn");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Failed to fetch")
          return toast.warning(serverErrorMsg);
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Card className="md:max-w-[750px] md:mx-auto lg:mx-0 lg:min-w-[550px]">
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

              <Button className="lg:text-lg" disabled={registerIsPending}>
                {registerIsPending && (
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                )}
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
