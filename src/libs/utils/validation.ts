export const validateEmpty = (
  value: string,
  setError: (error: React.SetStateAction<string>) => void
) => {
  if (value === '') {
    setError('Please enter value!');
  } else {
    setError('');
  }
};
