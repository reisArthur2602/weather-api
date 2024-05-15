import { Router } from 'express';
import * as weather from './controllers/forecast';
export const router = Router();

router.get('/weather/filter', weather.getCityByFilter);
router.get('/weather/:city', weather.getByCity);
router.post('/weather/search', weather.searchCity);
