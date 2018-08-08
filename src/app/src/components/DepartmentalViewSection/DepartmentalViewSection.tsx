import * as React from 'react';
import {Divider, Dropdown, Grid, Header} from "semantic-ui-react";
import {departmentDropdownValues} from "../../dropdown-values";
import DepartmentCharts from '../DepartmentCharts/DepartmentCharts';

interface PageProps {
}

interface PageState {
    dropDownSelection: string;
}

// interface DropDownOption {
//     key: string;
//     value: string;
//     text: string;
// }


class DepartmentalViewSection extends React.Component<PageProps, PageState> {
    constructor(props: PageProps, state: PageState) {
        super(props, state);
        this.state = {
            dropDownSelection: "No Department Identified"
        }
    }

    //selection: string = '';

    // onDropdownChange = (event: React.SyntheticEvent<HTMLDivElement>, data: DropDownOption) => {
    //     //console.log("IN onDropdownChange: ", event.target.textContent);
    //     this.setState({dropDownSelection: data.value});
    // }

    onDropdownChange = (event: any) => {
        //console.log("IN onDropdownChange: ", event.target.textContent);
        this.setState({dropDownSelection: event.target.textContent});
    }

    public render() {
        return (
            <Grid.Column computer={16}>
                <Header as={"h1"} textAlign={"center"}>Departmental Metrics</Header>
                <Divider />
                <Grid>
                    <Grid.Row stretched={true}>
                        <Grid.Column computer={4}>
                                <Dropdown
                                    placeholder="No Department Identified"
                                    scrolling={true}
                                    fluid={true}
                                    selection={true}
                                    search={true}
                                    options={departmentDropdownValues}
                                    onChange={this.onDropdownChange}/>
                        </Grid.Column>
                    </Grid.Row>
                    <DepartmentCharts dept={this.state.dropDownSelection}/>
                </Grid>
            </Grid.Column>
        );
    }
}

export default DepartmentalViewSection;