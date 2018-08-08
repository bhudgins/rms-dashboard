import * as React from 'react';
import {Container, Divider, Dropdown, Grid, Header} from "semantic-ui-react";
import DataTable from "./DataTable/DataTable";
import {Links, Page, RmsResponse, TableSchema} from "./EditViewInterfaces";
import {titleCase} from "../../util/util";
import ApiClientService from "../../api-client-service";
import {Redirect} from "react-router";
import SidePanel from '../SidePanel/SidePanel';
import {connect} from "react-redux";

interface DropDownOption {
    key: string;
    value: string;
    text: string;
}

interface SectionProps {
    isLoggedIn?: boolean;
}

interface SectionState {
    schema: any;
    data: any[];
    links: Links;
    pagination: Page;
    endpoint: string;
}

const editorDropdownValues: DropDownOption[] = [
    {text: 'Department Statistics', value: 'department-statistics', key: 'departmentalStatistics'},
    {text: 'Percentage Totals', value: 'rms-percentage-total', key: 'rmsPercentagesTotal'},
    {text: 'Request Totals', value: 'rms-requests-total', key: "rmsRequestsTotals"},
    {text: 'Request Types Totals', value:'rms-request-types-total', key: 'rmsRequestTypesTotals'},
    {text: 'Time to Resolutions', value: 'rms-time-to-resolution', key: "rmsTimeToResolutions"}
];

class EditViewSection extends React.Component<SectionProps, SectionState> {

    private client: ApiClientService;

    constructor(props: SectionProps, state: SectionState) {
        super(props, state);

        this.client = new ApiClientService();

        this.state = {
            schema: {},
            data: [],
            pagination: {"size": 0,"totalElements": 0,"totalPages": 0,"number": 0},
            links: {"first": {"href": ""}, "self": {"href": ""},"next": {"href": ""},"last": {"href": ""},"profile": {"href": ""},"search": {"href": ""}},
            endpoint: ""
        }
    }

    getSchema = (endpoint: string) => {
        this.client.getTableSchema(endpoint)
            .then( (response: TableSchema) => {
                response.title = titleCase(response.title);
                this.setState({schema: response});
        });
    };

    getData = (endpoint: string) => {
        this.client.getTableData(endpoint)
            .then( (response: RmsResponse) => {
                let data: any[] = [];
                Object.keys(response._embedded).forEach( key => data = response._embedded[key]);
                this.setState({pagination: response.page, links: response._links, data: data,  endpoint: endpoint})
        });
    };

    onDropdownChange = (event: React.SyntheticEvent<HTMLDivElement>, data: DropDownOption) => {
        this.getSchema(data.value);
        this.getData(data.value);
    };


    public render() {
        if(this.props.isLoggedIn) {
            return (
                <Container fluid={true}>
                    <Grid>
                        <Grid.Row>
                            <SidePanel/>

                            <Grid.Column computer={13}>
                                <Header as={"h1"} textAlign={"center"}>Edit/Enter Data</Header>
                                <Divider/>
                                <Grid>
                                    <Grid.Row stretched={true}>
                                        <Grid.Column computer={10}>
                                            <Header as={"h3"}>{this.state.schema.title || ""}</Header>
                                        </Grid.Column>
                                        <Grid.Column computer={6}>
                                            <Dropdown placeholder={"Select Item..."}
                                                      fluid={true}
                                                      selection={true}
                                                      options={editorDropdownValues}
                                                      onChange={this.onDropdownChange}
                                                      search={true}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column computer={16}>
                                            <DataTable schema={this.state.schema} data={this.state.data} links={this.state.links}
                                                       pagination={this.state.pagination} endpoint={this.state.endpoint}/>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            );
        }
        else {
            return <Redirect to={'/'}/>;
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.loginToggle
    }
};

const EditViewSectionConnected = connect(mapStateToProps)
(EditViewSection);

export default EditViewSectionConnected;