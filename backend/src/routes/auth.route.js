import express from 'express';
import { me, googleLogin, login, logout, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import validate from '../middleware/validate.js';
import { loginSchema, registerSchema } from '../lib/validationSchemas.js';
import passport from 'passport';
import "../strategies/google-strategy.js";

const router = express.Router();


router.post("/signup", validate(registerSchema), signup)
router.post("/login", validate(loginSchema), login)
router.post("/logout", logout)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/callback/google", passport.authenticate("google", { session: false }), googleLogin);
router.get("/me",protectRoute, me)

export default router;