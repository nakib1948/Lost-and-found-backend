import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError) => {
  let allErrorMessage = "";
  err.issues.forEach(
    (issue: ZodIssue) => (allErrorMessage += issue.message + ".")
  );

  return {
    message: allErrorMessage,
  };
};

export default handleZodError;
