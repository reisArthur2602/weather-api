import { Prisma } from '@prisma/client';
import { prismaClient } from '../database/prisma';

export type ForecastCurrentData = Prisma.Args<
  typeof prismaClient.forecastCurrent,
  'create'
>['data'];


