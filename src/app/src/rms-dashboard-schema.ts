export interface DepartmentStatistic {
    id: string;
    averageTimeToResolution: string;
    departmentName: string;
    numberOfTasksAssigned: number;
    quarter: string;
}

export interface RmsPercentagesTotal {
    id: string;
    monthYear: string;
    percentageType: string;
    value: number
}

export interface RmsRequestType {
    id: string;
    monthYear: string;
    requestType: string;
    value: number;
}

export interface RmsRequestsTotal {
    id: string;
    monthYear: string;
    status: string;
    value: number;
}

export interface RmsTimeToResolution {
    id: string;
    monthYear: string;
    timeToResolutionType: string;
    value: number;
}