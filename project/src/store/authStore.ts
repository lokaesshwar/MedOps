import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { AuthState, UserRole } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  },
  signUp: async (email: string, password: string, role: UserRole, firstName: string, lastName: string) => {
    // First check if the user exists
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
      .single();

    if (existingUser) {
      throw new Error('An account with this email already exists. Please sign in instead.');
    }

    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      if (signUpError.message === 'User already registered') {
        throw new Error('An account with this email already exists. Please sign in instead.');
      }
      throw signUpError;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([
          {
            user_id: data.user.id,
            role,
            first_name: firstName,
            last_name: lastName,
          },
        ]);
      if (profileError) throw profileError;
    }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },
}));