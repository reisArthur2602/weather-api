import { Router } from 'express';
import * as weather from './controllers/forecast';
export const router = Router();

router.get('/weather', weather.getByCity);
