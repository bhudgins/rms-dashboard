import * as React from 'react';
import * as enzyme from 'enzyme';
import ATRRequestTypeChart from './ATRRequestTypeChart/ATRRequestTypeChart';
import {configure} from '../../setupTests';
import DepartmentCharts from "./DepartmentCharts/DepartmentCharts";
import FirstCallResolutionChart from "./FirstCallResolutionChart/FirstCallResolutionChart";
import RequestsOpenClosedChart from "./RequestsOpenClosedChart/RequestsOpenClosedChart";
import RequestsTypesChart from "./RequestsTypesChart/RequestsTypesChart";
import SLAComplianceChart from "./SLAComplianceChart/SLAComplianceChart";
import CombinedMonthlyAndDepartmentComponents
    from "./CombinedMonthlyAndDepartmentalComponents/CombinedMonthlyAndDepartmentalComponents";
import DepartmentalViewSection from "./DepartmentalViewSection/DepartmentalViewSection";
//import SidePanel from "./SidePanel/SidePanel";
import EditViewSection from "./EditViewSection/EditViewSection";
import MonthlyRmsMetricsSection from "./MonthlyRmsMetricsSection/MonthlyRmsMetricsSection";

configure();

describe('ATRRequestTypeChart', () => {
    it('renders without crashing', () => {
        enzyme.shallow(<ATRRequestTypeChart/>);
    });
});

describe("DepartmentCharts", () => {
    it('renders without crashing', () => {
      enzyme.shallow(<DepartmentCharts dept={"Engineering"}/>);
    })
});

describe("FirstCallResolutionChart", () => {
    it('renders without crashing', () => {
        enzyme.shallow(<FirstCallResolutionChart/>);
    })
});

describe("RequestsOpenClosedChart", () => {
    it('renders without crashing', () => {
        enzyme.shallow(<RequestsOpenClosedChart/>);
    })
});

describe("RequestsTypesChart", () => {
    it('renders without crashing', () => {
        enzyme.shallow(<RequestsTypesChart/>);
    })
});

describe("SLAComplianceChart", () => {
    it('renders without crashing', () => {
        enzyme.shallow(<SLAComplianceChart/>);
    })
});

describe("CombinedMonthlyAndDepartmentComponents", () => {
    it('renders without crashing', () => {
        enzyme.shallow(<CombinedMonthlyAndDepartmentComponents/>);
    })
});

describe("DepartmentalViewSection", () => {
    it('renders without crashing', () => {
        enzyme.shallow(<DepartmentalViewSection/>);
    })
});

/*describe("SidePanel", () => {
    it('renders without crashing', () => {
        enzyme.shallow(<SidePanel/>);
    })
});*/

describe("EditViewSection", () => {
    it('renders without crashing', () => {
        enzyme.shallow(<EditViewSection/>);
    })
});
describe("MonthlyRmsMetricsSection", () => {
    it('renders without crashing', () => {
        enzyme.shallow(<MonthlyRmsMetricsSection/>);
    })
});