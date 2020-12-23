/// <reference types="react" />
import { AppJob } from '../../../../@types/app';
import { Status } from '../../constants';
interface DetailsProps {
    job: AppJob;
    status: Status;
    queueName: string;
}
export declare const Details: ({ status, job, queueName }: DetailsProps) => JSX.Element | null;
export {};
