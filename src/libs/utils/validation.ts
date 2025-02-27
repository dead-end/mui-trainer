export const validateEmpty = (
  value: string,
  setError: (error: React.SetStateAction<string>) => void
) => {
  if (value === '') {
    setError('Please enter value!');
    return false;
  }
  setError('');
  return true;
};

export const validateId = (
  value: string,
  setError: (error: React.SetStateAction<string>) => void
) => {
  if (/^[-a-zA-Z0-9]*$/.test(value)) {
    setError('');
    return true;
  }
  setError('Not a valid id!');
  return false;
};
