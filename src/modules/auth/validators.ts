import { IValidators } from "./types";

const Validators: IValidators = {
  signup: (req, res, next) => {
    const { email, password, organization } = req.body;
    if (!email || !password || !organization) {
      const missingField = !email
        ? "email"
        : !password
        ? "password"
        : "organization";
      return res.status(400).json({
        data: null,
        message: `Bad Request, Reason: Missing ${missingField}`,
        error: null,
      });
    }
    next();
  },

  login: (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      const missingField = !email ? "email" : "password";
      return res.status(400).json({
        data: null,
        message: `Bad Request, Reason: Missing ${missingField}`,
        error: null,
      });
    }

    next();
  },

  logout: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        data: null,
        message: "Bad Request",
        error: null,
      });
    }

    next();
  },
};

export default Validators;
