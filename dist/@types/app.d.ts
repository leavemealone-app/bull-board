import * as Redis from 'ioredis';
import { Job, JobOptions } from 'bull';
import { Job as JobMq, JobsOptions } from 'bullmq';
import React from 'react';
import { Status } from '../ui/components/constants';
export declare type JobCleanStatus = 'completed' | 'wait' | 'active' | 'delayed' | 'failed';
export declare type AdapterOptions = {
    jobParser(job: Job | JobMq): AppJob;
};
export declare type JobStatus = Status;
export declare type JobCounts = Record<JobStatus, number>;
export interface QueueAdapter {
    readonly client: Promise<Redis.Redis>;
    readonly options?: AdapterOptions;
    getName(): string;
    getJob(id: string): Promise<Job | JobMq | undefined | null>;
    getJobs(jobStatuses: JobStatus[], start?: number, end?: number): Promise<(Job | JobMq)[]>;
    getJobCounts(...jobStatuses: JobStatus[]): Promise<JobCounts>;
    clean(queueStatus: JobCleanStatus, graceTimeMs: number): Promise<any>;
}
export interface BullBoardQueue {
    queue: QueueAdapter;
}
export interface BullBoardQueues {
    [key: string]: BullBoardQueue;
}
export interface ValidMetrics {
    total_system_memory: string;
    redis_version: string;
    used_memory: string;
    mem_fragmentation_ratio: string;
    connected_clients: string;
    blocked_clients: string;
}
export interface AppJob {
    id: string | number | undefined;
    timestamp: number | null;
    processedOn?: number | null;
    finishedOn?: number | null;
    progress: JobMq['progress'];
    attempts: JobMq['attemptsMade'];
    failedReason: JobMq['failedReason'];
    stacktrace: string[] | null;
    opts: JobsOptions | JobOptions;
    data: JobMq['data'];
    name: JobMq['name'];
    delay: number | undefined;
    returnValue: string | Record<string | number, any> | null;
}
export declare type DataFormatter = (data: JobMq['data']) => JobMq['data'];
export interface AppQueue {
    name: string;
    counts: Record<Status, number>;
    jobs: AppJob[];
}
export declare type SelectedStatuses = Record<AppQueue['name'], Status>;
export interface QueueActions {
    promoteJob: (queueName: string) => (job: AppJob) => () => Promise<void>;
    retryJob: (queueName: string) => (job: AppJob) => () => Promise<void>;
    cleanJob: (queueName: string) => (job: AppJob) => () => Promise<void>;
    retryAll: (queueName: string) => () => Promise<void>;
    cleanAllDelayed: (queueName: string) => () => Promise<void>;
    cleanAllFailed: (queueName: string) => () => Promise<void>;
    cleanAllCompleted: (queueName: string) => () => Promise<void>;
    setSelectedStatuses: React.Dispatch<React.SetStateAction<SelectedStatuses>>;
}