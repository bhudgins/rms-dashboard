import {departmentDropdownValues} from "../../../dropdown-values";

const departments: string[] = departmentDropdownValues.map(item => {
    return item.text as string;
});

export const displaySchemas = {
    'department-statistics': {
        departmentName: {

            "ui:options": {
                enumOptions: departments,
                enumNames: departments
            }
        }
    },
    'rms-percentage-total': {},
    'rms-requests-total': {},
    'rms-request-types-total': {},
    'rms-time-to-resolution': {}
};