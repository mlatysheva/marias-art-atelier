export const getErrorMessage = (response: any) => {
  if (response.message) {
    if (Array.isArray(response.message)) {
      return capitaliseErrorMessage(response.message[0]);
    }
    return capitaliseErrorMessage(response.message);
  }
  return 'An unknown error occurred.';
}

const capitaliseErrorMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
}