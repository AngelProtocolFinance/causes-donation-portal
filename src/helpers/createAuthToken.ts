import jwt, { JwtPayload } from "jsonwebtoken";

export const createAuthToken = () => {
  const payload: JwtPayload = {
    authorization: "allow",
    user: "ukraine-portal",
  };

  return jwt.sign(payload, process.env.REACT_APP_JWT_SECRET_KEY!, {
    expiresIn: 30,
  });
};
