'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodTypeAny } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const stepSchemas = [
  z.object({ email: z.string().email('Enter a valid email') }),
  z.object({ gender: z.string().min(1, 'Gender is required') }),
  z.object({ age: z.coerce.number().min(1, 'Enter a valid age') }),
  z.object({
    year: z.coerce.number().min(1900).max(new Date().getFullYear()),
    month: z.string().min(1, 'Month is required'),
    day: z.string().min(1, 'Day is required'),
  }),
  z.object({
    recoveryChar: z
      .string()
      .min(1, 'Enter your secret character or emoji')
      .max(2, 'Only one symbol or emoji'),
  }),
] as const;

const totalSteps = stepSchemas.length;

type StepSchema = typeof stepSchemas[number];
type StepFormData = z.infer<StepSchema>;

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(0);
  const [collectedData, setCollectedData] = useState<Record<string, unknown>>({});

  const form = useForm<StepFormData>({
    resolver: zodResolver(stepSchemas[step] as ZodTypeAny),
    defaultValues: {},
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: StepFormData) => {
    try {
      const payload = { ...collectedData, ...data };

      const res = await fetch('/api/verify-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step, data }),
      });

      const result = await res.json();

      if (!res.ok) {
        const field = Object.keys(data)[0];
        form.setError(field as keyof StepFormData, { message: result.error });
        return;
      }

      setCollectedData(payload);

      if (step < totalSteps - 1) {
        setStep(step + 1);
        form.reset(); // Clear input for next step
      } else {
        alert('✅ Verified! You can now reset your password.');
        // You can redirect to /reset-password or reveal a password reset UI here
      }
    } catch (err) {
      alert('Something went wrong. Try again.');
      console.log('Verification error:', err);
    }
  };

  const renderStepInput = () => {
    switch (step) {
      case 0:
        return (
          <Input
            {...form.register('email')}
            placeholder="you@dropit.io"
            className="shad-input"
          />
        );
      case 1:
        return (
          <Input
            {...form.register('gender')}
            placeholder="Male / Female / Other"
            className="shad-input"
          />
        );
      case 2:
        return (
          <Input
            type="number"
            {...form.register('age')}
            placeholder="Your age"
            className="shad-input"
          />
        );
      case 3:
        return (
          <div className="space-y-2">
            <Input
              type="number"
              {...form.register('year')}
              placeholder="Year"
              className="shad-input"
            />
            <Input
              {...form.register('month')}
              placeholder="Month (e.g., January)"
              className="shad-input"
            />
            <Input
              {...form.register('day')}
              placeholder="Day (e.g., 15)"
              className="shad-input"
            />
          </div>
        );
      case 4:
        return (
          <Input
            {...form.register('recoveryChar')}
            placeholder="e.g. 🦁 or @"
            className="shad-input text-2xl text-center"
            maxLength={2}
          />
        );
      default:
        return null;
    }
  };

  // Find the first error message, if any
  const firstErrorKey = Object.keys(form.formState.errors)[0] as keyof typeof form.formState.errors | undefined;
  const firstErrorMsg =
    firstErrorKey && form.formState.errors[firstErrorKey]
      ? (form.formState.errors[firstErrorKey]?.message as string)
      : '';

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl p-8 shadow-drop-3 dark:bg-card">
        <h2 className="text-2xl font-bold mb-2 text-center font-poppins">
          Reset Password
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Step {step + 1} of {totalSteps}
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {renderStepInput()}
          {firstErrorMsg && (
            <p className="text-sm text-red-500 mt-1">
              {firstErrorMsg}
            </p>
          )}

          <Button
            type="submit"
            className={cn(
              'shad-submit-btn w-full h-[52px] rounded-full bg-gradient-to-r from-sky-500 to-cyan-600',
              {
                'opacity-60 cursor-not-allowed': isLoading,
              }
            )}
            disabled={isLoading}
          >
            {isLoading
              ? 'Verifying...'
              : step === totalSteps - 1
              ? 'Finish Verification'
              : 'Next'}
          </Button>
        </form>

        {step > 0 && (
          <p
            onClick={() => setStep(step - 1)}
            className="text-sm text-center mt-4 text-brand hover:underline cursor-pointer"
          >
            ← Back
          </p>
        )}
      </div>
    </div>
  );
}
