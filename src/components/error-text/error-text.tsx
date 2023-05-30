import React from "react";

interface IErrorText {
  errorText: string;
}

const ErrorText = ({ errorText }: IErrorText) => {
  return <p className="text-orange-600 text-sm mt-1 ml-1">{errorText}</p>;
};

export default ErrorText;
