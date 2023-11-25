import { Result } from "@/models/Result";
import { User } from "@/models/User";
import validator from "email-validator";

export const validateUser = (user: User): Result<User, string> => {
  if (user.username.length < 3) {
    return {
      success: false,
      message: "Enter at least 3 characters in Username",
    };
  } else if (!validator.validate(user.email)) {
    return {
      success: false,
      message: "Enter valid values in Email",
    };
  } else if (!user.password) {
    return {
      success: false,
      message: "Enter valid values in Password",
    };
  } else if (user.password.length < 4) {
    return {
      success: false,
      message: "Enter at least 4 characters in Password",
    };
  }
  return { success: true, value: user };
};
