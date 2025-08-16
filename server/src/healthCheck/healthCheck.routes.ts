import { Router } from "express";
import HealthCheckController from "./healthCheck.controller.js";

const router = Router();

const healthCheckCtrl = new HealthCheckController();

/**
 * @path: /health-check
 * @method: GET
 */
router.get("/", healthCheckCtrl.check);

export default router;
