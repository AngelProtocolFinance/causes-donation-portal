import { APP_CODE } from "constants/env";
import jwt, { JwtPayload } from "jsonwebtoken";

export const createAuthToken = () => {
  const payload: JwtPayload = {
    authorization: "allow",
    user: APP_CODE,
  };

  return jwt.sign(payload, process.env.REACT_APP_JWT_SECRET_KEY!, {
    expiresIn: 30,
  });
};
