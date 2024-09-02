'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { User } from '@supabase/supabase-js';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { LogOut, UserCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

import { logoutAction } from '@/actions/users';

type Props = {
  user: User;
  className?: string;
};

function UserButton({ user, className }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading('Signing out...');
    await logoutAction();
    router.replace('/login');
    toast.dismiss(toastId);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={cn('text-secondary hover:text-primary translate-colors duration-200 ease-in-out', className)}>
        <UserCircle className="size-6 sm:size-8" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="ml-4 mt-5 sm:mt-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="rounded-md p-2 ">
          <LogOut className="mr-2 size-4" />
          <h3 className="text-sm font-semibold">Log out</h3>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
