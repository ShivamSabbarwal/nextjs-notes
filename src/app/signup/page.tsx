'use client';

import { signupAction } from '@/actions/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

function CreateAccountPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreateAccount = async (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await signupAction(formData);
      if (!errorMessage) {
        router.replace('/');
        toast.success('Account created successfully\nYou are now logged in', {
          duration: 5000,
        });
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 pb-24">
      <div className="relative flex w-full bg-popover max-w-sm flex-col items-center rounded-lg border p-8">
        <h1 className={`mb-9 text-2xl font-semibold ${isPending && 'opacity-0'}`}>Create Account</h1>

        {isPending && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-y-2 text-primary">
            <p>Creating Account...</p>
            <Loader2 className="size-6 animate-spin" />
          </div>
        )}

        <form className={`flex w-full flex-col gap-4 ${isPending && 'opacity-0 -z-10'}`} action={handleCreateAccount}>
          <Input type="email" name="email" placeholder="Email" required disabled={isPending} />
          <Input type="password" name="password" placeholder="Password" required disabled={isPending} />
          <Button type="submit" disabled={isPending}>
            Sign Up
          </Button>

          <p className="mt-3 text-center text-xs">
            Already have an account?
            <Link className="ml-2 underline transition-colors duration-200 ease-in-out hover:text-primary" href="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default CreateAccountPage;
