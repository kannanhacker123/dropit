'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { cn } from "@/lib/utils";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required")
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: SignInFormData) => {
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        form.setError("email", {
          message: result.error || "Invalid email or password",
        });
        return;
      }

      // ✅ You can use next/router here to redirect after successful sign-in
      alert("✅ Signed in successfully!");
      form.reset();
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <div className="w-full max-w-md rounded-2xl  p-8 shadow-drop-3 dark:bg-card">
      <div className="space-y-1 text-center">
        <h2 className="text-3xl font-bold text-foreground font-poppins">Welcome back</h2>
        <p className="text-sm text-muted-foreground">Sign in to your Dropit account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-light-100">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@dropit.io"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-light-100">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          {/* frogot password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-brand hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className={cn("shad-submit-btn w-full h-[52px] rounded-full bg-gradient-to-r from-blue-600 to-[#298ab0]", {
              "opacity-60 cursor-not-allowed": isLoading
            })}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </Form>

      <p className="mt-4 text-center text-sm text-light-200">
        Don’t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-brand hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
