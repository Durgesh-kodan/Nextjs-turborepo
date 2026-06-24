"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { organizationsAction } from "../organizations-actions.server";
import {
  createOrganizationSchema,
  type CreateOrganizationValues,
} from "../organizations-schema.client";
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

export function CreateOrganizationForm() {
  const [state, formAction, isPending] = useActionState<ActionResult, FormData>(
    organizationsAction,
    {},
  );

  const form = useForm<CreateOrganizationValues>({
    resolver: zodResolver(createOrganizationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Acme Inc."
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {state?.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}

        <Button
          type="submit"
          name="intent"
          value="create-organization"
          disabled={isPending}
          className="w-full mt-4"
        >
          {isPending ? "Creating..." : "Create organization"}
        </Button>
      </Form>
    </form>
  );
}