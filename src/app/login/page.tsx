'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

import { loginAction } from '@/actions/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogin = async (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await loginAction(formData);
      if (!errorMessage) {
        router.replace('/');
        toast.success('Successfully logged in');
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 pb-24">
      <div className="relative flex w-full bg-popover max-w-sm flex-col items-center rounded-lg border p-8">
        <h1 className={`mb-9 text-2xl font-semibold ${isPending && 'opacity-0'}`}>Login</h1>

        {isPending && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-y-2 text-primary">
            <p>Logging in...</p>
            <Loader2 className="size-6 animate-spin" />
          </div>
        )}

        <form className={`flex w-full flex-col gap-4 ${isPending && 'opacity-0 -z-10'}`} action={handleLogin}>
          <Input type="email" name="email" placeholder="Email" required disabled={isPending} />
          <Input type="password" name="password" placeholder="Password" required disabled={isPending} />
          <Button type="submit" disabled={isPending}>
            Login
          </Button>

          <p className="mt-3 text-center text-xs">
            Don't have an account?
            <Link className="ml-2 underline transition-colors duration-200 ease-in-out hover:text-primary" href="/signup">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
