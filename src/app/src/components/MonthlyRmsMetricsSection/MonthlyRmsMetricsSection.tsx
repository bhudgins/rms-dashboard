import * as React from 'react';
import {Divider, Grid, Header, Segment} from "semantic-ui-react";
import RequestsOpenClosedChart from "../RequestsOpenClosedChart/RequestsOpenClosedChart";
import RequestsTypesChart from "../RequestsTypesChart/RequestsTypesChart";
import ATRRequestTypeChart from '../ATRRequestTypeChart/ATRRequestTypeChart';
import SLAComplianceChart from '../SLAComplianceChart/SLAComplianceChart';
import FirstCallResolutionChart from "../FirstCallResolutionChart/FirstCallResolutionChart";

interface PageProps {

}

class MonthlyRmsMetricsSection extends React.Component<PageProps> {
    constructor(props: PageProps) {
        super(props);
    }

    public render() {
        return (
            <Grid.Column computer={16}>
                <Header as={"h1"} textAlign={"center"}>Monthly RMS Metrics</Header>
                <Divider />
                <Grid>
                    <Grid.Row stretched={true}>
                        <Grid.Column computer={8}>
                            <Segment>
                                <Header as={"h4"}>
                                    Requests Opened and Closed
                                </Header>
                                <RequestsOpenClosedChart />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column computer={8}>
                            <Segment>
                                <Header as={"h4"}>
                                    Requests Types
                                </Header>
                                <RequestsTypesChart/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched={true}>
                        <Grid.Column computer={10}>
                            <Segment>
                                <Header as={"h4"}>
                                    Average Time to Resolution - By Request Type (Closed)
                                </Header>
                                <ATRRequestTypeChart/>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column computer={6}>
                            <Segment>
                                <Header as={"h4"}>
                                    SLA Compliance %
                                </Header>
                                <SLAComplianceChart/>
                            </Segment>
                            <Segment>
                                <Header as={"h4"}>
                                    First Call Resolution
                                </Header>
                                <FirstCallResolutionChart/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
        );
    }
}

// TODO - use the connect fuction to bind redux to our Component. create the mapToProps as well.
export default MonthlyRmsMetricsSection;