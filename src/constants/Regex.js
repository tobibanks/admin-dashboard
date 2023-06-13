export const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const EMAIL_VALIDATION = {
  required: "Email is required",
  maxLength: { value: 100, message: "Maximum of 100 characters" },
  pattern: {
    value: EMAIL_PATTERN,
    message: "Email is invalid",
  },
};
