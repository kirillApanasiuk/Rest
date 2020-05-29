import { SCHEMA_VALIDATION_CONSTANTS } from "../../../constants/schema-validation.constants";
import { Validation } from "./../base-validation";

class CustomValidation extends Validation {
  passwordValidate = (pass: string) => {
    if (
      pass.length < SCHEMA_VALIDATION_CONSTANTS.MAX_PASS_LENGTH ||
      pass.includes("password")
    ) {
      return false;
    }
    return true;
  };
}

export const customValidation = new CustomValidation();
