import express from "express"
import { login, signup, validateToken } from "../controllers/auth.js"
import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/validate-token", verifyToken, validateToken)

export default router;