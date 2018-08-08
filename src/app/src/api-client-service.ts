import axios from 'axios';
//import * as JWT from 'jwt-decode';
import {
    convertStringToMilliSeconds,
    DepartmentRequestTypeReport,
    endDate,
    PercentageTypeReport,
    RequestsOpenClosedReport,
    RequestTypeReport,
    startDate,
    tryParseDateFromString
} from './util/util';

let rootUrl = '';

if (process.env.NODE_ENV === 'development') {
    rootUrl = 'http://localhost:8080'
}

export default class ApiClientService {
    private domain: string;

    constructor() {
        this.domain = rootUrl;
    }

    login = (username: string, password: string) => {
        return (username === 'bhudgins' && password === '123abc')
    };

    getRequestsOpenClosedReport = () => {
        const url = `${this.domain}/api/rms-requests-total/search/findByFirstOfMonthBetween`;

        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {startDate: startDate(), endDate: endDate()}
            })
                .then(({ status, data} ) => {
                    if (status === 200) {
                        data._embedded['rms-requests-total'].forEach((item: RequestsOpenClosedReport) =>{
                            item.firstOfMonth = tryParseDateFromString(item.firstOfMonth);
                        });
                        resolve(data._embedded['rms-requests-total']);
                    } else {
                        reject(new Error('error fetching data.'));
                    }
                });
        });
    };

    getRequestsItems = () => {
        const url = `${this.domain}/api/rms-request-types-total/search/findByFirstOfMonthBetween`;

        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: { startDate: startDate(), endDate: endDate()}
            })
                .then(({ status, data} ) => {
                    if (status === 200) {
                        data._embedded['rms-request-types-total'].forEach((item: RequestTypeReport) =>{
                            item.firstOfMonth = tryParseDateFromString(item.firstOfMonth);
                        });
                        resolve(data._embedded['rms-request-types-total']);
                    } else {
                        reject(new Error('error fetching data.'));
                    }
                });
        });
    };

    getATRReport = () => {
        const url = `${this.domain}/api/rms-time-to-resolution/search/findByFirstOfMonthBetween`;

        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {startDate: startDate(), endDate: endDate()}
            })
                .then(({ status, data} ) => {
                    if (status === 200) {
                        //console.log(data);
                        data._embedded['rms-time-to-resolution'].forEach((item: RequestTypeReport) =>{
                            item.value = convertStringToMilliSeconds(item.value);
                            item.firstOfMonth = tryParseDateFromString(item.firstOfMonth);
                        });
                        resolve(data._embedded['rms-time-to-resolution']);
                    } else {
                        reject(new Error('error fetching data.'));
                    }
                });
        });

    };

    getSLACompliancePercentageReport = () => {
        const url = `${this.domain}/api/rms-percentage-total/search/findByPercentageTypeAndFirstOfMonthBetween`;

        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {type:'SLA Compliance', startDate: startDate(), endDate:endDate()}
            })
                .then(({ status, data} ) => {
                    if (status === 200) {
                        data._embedded['rms-percentage-total'].forEach((item: PercentageTypeReport) =>{

                            item.firstOfMonth = tryParseDateFromString(item.firstOfMonth);
                        });
                        resolve(data._embedded['rms-percentage-total']);

                    } else {
                        reject(new Error('error fetching data.'));
                    }
                });
        });


    };

    getFirstCallResolutionReport = () => {
        const url = `${this.domain}/api/rms-percentage-total/search/findByPercentageTypeAndFirstOfMonthBetween`;

        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {type: 'First Call Resolution', startDate: startDate(), endDate:endDate()}
            })
                .then(({ status, data} ) => {
                    if (status === 200) {
                        //console.log(data);
                        data._embedded['rms-percentage-total'].forEach((item: PercentageTypeReport) =>{
                            item.firstOfMonth = tryParseDateFromString(item.firstOfMonth);
                        });
                        resolve(data._embedded['rms-percentage-total']);

                    } else {
                        reject(new Error('error fetching data.'));
                    }
                });
        });

    };

    getDepartmentReport = (props: string) => {
        const url = `${this.domain}/api/department-statistics/search/findByDepartmentNameAndQuarterBeginBetween`;

        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: {name: props, startDate: startDate(), endDate: endDate()}
            })
                .then(({ status, data} ) => {
                    if (status === 200) {
                        data._embedded['department-statistics'].forEach((item: DepartmentRequestTypeReport) =>{
                            item.quarterBegin = tryParseDateFromString(item.quarterBegin);
                            item.quarterEnd = tryParseDateFromString(item.quarterEnd);
                            item.averageTimeToResolution = convertStringToMilliSeconds(item.averageTimeToResolution);
                        });
                        resolve(data._embedded['department-statistics']);

                    } else {
                        reject(new Error('error fetching data.'));
                    }
                });
        });
    };

    getTableSchema = (endpoint: string) => {
        const url = `${this.domain}/api/profile/${endpoint}`;

        // change accept
        let headers = {'Accept': 'application/schema+json'};

        return new Promise((resolve, reject) => {
            axios.get(url, {headers: headers})
                .then(({ status, data} ) => {
                    if (status === 200) {
                        resolve(data);

                    } else {
                        reject(new Error('error fetching data.'));
                    }
                });
        });
    };

    getTableData = (endpoint: string) => {
        const url = `${this.domain}/api/${endpoint}?size=1000`;

        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(({ status, data} ) => {
                    if (status === 200) {
                        resolve(data);

                    } else {
                        reject(new Error('error fetching data.'));
                    }
                });
        });
    };

    createTableData = (endpoint: string, payload: any) => {
        const url = `${this.domain}/api/${endpoint}`;

        return new Promise((resolve, reject) => {
            axios.post(url, payload)
                .then(({ status, data} ) => {
                    if (status === 201) {
                        resolve(data);

                    } else {
                        reject(new Error('error fetching data.'));
                    }
                });
        });
    };

    updateTableData = (url: string, payload: any) => {
        return new Promise((resolve, reject) => {
            axios.put(url, payload)
                .then(({ status, data} ) => {
                    if (status === 200) {
                        resolve(data);

                    } else {
                        reject(new Error('error fetching data.'));
                    }
                });
        });
    };

    deleteTableData = (url: string) => {
        return new Promise((resolve, reject) => {
            axios.delete(url)
                .then(({ status, data} ) => {
                    if (status === 204) {
                        resolve(data);

                    } else {
                        reject(new Error('error fetching data.'));
                    }
                });
        });
    };
}