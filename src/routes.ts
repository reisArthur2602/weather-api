import { Router } from 'express';
import * as weather from './controllers/forecast';
export const router = Router();

router.get('/weather', weather.getCityByFilter);
router.get('/weather/:city', weather.getByCity);
router.post('/weather', weather.searchCity);
