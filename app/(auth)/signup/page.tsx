/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const steps = ["credentials", "details", "recovery"] as const;
type StepType = typeof steps[number];

const credentialsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword']
});

const detailsSchema = z.object({
  gender: z.enum(["Male", "Female", "Other"]),
  dobYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
  dobMonth: z.string().min(1),
  dobDay: z.string().min(1),
});

const recoverySchema = z.object({
  recoveryChar: z.string().min(1).max(2, "Only one emoji or symbol")
});

const stepSchemas = {
  credentials: credentialsSchema,
  details: detailsSchema,
  recovery: recoverySchema,
};

type CredentialsData = z.infer<typeof credentialsSchema>;
type DetailsData = z.infer<typeof detailsSchema>;
type RecoveryData = z.infer<typeof recoverySchema>;

type CollectedData = Partial<CredentialsData & DetailsData & RecoveryData>;

export default function SignUpStepForm() {
  const [step, setStep] = useState<StepType>('credentials');
  const [collectedData, setCollectedData] = useState<CollectedData>({});

  const form = useForm<any>({
    resolver: zodResolver(stepSchemas[step] as z.ZodType<any, any, any>),
    defaultValues: {},
  });

  const isLoading = form.formState.isSubmitting;

  const handleNext: SubmitHandler<any> = async (data) => {
    setCollectedData(prev => ({ ...prev, ...data }));

    const currentIndex = steps.indexOf(step);
    const nextStep = steps[currentIndex + 1];

    if (nextStep) {
      setStep(nextStep);
      form.reset();
    } else {
      // Final submission
      try {
        // Merge all collected data for submission
        const allData = { ...collectedData, ...data };

        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullname: allData.name,
            email: allData.email,
            password: allData.password,
            gender: allData.gender,
            dob: {
              year: allData.dobYear,
              month: allData.dobMonth,
              day: allData.dobDay,
            },
            recoveryChar: allData.recoveryChar,
          }),
        });

        const result = await res.json();
        if (!res.ok) {
          alert(result.error || "Signup failed");
          return;
        }

        alert("✅ Account created successfully!");
      } catch {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const renderStepFields = () => {
    switch (step) {
      case 'credentials':
        return (
          <>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@dropit.io" {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </>
        );

      case 'details':
        return (
          <>
            <FormField control={form.control} name="gender" render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                  <FormItem>
                    <FormControl><RadioGroupItem value="Male" /></FormControl><FormLabel>Male</FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormControl><RadioGroupItem value="Female" /></FormControl><FormLabel>Female</FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormControl><RadioGroupItem value="Other" /></FormControl><FormLabel>Other</FormLabel>
                  </FormItem>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex gap-2">
              <FormField control={form.control} name="dobYear" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Year</FormLabel>
                  <FormControl><Input type="number" placeholder="2005" {...field} className="shad-input" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dobMonth" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Month</FormLabel>
                  <FormControl><Input placeholder="June" {...field} className="shad-input" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dobDay" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Day</FormLabel>
                  <FormControl><Input placeholder="15" {...field} className="shad-input" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </>
        );

      case 'recovery':
        return (
          <>
            <p className="text-sm text-muted-foreground mb-2">
              Set a secret recovery character (symbol, number, or emoji). This helps verify your identity if you ever forget your password. Example: <strong>@</strong>, <strong>7</strong>, <strong>🦁</strong>
            </p>
            <FormField control={form.control} name="recoveryChar" render={({ field }) => (
              <FormItem>
                <FormLabel>Recovery Character</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. @ or 🐍" maxLength={2} {...field} className="shad-input text-2xl text-center" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </>
        );
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl p-8 shadow-drop-3 dark:bg-card">
      <h2 className="text-3xl font-bold text-foreground text-center mb-4">Create Your Account</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNext)} className="space-y-5">
          {renderStepFields()}
          <Button type="submit" disabled={isLoading} className={cn("w-full h-[52px] rounded-full bg-gradient-to-r from-sky-500 to-blue-600", {
            'opacity-60 cursor-not-allowed': isLoading
          })}>
            {isLoading ? 'Submitting...' : step === 'recovery' ? 'Create Account' : 'Next'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
