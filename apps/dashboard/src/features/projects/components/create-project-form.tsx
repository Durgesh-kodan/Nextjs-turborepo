"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectsAction } from "../projects-actions";
import {
  createProjectSchema,
  type CreateProjectValues,
} from "../project-schema.client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { Button } from "@repo/ui/components/button";
import type { ActionResult } from "@repo/types";

type Props = {
  organizationId: string;
};

export function CreateProjectForm({ organizationId }: Props) {
  const [state, formAction, isPending] = useActionState<ActionResult, FormData>(
    projectsAction,
    {},
  );

  const form = useForm<CreateProjectValues>({
    resolver: zodResolver(createProjectSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
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
      <input type="hidden" name="organizationId" value={organizationId} />
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input
                  placeholder="My project"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What is this project about?"
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
          value="create-project"
          disabled={isPending}
          className="w-full mt-4"
        >
          {isPending ? "Creating..." : "Create project"}
        </Button>
      </Form>
    </form>
  );
}