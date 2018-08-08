import * as React from 'react';
import {Accordion, AccordionAccordionProps, Container, Divider, Grid, Header, Icon} from "semantic-ui-react";
import RmsRequestsTotalForm from "./CreateForms/RmsRequestsTotalForm";
import RmsPercentageTotalForm from './CreateForms/RmsPercentageTotalForm';
import RmsRequestTypesTotalForm from "./CreateForms/RmsRequestTypesTotalForm";
import RmsTimeToResolutionForm from "./CreateForms/RmsTimeToResolutionForm";
import DepartmentStatisticsForm from "./CreateForms/DepartmentStatisticsForm";
//import ApiClientService from "../../api-client-service";
import {Redirect} from "react-router";
import SidePanel from '../SidePanel/SidePanel';
import {connect} from "react-redux";


interface SectionProps {
    isLoggedIn?: boolean;
}

interface SectionState {
    activeIndex: number;
}

class CreateViewSection extends React.Component<SectionProps, SectionState> {
    //private client: ApiClientService;
    constructor(props: SectionProps, state: SectionState) {
        super(props, state);

        //this.client = new ApiClientService();
        this.state = {
            activeIndex: 0
        }
    }

    handleClick = (event: React.SyntheticEvent<HTMLDivElement>, titleProps: AccordionAccordionProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex })
    };

    public render(){
        const { activeIndex } = this.state;
        if(this.props.isLoggedIn) {
            return (
                <Container fluid={true}>
                    <Grid>
                        <Grid.Row>

                            <SidePanel/>

                            <Grid.Column computer={13}>
                                <Header as={"h1"} textAlign={"center"}>Enter Data</Header>
                                <Divider/>
                                <Grid>
                                    <Grid.Row stretched={true}>
                                        <Grid.Column computer={16}>
                                            <Header as={"h3"}>
                                                Please enter the data for the previous month. Our application assumes that the data
                                                is being entered in for the previous month.
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column computer={16}>
                                            <Accordion fluid={true} styled={true}>

                                                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                                    <Icon name='dropdown'/>
                                                    RMS Request Totals
                                                </Accordion.Title>
                                                <Accordion.Content active={activeIndex === 0}>
                                                    <RmsRequestsTotalForm/>
                                                </Accordion.Content>

                                                <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                                                    <Icon name='dropdown'/>
                                                    Percentage Totals
                                                </Accordion.Title>
                                                <Accordion.Content active={activeIndex === 1}>
                                                    <RmsPercentageTotalForm/>
                                                </Accordion.Content>

                                                <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                                                    <Icon name='dropdown'/>
                                                    RMS Request Type Totals
                                                </Accordion.Title>
                                                <Accordion.Content active={activeIndex === 2}>
                                                    <RmsRequestTypesTotalForm/>
                                                </Accordion.Content>

                                                <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
                                                    <Icon name='dropdown'/>
                                                    Time to Resolution Totals
                                                </Accordion.Title>
                                                <Accordion.Content active={activeIndex === 3}>
                                                    <RmsTimeToResolutionForm/>
                                                </Accordion.Content>

                                                <Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick}>
                                                    <Icon name='dropdown'/>
                                                    Department Statistics Totals
                                                </Accordion.Title>
                                                <Accordion.Content active={activeIndex === 4}>
                                                    <p>
                                                        These Totals are updated quarterly.
                                                    </p>
                                                    <DepartmentStatisticsForm/>
                                                </Accordion.Content>

                                            </Accordion>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            );
        }
        else{
            return <Redirect to={'/'}/>
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.loginToggle
    }
};

const CreateViewSectionConnected = connect(mapStateToProps)
(CreateViewSection);

export default CreateViewSectionConnected;