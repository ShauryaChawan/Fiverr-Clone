import express from "express";
import {
  getConversations,
  createConverstation,
  getSingleConversation,
  updateConversation,
} from "../controllers/message.controller.js";
// import {
//   createMessage,
//   getMessages,
// } from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/:id", verifyToken, createConverstation);
router.get("/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;
