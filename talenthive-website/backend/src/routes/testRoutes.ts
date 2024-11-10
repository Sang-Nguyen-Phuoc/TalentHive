import { Router } from "express";

import * as testController from "../controllers/testController";

const router = Router();

router.post('/', testController.testCraeteEmployerProfile)

export default router;