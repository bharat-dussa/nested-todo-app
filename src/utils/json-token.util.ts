/* eslint-disable @typescript-eslint/no-unused-vars */
import { sign } from "jwebt";

export const generateJwtToken = async (userDetails: any) => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);

  const payload = {
    ...userDetails,
    exp: currentTimeInSeconds + 60 * 60,
    nbf: currentTimeInSeconds,
    iat: currentTimeInSeconds,
    jti: "uniqueTokenId",
  };

  const privateKey =
    "-----BEGIN PRIVATE KEY-----\nexample\n-----END PRIVATE KEY-----\n";
  const secret = "secretKey";
  const keyId = "optionalUniqueKeyIdentifier";

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkJoYXJhdCBEdXNzYSIsImlhdCI6MTUxNjIzOTAyMiwiZGF0ZU9mQmlydGgiOiJBdWd1c3QgMTUsIDE5OTkiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIrMSAoNTU1KSAxMjMtNDU2NyJ9.JCBiAb9WWMsMvAf48O8tO6CjxjtfC4KReVayM8FAx4c";
  // try {
  //   const token = await sign({
  //     payload,
  //     privateKey,
  //     secret,
  //     keyId,
  //     format: "pkcs8",
  //     algorithm: "RS256",
  //     extractable: false,
  //     keyUsages: ["sign"],
  //   });
  //   return token;
  // } catch (error) {
  //   console.error("Error generating JWT token:", error);
  //   // eslint-disable-next-line no-throw-literal
  //   throw `Error generating JWT token ${error}`;
  // }   // TODO Currently not able to generate JWT token returning hard coded JWT

  return token;
};
