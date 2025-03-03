"use server";

import { redirect } from 'next/navigation';
import { post } from '../../shared/utils/fetch';
import { FormError } from '../../shared/interfaces/form-error.interface';

export default async function createUser(_prevState: FormError, formData: FormData) {
  const { error } = await post("users", formData);

  if (error) {
    return { error };
  }
  // Redirect to the home page after successfully creating a user
  redirect('/');
}