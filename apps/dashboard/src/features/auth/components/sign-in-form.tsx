"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authAction } from "../auth-actions";
import { signInSchema, type SignInValues } from "../auth-schema.client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import type { ActionResult } from "@repo/types";

export function SignInForm() {
  const [state, formAction, isPending] = useActionState<ActionResult, FormData>(
    authAction,
    {},
  );
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  return (
    <form
      action={formAction}
      onSubmitCapture={async (e) => {
        const ok = await form.trigger(undefined, { shouldFocus: true });
        if (!ok) e.preventDefault();
      }}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  disabled={isPending}
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
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {state?.error && (
          <p className="text-sm text-destructive text-center">{state.error}</p>
        )}
        <Button
          type="submit"
          name="intent"
          value="sign-in"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </Button>
      </Form>
    </form>
  );
}
