import * as moment from "moment-timezone";

const dateFormat = "YYYY-MM-DD";
const timezone = "America/Chicago";

export interface RequestTypeReport {
    requestType: string,
    firstOfMonth: any,
    value: any
}

export interface DepartmentRequestTypeReport {
    departmentName: string,
    quarterBegin: any,
    quarterEnd: any,
    averageTimeToResolution: any,
    numberOfTasksAssigned: number
}

export interface RequestsOpenClosedReport  {
    firstOfMonth: any;
    status: string;
    value: number;
}

export interface PercentageTypeReport {
    value: number,
    firstOfMonth: any,
    percentageType: string
}

export interface ATRChartData {
    labels: string[];
    generalInquiry5Day: number[],
    generalInquiryNoSla: number[],
    settlementInquiry5Day: number[],
    settlementInquiry10Day: number[],
    projectInquiries:  number[],
    rtoCompliance: number[]
}

export interface DepartmentChartData {
    labels: string[][];
    atr: number[];
    numOfTasks: number[]
}

export interface OpenClosedChartData {
    labels: string[];
    closedRequestsSeries: number[];
    openRequestsSeries: number[];
}

export interface PercentageChartData {
    labels: string[],
    percentages: number[]
}

export interface RequestTypesChartData {
    labels: string[];
    generalInquiry: number[];
    genInqNo1stCall: number[];
    settlementInquiry: number[];
    settlementDispute: number[];
    projectInquiries: number [];
    z2InquiriesandDisputes: number[];
}

interface MapFormat {
    y: any,
    m: any,
    d: any
}

const currentDate = new Date(Date.now());

export const startDate = () => {
    let back12monthDate: Date = new Date();
    back12monthDate.setMonth(currentDate.getMonth() - 12);
    const startDate = back12monthDate.getFullYear() + '-' + back12monthDate.getMonth()  + '-01';
    return startDate;
};

export const endDate = () => {
    const endDate =  currentDate.getFullYear() + '-' +currentDate.getMonth() + '-01';
    return endDate;
};

export function tryParseDateFromString(dateStringCandidateValue: string, format = "ymd") {
    if (!dateStringCandidateValue) { return null; }

    let emptyObj: MapFormat = {y:0, m:0, d:0};
    let mapFormat: MapFormat = format
        .split("")
        .reduce(function (a, b, i) { a[b] = i; return a;}, emptyObj);

    const dateStr2Array = dateStringCandidateValue.split(/[ :\-\/]/g);

    dateStr2Array[2] = '01';
    const datePart = dateStr2Array.slice(0, 3);

    let datePartFormatted = [
        +datePart[mapFormat.y],
        +datePart[mapFormat.m]-1,
        +datePart[mapFormat.d] ];


    if (dateStr2Array.length > 3) {
        dateStr2Array.slice(3).forEach(t => datePartFormatted.push(+t));
    }


    // test date validity according to given [format]
    const dateTrial = new Date(Date.UTC.apply(null, dateStr2Array));

    return dateTrial && dateTrial.getFullYear() === datePartFormatted[0] &&
    dateTrial.getMonth() === datePartFormatted[1]
        ? dateTrial :
        null;

}

export const sortYearMonth = (d1: any, d2: any) => {
    if (new Date(d1.firstOfMonth.getFullYear(), d1.firstOfMonth.getMonth()) < new Date(d2.firstOfMonth.getFullYear(), d2.firstOfMonth.getMonth())) {
        return -1;
    }

    if (new Date(d1.firstOfMonth.getFullYear(), d1.firstOfMonth.getMonth()) > new Date(d2.firstOfMonth.getFullYear(), d2.firstOfMonth.getMonth())) {
        return 1;
    }

    return 0;
};

export const sortYearMonthDepartment = (d1: any, d2: any) => {
    if (new Date(d1.quarterBegin.getFullYear(), d1.quarterBegin.getMonth()) < new Date(d2.quarterBegin.getFullYear(), d2.quarterBegin.getMonth())) {
        return -1;
    }

    if (new Date(d1.quarterBegin.getFullYear(), d1.quarterBegin.getMonth()) > new Date(d2.quarterBegin.getFullYear(), d2.quarterBegin.getMonth())) {
        return 1;
    }

    return 0;
};

export const convertStringToMilliSeconds = (time: string) =>{
    let splitTime = time.split(":");
    let timeAsNum: number[] = [];
    for(let i = 0; i < splitTime.length; i++)
    {
        timeAsNum[i] = parseInt(splitTime[i]);
    }
    let hourInSecs:number = timeAsNum[0] * 60 * 60;
    let minInSecs:number = timeAsNum[1] * 60;

    return (hourInSecs + minInSecs + timeAsNum[2]) * 1000;
};

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getFirstOfMonth = (offset: number) => {
    return moment().tz(timezone).startOf('month').subtract(offset, 'months').format(dateFormat);

};

export const titleCase = (str: string) => {
    return str.toLowerCase().split(' ').map(function(word) {
        if(word.toUpperCase() === "RMS")
            return word.toUpperCase();
        else
            return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
};

