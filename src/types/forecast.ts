import { Prisma } from '@prisma/client';
import { prismaClient } from '../database/prisma';

export type ForecastCurrentData = Prisma.Args<
  typeof prismaClient.forecastCurrent,
  'create'
>['data'];

// export type UpdateForecastProps = {
//   id: string;
//   maxtemp_c: number;
//   maxtemp_f: number;
//   mintemp_c: number;
//   mintemp_f: number;
//   avgtemp_c: number;
//   avgtemp_f: number;
// };
