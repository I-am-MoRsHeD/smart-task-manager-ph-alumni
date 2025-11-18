import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateSchema } from "../../middleware/validateSchema";
import { RegisterZodSchema } from "./auth.validation";


const router = Router();

router.post('/register',
    validateSchema(RegisterZodSchema),
    AuthController.register);

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

export const authRoutes = router;