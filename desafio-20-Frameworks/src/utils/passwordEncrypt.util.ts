import * as bcrypt from 'bcrypt';

export const checkPassword = (password: string, input: string): boolean => {
  return bcrypt.compareSync(input, password);
};

export const encrypt = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
