import validator from "validator";

export abstract class Validation {
  abstract passwordValidate(pass: string): boolean;

  emailValidate = (email: string): boolean => {
    if (!validator.isEmail(email)) {
      return false;
    }
    return true;
  };
  ageValidate = (age: number): boolean => {
    if (age < 1) {
      return false;
    }
    return true;
  };
}
