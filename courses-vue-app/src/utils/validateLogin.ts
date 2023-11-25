import { Auth } from "@/models/Auth";
import { Result } from "@/models/Result";

export const validateLoginData = (user: Auth): Result<Auth, string> => {
  if (!user.username) {
    return {
      success: false,
      message: "Enter your username",
    };
  } else if (!user.password) {
    return {
      success: false,
      message: "Enter your password",
    };
  }

  return {
    success: true,
    value: user,
  };
};
