import { Router } from "express";

import * as testController from "../controllers/testController";

const router = Router();

router.post('/', testController.testCraeteEmployerProfile)
// router.post('/', testController.testToken)

export default router;