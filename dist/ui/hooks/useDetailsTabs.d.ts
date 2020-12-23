/// <reference types="react" />
import { Status } from '../components/constants';
import { AppJob } from '../../@types/app';
export declare function useDetailsTabs(currentStatus: Status, queueName: string): {
    tabs: {
        title: string;
        isActive: boolean;
        selectTab: () => void;
    }[];
    selectedTab: string;
    getTabContent: ({ id, data, returnValue, opts, failedReason, stacktrace, }: AppJob) => JSX.Element | null;
};
