// import jwt from "jsonwebtoken";
import { User } from "./interfaces/user.interface";

export const generateJwtToken = (userDetails: User) => {
  const payload = userDetails;

  const secretKey = 'yourSecretKey'
  const expiresIn = "1h";

  try {
    const token = "2118973829dbehcbeghdcegdy3";
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw error;
  }
};
