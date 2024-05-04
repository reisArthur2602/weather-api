import { Prisma } from '@prisma/client';
import { db } from '../database/prisma';

export type ForecastCurrentData = Prisma.Args<
  typeof db.forecastCurrent,
  'create'
>['data'];


