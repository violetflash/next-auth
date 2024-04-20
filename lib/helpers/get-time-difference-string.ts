import { hasISOStringFormat } from '@/lib/helpers/is-iso-string';
import { hasTimestampFormat } from '@/lib/helpers/is-timestamp';

export const getTimeDifferenceString = ({ startTime, endTime }: {startTime: string, endTime: string}) => {
  console.log('startTime: >>', startTime);
  console.log('endTime: >>', endTime);
  if (!hasISOStringFormat(startTime)) {
    return 'params error: startTime is not an ISO string';
  }

  if (!hasISOStringFormat(endTime)) {
    return 'params error: endTime is not an ISO string';
  }

  const startTimeStamp = new Date(startTime).getTime();
  const endTimeStamp = new Date(endTime).getTime();
  const difference = Math.abs(startTimeStamp - endTimeStamp);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  return `${days} days ${hours} hours ${minutes} minutes`;
}