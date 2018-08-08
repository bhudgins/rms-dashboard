import {
    ATRChartData, DepartmentChartData,
    DepartmentRequestTypeReport,
    months, OpenClosedChartData, PercentageChartData,
    PercentageTypeReport,
    RequestsOpenClosedReport,
    RequestTypeReport, RequestTypesChartData,
    sortYearMonth,
    sortYearMonthDepartment
} from "../../util/util";

export const getATRChartData = (response: RequestTypeReport[]) => {
    let chartData: ATRChartData = {
        labels: [],
        generalInquiry5Day: [],
        generalInquiryNoSla: [],
        settlementInquiry5Day: [],
        settlementInquiry10Day: [],
        projectInquiries:  [],
        rtoCompliance: []
    };

    response.sort(sortYearMonth).forEach( (item: RequestTypeReport) => {
        if(item.requestType === "General Inquiry 5 Day") {
            chartData.labels.push(`${months[item.firstOfMonth.getMonth()]}-${item.firstOfMonth.getFullYear()}`);
            chartData.generalInquiry5Day.push(item.value);
        }
        else if(item.requestType === "General Inquiry No SLA"){
            chartData.generalInquiryNoSla.push(item.value);
        }
        else if(item.requestType === "Settlement Inquiry 5 Day"){
            chartData.settlementInquiry5Day.push(item.value);
        }
        else if(item.requestType === "Settlement Inquiry 10 Day"){
            chartData.settlementInquiry10Day.push(item.value);
        }
        else if(item.requestType === "Project Inquiries"){
            chartData.projectInquiries.push(item.value);
        }
        else if(item.requestType === "RTO Compliance"){
            chartData.rtoCompliance.push(item.value);
        }
    });



    return chartData;
};

export const getDepartmentChartData = (response: DepartmentRequestTypeReport[]) => {
    let chartData: DepartmentChartData = {
        labels: [],
        atr:[],
        numOfTasks:[]
    };

    response.sort(sortYearMonthDepartment).forEach( (item: DepartmentRequestTypeReport) => {
        chartData.labels.push([`${months[item.quarterBegin.getMonth()]}-${item.quarterBegin.getFullYear()} -`,
            `${months[item.quarterEnd.getMonth()]}-${item.quarterEnd.getFullYear()}`]);
        chartData.atr.push(item.averageTimeToResolution);
        chartData.numOfTasks.push(item.numberOfTasksAssigned);

    });



    return chartData;
};

export const getPercentageChartData = (response: PercentageTypeReport[])=> {
    let chartData: PercentageChartData = {
        labels: [],
        percentages: []
    };

    response.sort(sortYearMonth).forEach((item: PercentageTypeReport) =>{
        chartData.labels.push(`${months[item.firstOfMonth.getMonth()]}-${item.firstOfMonth.getFullYear()}`);
        chartData.percentages.push(item.value);
    });

    return chartData;

};

export const getOpenClosedChartData = (response: RequestsOpenClosedReport[]) => {
    let chartData: OpenClosedChartData = {
        labels: [],
        openRequestsSeries: [],
        closedRequestsSeries: []
    };

    //console.log(response);
    response.sort(sortYearMonth).forEach( (item: RequestsOpenClosedReport) => {
        if(item.status === "opened") {
            chartData.labels.push(`${months[item.firstOfMonth.getMonth()]}-${item.firstOfMonth.getFullYear()}`);
            chartData.openRequestsSeries.push(item.value);
        }
        else if(item.status === "closed"){
            chartData.closedRequestsSeries.push(item.value);
        }
    });



    return chartData;
};

export const getRequestTypesChartData = (response: RequestTypeReport[]) => {
    let chartData: RequestTypesChartData = {
        labels: [],
        generalInquiry: [],
        genInqNo1stCall: [],
        settlementInquiry: [],
        settlementDispute: [],
        projectInquiries:  [],
        z2InquiriesandDisputes: []
    };

    response.sort(sortYearMonth).forEach( (item: RequestTypeReport) => {
        if(item.requestType === "General Inquiry") {
            chartData.labels.push(`${months[item.firstOfMonth.getMonth()]}-${item.firstOfMonth.getFullYear()}`);
            chartData.generalInquiry.push(item.value);
        }
        else if(item.requestType === "Gen Inq No 1st Call"){
            chartData.genInqNo1stCall.push(item.value);
        }
        else if(item.requestType === "Settlement Inquiry"){
            chartData.settlementInquiry.push(item.value);
        }
        else if(item.requestType === "Settlement Dispute"){
            chartData.settlementDispute.push(item.value);
        }
        else if(item.requestType === "Project Inquiries"){
            chartData.projectInquiries.push(item.value);
        }
        else if(item.requestType === "Z2 Inquiries & Disputes"){
            chartData.z2InquiriesandDisputes.push(item.value);
        }
    });



    return chartData;
};
