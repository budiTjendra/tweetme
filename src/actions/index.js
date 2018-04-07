export const signIn =(user) => {
  return {
    type: 'sign_in',
    payload:user
  };
};
