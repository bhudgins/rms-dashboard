import {
    getATRChartData,
    getDepartmentChartData,
    getOpenClosedChartData,
    getPercentageChartData,
    getRequestTypesChartData
} from "./getChartData";

describe('getATRChartData', () => {
    it('should return formatted data for chart', () => {
        let data = [
            {
                "_id" : "5b3c544920fdcacf3949b815",
                "requestType" : "General Inquiry 5 Day",
                "firstOfMonth" : new Date("Thu Dec 01 2016 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 187200000
            },

            /* 4 */
            {
                "_id" : "5b3c544920fdcacf3949b817",
                "requestType" : "RTO Compliance",
                "firstOfMonth" : new Date("Thu Dec 01 2016 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 82800000
            },

            /* 9 */
            {
                "_id" : "5b3c544920fdcacf3949b81c",
                "requestType" : "Settlement Inquiry 5 Day",
                "firstOfMonth" : new Date("Thu Dec 01 2016 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 82800000
            },

            /* 10 */
            {
                "_id" : "5b3c544920fdcacf3949b81d",
                "requestType" : "General Inquiry No SLA",
                "firstOfMonth" : new Date("Thu Dec 01 2016 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 262800000
            },

            /* 11 */
            {
                "_id" : "5b3c544920fdcacf3949b81e",
                "requestType" : "Project Inquiries",
                "firstOfMonth" : new Date("Thu Dec 01 2016 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 162000000
            },

            /* 13 */
            {
                "_id" : "5b3c544920fdcacf3949b820",
                "requestType" : "Settlement Inquiry 10 Day",
                "firstOfMonth" : new Date("Thu Dec 01 2016 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 162000000
            },

        ];

        let expectedData = {
            labels: ['Dec-2016'],
            generalInquiry5Day: [187200000],
            generalInquiryNoSla: [262800000],
            settlementInquiry5Day: [82800000],
            settlementInquiry10Day: [162000000],
            projectInquiries:  [162000000],
            rtoCompliance: [82800000]
        };

        let newData = getATRChartData(data);

        expect(newData).toEqual(expectedData);
    });


});

describe('getDepartmentChartData', () => {
    it('should return formatted data for chart', () => {
        let data = [
            {
                "departmentName": "Engineering",
                "averageTimeToResolution": 162000000,
                "quarterEnd" : new Date("Sun Dec 31 2017 19:00:00 GMT-0500 (Central Daylight Time)"),
                "quarterBegin" : new Date('Tue Oct 31 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "numberOfTasksAssigned" : 582.0
            },

            {
                "departmentName": "Engineering",
                "averageTimeToResolution": 162000000,
                "quarterBegin" : new Date('Sun Apr 30 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "quarterEnd": new Date('Fri Jun 30 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "numberOfTasksAssigned" : 10.0
            },

            /* 15 */
            {
                "departmentName": "Engineering",
                "averageTimeToResolution": 162000000,
                "quarterEnd" : new Date("Fri Mar 31 2017 19:00:00 GMT-0500 (Central Daylight Time)"),
                "quarterBegin" : new Date('Tue Jan 31 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "numberOfTasksAssigned" : 654.0
            },
        ];

        let expectedData = {
            labels: [['Jan-2017 -','Mar-2017'],
                ['Apr-2017 -', 'Jun-2017'],
                ['Oct-2017 -', 'Dec-2017']],
            atr:[162000000,162000000,162000000],
            numOfTasks: [654, 10, 582]
        }

        let newData = getDepartmentChartData(data);

        expect(newData).toEqual(expectedData);
    })
});

describe('getPercentageChartData', () => {
    it('should format data for chart', () => {
        let data = [
            {
                value: 35,
                firstOfMonth: new Date('Sun Apr 30 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                percentageType: "First Call Resolution"
            },
            {
                value: 50,
                firstOfMonth: new Date('Tue Jul 30 2018 19:00:00 GMT-0500 (Central Daylight Time)'),
                percentageType: "First Call Resolution"
            },
            {
                value: 41,
                firstOfMonth: new Date('Fri Aug 31 2018 19:00:00 GMT-0500 (Central Daylight Time)'),
                percentageType: "First Call Resolution"
            }
        ];

        let expectedData= {
            labels: ['Apr-2017', 'Jul-2018', 'Aug-2018'],
            percentages: [35,50,41]
        };

        let newData = getPercentageChartData(data);

        expect(newData).toEqual(expectedData);
    })
});

describe('getOpenClosedChartData', () => {
    it('should return data formatted for the chart', () => {
        let data = [
            {
                "_id" : "5b3c4fd120fdcacf3949b669",
                "status" : "reopened",
                "firstOfMonth" : new Date("Fri Mar 31 2017 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 10.0
            },

            /* 15 */
            {
                "_id" : "5b3c4fd120fdcacf3949b66a",
                "status" : "closed",
                "firstOfMonth" : new Date("Fri Mar 31 2017 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 654.0
            },

            /* 16 */
            {
                "_id" : "5b3c4fd120fdcacf3949b66b",
                "status" : "opened",
                "firstOfMonth" : new Date("Fri Mar 31 2017 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 582.0
            },
            {
                "_id" : "5b3c4fd120fdcacf3949b669",
                "status" : "reopened",
                "firstOfMonth" : new Date("Tue Jul 31 2018 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 10.0
            },

            /* 15 */
            {
                "_id" : "5b3c4fd120fdcacf3949b66a",
                "status" : "closed",
                "firstOfMonth" : new Date("Tue Jul 31 2018 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 654.0
            },

            /* 16 */
            {
                "_id" : "5b3c4fd120fdcacf3949b66b",
                "status" : "opened",
                "firstOfMonth" : new Date("Tue Jul 31 2018 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 582.0
            },
            {
                "_id" : "5b3c4fd120fdcacf3949b669",
                "status" : "reopened",
                "firstOfMonth" : new Date("Wed Feb 28 2018 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 10.0
            },

            /* 15 */
            {
                "_id" : "5b3c4fd120fdcacf3949b66a",
                "status" : "closed",
                "firstOfMonth" : new Date("Wed Feb 28 2018 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 654.0
            },

            /* 16 */
            {
                "_id" : "5b3c4fd120fdcacf3949b66b",
                "status" : "opened",
                "firstOfMonth" : new Date("Wed Feb 28 2018 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 582.0
            },
        ];

        let chartData = getOpenClosedChartData(data);

        let expectedData = {
            labels:['Mar-2017', 'Feb-2018', 'Jul-2018'],
            openRequestsSeries:[582.0, 582.0, 582.0],
            closedRequestsSeries:[654.0, 654.0, 654.0]
        };

        expect(chartData).toEqual(expectedData);

    })
});

describe('getRequestTypesChartData', () => {
    it('should format data for chart', () => {
        let data = [
            {
                "_id" : "5b3c544920fdcacf3949b815",
                "requestType" : "General Inquiry",
                "firstOfMonth" : new Date("Thu Dec 01 2016 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 18
            },

            /* 4 */
            {
                "_id" : "5b3c544920fdcacf3949b817",
                "requestType" : "Z2 Inquiries &  Disputes",
                "firstOfMonth" : new Date("Thu Dec 01 2016 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 82
            },

            /* 9 */
            {
                "_id" : "5b3c544920fdcacf3949b81c",
                "requestType" : "Settlement Inquiry",
                "firstOfMonth" : new Date("Thu Dec 01 2016 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 82
            },

            /* 10 */
            {
                "_id" : "5b3c544920fdcacf3949b81d",
                "requestType" : "Gen Inq   No 1st Call",
                "firstOfMonth" : new Date("Thu Dec 01 2016 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 26
            },

            /* 11 */
            {
                "_id" : "5b3c544920fdcacf3949b81e",
                "requestType" : "Project  Inquiries",
                "firstOfMonth" : new Date("Thu Dec 01 2016 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 16
            },

            /* 13 */
            {
                "_id" : "5b3c544920fdcacf3949b820",
                "requestType" : "Settlement Dispute",
                "firstOfMonth" : new Date("Thu Dec 01 2016 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 62
            },
        ];

        let expectedData = {
            labels: ['Dec-2016'],
            generalInquiry: [18],
            genInqNo1stCall: [26],
            settlementInquiry: [82],
            settlementDispute: [62],
            projectInquiries: [16],
            z2InquiriesandDisputes: [82]
        };

        let newData = getRequestTypesChartData(data);

        expect(newData).toEqual(expectedData);
    });
});
