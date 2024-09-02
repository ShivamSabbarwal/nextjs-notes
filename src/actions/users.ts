'use server';

import { getSupabaseAuth } from '@/lib/auth';
import { getErrorMessage } from '@/lib/utils';

export const signupAction = async (formData: FormData) => {
  try {
    const auth = getSupabaseAuth();

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const { error } = await auth.signUp(data);
    if (error) throw error;

    const { data: loginData, error: loginError } = await auth.signInWithPassword(data);
    if (loginError) throw loginError;
    if (!loginData.session) throw new Error('No session data');

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const loginAction = async (formData: FormData) => {
  try {
    const auth = getSupabaseAuth();

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const { data: loginData, error: loginError } = await auth.signInWithPassword(data);
    if (loginError) throw loginError;
    if (!loginData.session) throw new Error('No session data');

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const logoutAction = async () => {
  try {
    const { error } = await getSupabaseAuth().signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};
