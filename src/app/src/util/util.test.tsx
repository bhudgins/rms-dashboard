import {
    convertStringToMilliSeconds,
    getFirstOfMonth,
    sortYearMonth,
    sortYearMonthDepartment, startDate,
    tryParseDateFromString
} from './util';

describe('sortYearMonth', () => {
    it('should properly sort dates', () => {
        let data = [
            {
                "_id" : "5b3c4fd120fdcacf3949b669",
                "status" : "reopened",
                "firstOfMonth" : new Date('Sun Apr 30 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
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
                "firstOfMonth" : new Date("Sun Dec 31 2017 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 582.0
            },
        ];

        data.sort(sortYearMonth);

        let sortedData = [
            /* 15 */
            {
                "_id" : "5b3c4fd120fdcacf3949b66a",
                "status" : "closed",
                "firstOfMonth" : new Date("Fri Mar 31 2017 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 654.0
            },

            {
                "_id" : "5b3c4fd120fdcacf3949b669",
                "status" : "reopened",
                "firstOfMonth" : new Date('Sun Apr 30 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "value" : 10.0
            },

            /* 16 */
            {
                "_id" : "5b3c4fd120fdcacf3949b66b",
                "status" : "opened",
                "firstOfMonth" : new Date("Sun Dec 31 2017 19:00:00 GMT-0500 (Central Daylight Time)"),
                "value" : 582.0
            },
        ];

        expect(data).toEqual(sortedData);
    })
});

describe('sortYearMonthDepartment', () => {
    it('should properly sort dates by quarterBegin field', () => {
        let data = [
            /* 16 */
            {
                "_id" : "5b3c4fd120fdcacf3949b66b",
                "averageTimeToResolution": 162000000,
                "quarterEnd" : new Date("Sun Dec 31 2017 19:00:00 GMT-0500 (Central Daylight Time)"),
                "quarterBegin" : new Date('Tue Oct 31 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "numberOfTasksAssigned" : 582.0
            },

            {
                "_id" : "5b3c4fd120fdcacf3949b669",
                "averageTimeToResolution": 162000000,
                "quarterBegin" : new Date('Sun Apr 30 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "quarterEnd": new Date('Fri Jun 30 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "numberOfTasksAssigned" : 10.0
            },

            /* 15 */
            {
                "_id" : "5b3c4fd120fdcacf3949b66a",
                "averageTimeToResolution": 162000000,
                "quarterEnd" : new Date("Fri Mar 31 2017 19:00:00 GMT-0500 (Central Daylight Time)"),
                "quarterBegin" : new Date('Tue Jan 31 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "numberOfTasksAssigned" : 654.0
            },
        ];

        data.sort(sortYearMonthDepartment);

        let sortedData = [
            /* 15 */
            {
                "_id" : "5b3c4fd120fdcacf3949b66a",
                "status" : "closed",
                "quarterEnd" : new Date("Fri Mar 31 2017 19:00:00 GMT-0500 (Central Daylight Time)"),
                "quarterBegin" : new Date('Tue Jan 31 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "value" : 654.0
            },
            /* 15 */
            {
                "_id" : "5b3c4fd120fdcacf3949b669",
                "status" : "reopened",
                "quarterBegin" : new Date('Sun Apr 30 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "quarterEnd": new Date('Fri Jun 30 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "value" : 10.0
            },
            /* 16 */
            {
                "_id" : "5b3c4fd120fdcacf3949b66b",
                "status" : "opened",
                "quarterEnd" : new Date("Sun Dec 31 2017 19:00:00 GMT-0500 (Central Daylight Time)"),
                "quarterBegin" : new Date('Tue Oct 31 2017 19:00:00 GMT-0500 (Central Daylight Time)'),
                "value" : 582.0
            },
        ];

        expect(data).toEqual(sortedData);
    })
});

describe('tryParseDateFromString', () => {
    it('should convert string to date or return null', () => {
        let date = '2017-4-18';
        let newDate = tryParseDateFromString(date);

        expect(newDate).toEqual(new Date('Sun Apr 30 2017 19:00:00 GMT-0500 (Central Standard Time)'))
    })
});

describe('convertStringToMilliseconds', () => {
    it('should convert time string to milliseconds', () => {
        let timeString = "96:35:00";
        let millisecs = convertStringToMilliSeconds(timeString);

        expect(millisecs).toEqual(347700000);
    })
});

describe('getFirstOfMonth', () => {
    it('should get date as string with defined offset', () => {
        const offset = 1;
        let firstOfPreviousMonth = getFirstOfMonth(offset);

        expect(firstOfPreviousMonth).toEqual("2018-06-01");
    })
});

describe('getStartDate', () => {
    it('should get date from 13 months back as string', () => {
        let startDateString = startDate();

        expect(startDateString).toEqual("2017-6-01");
    })
});
