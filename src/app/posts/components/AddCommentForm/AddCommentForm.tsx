"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CommentFormValues, commentSchema } from "./schema";
import type { AddCommentFormProps } from "./types";
import { useCreateComment } from "@/lib/generated/blog-api";

export function AddCommentForm({
  postId,
  onCommentAdd,
  onCommentRollback,
}: AddCommentFormProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: "",
      email: "",
      body: "",
    },
    mode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const createCommentMutation = useCreateComment();

  const onSubmit = async (values: CommentFormValues) => {
    setStatusMessage(null);

    const optimisticComment = {
      id: Date.now(),
      name: values.name.trim(),
      email: values.email.trim(),
      body: values.body.trim(),
      createdAt: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    // Optimistic update
    onCommentAdd(optimisticComment);

    try {
      await createCommentMutation.mutateAsync({
        data: {
          postId,
          name: optimisticComment.name,
          email: optimisticComment.email,
          body: optimisticComment.body,
        },
      });

      setStatusMessage("Your comment has been submitted.");
      reset();
    } catch (error) {
      setStatusMessage(
        "There was a problem sending your comment. Please try again.",
      );
      if (onCommentRollback) {
        onCommentRollback(optimisticComment.id);
      }
    }
  };

  return (
    <section
      aria-label="Add a comment"
      className="mt-8 flex justify-center px-4 sm:px-0"
    >
      <div className="w-full max-w-2xl rounded-lg border border-border bg-card/60 p-4 sm:p-6">
        <header className="space-y-1">
          <h3 className="text-base font-semibold text-foreground">
            Add a comment
          </h3>
          <p className="text-xs text-muted-foreground">
            Share your thoughts about this post. Your comment will appear
            immediately.
          </p>
        </header>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-4 space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={control}
                name="name"
                render={({
                  field,
                  fieldState,
                }: {
                  field: any;
                  fieldState: any;
                }) => (
                  <FormItem>
                    <FormLabel>
                      Name<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="name"
                        aria-invalid={!!fieldState.error}
                        aria-describedby={
                          fieldState.error ? "comment-name-error" : undefined
                        }
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage id="comment-name-error">
                        {fieldState.error.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({
                  field,
                  fieldState,
                }: {
                  field: any;
                  fieldState: any;
                }) => (
                  <FormItem>
                    <FormLabel>
                      Email<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        aria-invalid={!!fieldState.error}
                        aria-describedby={
                          fieldState.error ? "comment-email-error" : undefined
                        }
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage id="comment-email-error">
                        {fieldState.error.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="body"
              render={({
                field,
                fieldState,
              }: {
                field: any;
                fieldState: any;
              }) => (
                <FormItem>
                  <FormLabel>
                    Comment<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Write a comment…"
                      aria-invalid={!!fieldState.error}
                      aria-describedby={
                        fieldState.error ? "comment-body-error" : undefined
                      }
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage id="comment-body-error">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting…" : "Post comment"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Fields marked with <span className="text-destructive">*</span>{" "}
                are required.
              </p>
            </div>

            {statusMessage && (
              <p
                className="text-xs text-emerald-600 dark:text-emerald-400"
                role="status"
                aria-live="polite"
              >
                {statusMessage}
              </p>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
}
