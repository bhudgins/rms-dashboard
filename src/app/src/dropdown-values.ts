import {DropdownItemProps} from "semantic-ui-react";

export const percentageTypes: string[] = [
    "SLA Compliance",
    "First Call Resolution"
];

export const requestTypes: string[] = [
    'General Inquiry',
    'Gen Inq No 1st Call',
    'Settlement Inquiry',
    'Contact Update',
    'Document Submittal',
    'RTO Compliance',
    'Caller Enhancement',
    'Requests Project',
    'Inquiries',
    'Banking Info Market Monitor',
    'Process Tracking',
    'Map - Model - NDA',
    'Revision Requests - Comments',
    'Make the Right Call',
    'ITP Submittals',
    'Order 1000',
    'GlobalScape Access',
    'Change Mngmt Requests',
    'Z2 Inquiries & Disputes',
    'Banking Info',
    'Caller',
    'Enhancement Requests',
    'Market 2 Market',
    'Market Monitor',
    'NDA Requests',
    'Settlement Dispute',
    'Project Inquiries'
];

export const statuses: string[] = [
    'opened',
    'closed',
    'reopened'
];

export const timetoResolutionRequestTypes: string[] = [
    'General Inquiry 5 Day',
    'General Inquiry 10 Day',
    'General Inquiry 1 Month',
    'General Inquiry No SLA',
    'Document Submittal',
    'Settlement Inquiry 5 Day',
    'Settlement Inquiry 10 Day',
    'Settlement Inquiry 1 Month',
    'RTO Compliance',
    'Project Inquiries',
    'Red Flag Actual',
    'FERC Order 1000',
    'NDA Requests',
];

export const departmentNames: string[] =[
    'No Department Identified',
    'Communication',
    'Compliance',
    'Corporate Services',
    'Credit',
    'Customer Relations',
    'Engineering',
    'Finance',
    'Information Technology (Direct)',
    'Information Technology (Remedy)',
    'Legal',
    'Market Monitoring',
    'Market Design',
    'Operations',
    'Ops - Day Ahead Market',
    'Ops - Market Forensics',
    'Ops - Modeling/Data Integrity',
    'Ops - Model Coordination',
    'Ops - Real Time Markets',
    'Ops - Tariff Administration',
    'Project Management',
    'Regulatory',
    'Settlements',
    'TCR',
    'Training',
    'Contractors',
    'ENG Modeling'
];

export const editorDropdownValues = {
    "department-statistics" :{
        departmentName: departmentNames
    },
    "rms-percentage-total" :{
        percentageType: percentageTypes
    },
    "rms-requests-total" :{
        status: statuses
    },
    "rms-request-types-total" :{
        requestType: requestTypes
    },
    "rms-time-to-resolution" :{
        requestType: timetoResolutionRequestTypes
    }
};

export const departmentDropdownValues: DropdownItemProps[] =[
    {text: 'No Department Identified', value:'noDepartmentIdentified', key: 'noDepartmentIdentified'},
    {text: 'Communication', value:'communication', key: 'communication'},
    {text: 'Compliance', value:'compliance', key: 'compliance'},
    {text: 'Corporate Services', value:'corporateServices', key: 'corporateServices'},
    {text: 'Credit', value:'credit', key: 'credit'},
    {text: 'Customer Relations', value:'customerRelations', key: 'customerRelations'},
    {text: 'Engineering', value:'engineering', key: 'engineering'},
    {text: 'Finance', value:'finance', key: 'finance'},
    {text: 'Information Technology (Direct)', value:'informationTechnologyDirect', key: 'informationTechnologyDirect'},
    {text: 'Information Technology (Remedy)', value:'informationTechnologyRemedy', key: 'informationTechnologyRemedy'},
    {text: 'Legal', value:'legal', key: 'legal'},
    {text: 'Market Monitoring', value:'marketMonitoring', key: 'marketMonitoring'},
    {text: 'Market Design', value:'marketDesign', key: 'marketDesign'},
    {text: 'Operations', value:'operations', key: 'operations'},
    {text: 'Ops - Day Ahead Market', value:'opsDayAheadMarket', key: 'opsDayAheadMarket'},
    {text: 'Ops - Market Forensics', value:'opsMarketForensics', key: 'opsMarketForensics'},
    {text: 'Ops - Modeling/Data Integrity', value:'opsModelingDataIntegrity', key: 'opsModelingDataIntegrity'},
    {text: 'Ops - Model Coordination', value:'opsModelCoordination', key: 'opsModelCoordination'},
    {text: 'Ops - Real Time Markets', value:'opsRealTimeMarkets', key: 'opsRealTimeMarkets'},
    {text: 'Ops - Tariff Administration', value:'opsTariffAdministration', key: 'opsTariffAdministration'},
    {text: 'Project Management', value:'projectManagement', key: 'projectManagement'},
    {text: 'Regulatory', value:'regulatory', key: 'regulatory'},
    {text: 'Settlements', value:'settlements', key: 'settlements'},
    {text: 'TCR', value:'tcr', key: 'tcr'},
    {text: 'Training', value:'training', key: 'training'},
    {text: 'Contractors', value:'contractors', key:'contractors'},
    {text:'ENG Modeling', value:'engModeling', key:'engModeling'}
];

export const requestTypeDropdownValues: DropdownItemProps[] = [
    {key: 'generalInquiry', value:'generalInquiry', text: 'General Inquiry'},
    {key: 'genInq', value: 'genInq', text:'Gen Inq'},
    {key: 'no1stCall', value:'no1stCall', text: 'Gen Inq No 1st Call'},
    {key: 'settlementInquiry', value:'settlementInquiry', text:'Settlement Inquiry'},
    {key:'contactUpdate', value:'contactUpdate', text:'Contact Update'},
    {key:'documentSubmittal', value:'documentSubmittal', text:'Document Submittal'},
    {key:'rtoCompliance', value:'rtoCompliance', text:'RTO Compliance'},
    {key:'callerEnhancement', value:'callerEnhancement', text:'Caller Enhancement'},
    {key:'requestsProject', value:'requestsProject', text:'Requests Project'},
    {key:'inquiries', value:'inquiries', text:'Inquiries'},
    {key:'bankingInfoMarketMonitor', value:'bankingInfoMarketMonitor', text:'Banking Info Market Monitor'},
    {key:'processTracking', value:'processTracking', text:'Process Tracking'},
    {key:'mapModelNda', value:'mapModelNda', text:'Map - Model - NDA'},
    {key:'revisionRequestsComments', value:'revisionRequestsComments', text:'Revision Requests - Comments'},
    {key:'makeTheRightCall', value:'makeTheRightCall', text:'Make the Right Call'},
    {key:'itpSubmittals', value:'itpSubmittals', text:'ITP Submittals'},
    {key:'Order1000', value:'Order1000', text:'Order 1000'},
    {key:'globalScapeAccess', value:'globalScapeAccess', text:'GlobalScape Access'},
    {key:'changeMngmtRequests', value:'changeMngmtRequests', text:'Change Mngmt Requests'},
    {key:'Z2Inquiries&Disputes', value:'Z2Inquiries&Disputes', text:'Z2 Inquiries & Disputes'},
    {key: 'bankingInfo', value:'bankingInfo', text: 'Banking Info'},
    {key: 'caller', value:'caller', text: 'Caller'},
    {key: 'enhancementRequests', value:'enhancementRequests', text: 'Enhancement Requests'},
    {key: 'market2Market', value:'market2Market', text: 'Market 2 Market'},
    {key: 'marketMonitor', value:'marketMonitor', text: 'Market Monitor'},
    {key: 'ndaRequests', value:'ndaRequests', text: 'NDA Requests'},
    {key: 'settlementDispute', value:'settlementDispute', text: 'Settlement Dispute'},
    {key: 'projectInquiries', value: 'projectInquiries', text: 'Project Inquiries'}
];

export const requestTotalsDropdownValues: DropdownItemProps[] =[
    {key:'opened', value:'opened', text:'Requests Opened'},
    {key:'closed', value:'closed', text:'Requests Closed'},
    {key:'reopened', value:'reopened', text:'Requests Re-Opened'}
];

export const timeToResolutionsDropdownValues: DropdownItemProps[]=[
    {key:'generalInquiry5Day', value:'generalInquiry5Day', text:'General Inquiry 5 Day'},
    {key:'generalInquiry10Day', value:'generalInquiry10Day', text:'General Inquiry 10 Day'},
    {key:'generalInquiry1Month', value:'generalInquiry1Month', text:'General Inquiry 1 Month'},
    {key:'generalInquiryNoSla', value:'generalInquiryNoSla', text:'General Inquiry No SLA'},
    {key:'documentSubmittal', value:'documentSubmittal', text:'Document Submittal'},
    {key:'settlementInquiry5Day', value:'settlementInquiry5Day', text:'Settlement Inquiry 5 Day'},
    {key:'settlementInquiry10Day', value:'settlementInquiry10Day', text:'Settlement Inquiry 10 Day'},
    {key:'settlementInquiry1Month', value:'settlementInquiry1Month', text:'Settlement Inquiry 1 Month'},
    {key:'rtoCompliance', value:'rtoCompliance', text:'RTO Compliance'},
    {key:'projectInquiries', value:'projectInquiries', text:'Project Inquiries'},
    {key:'redFlagActual', value:'redFlagActual', text:'Red Flag Actual'},
    {key:'fercOrder1000', value:'fercOrder1000', text:'FERC Order 1000'},
    {key:'ndaRequests', value:'ndaRequests', text:'NDA Requests'}
];
export const percentageTypesDropdownValues: DropdownItemProps[] = [
    {key: 'slaCompliance', value: "slaCompliance", text:"SLA Compliance"},
    {key: 'firstCallResolution', value: 'firstCallResolution', text: "First Call Resolution"}
];