'use server';

import { post } from '../../shared/utils/fetch';

export default async function generateDescriptionFromTags(
  tags: string[],
): Promise<string> {
  const response = await post('ai/generate-description', { tags });
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data.description;
}
