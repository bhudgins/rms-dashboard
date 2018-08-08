import * as React from 'react';
import {Container, Grid} from 'semantic-ui-react';
import MonthlyRmsMetricsSection from "../MonthlyRmsMetricsSection/MonthlyRmsMetricsSection";
import DepartmentalViewSection from "../DepartmentalViewSection/DepartmentalViewSection";
import SidePanel from '../SidePanel/SidePanel';
import {connect} from "react-redux";
import {Redirect} from "react-router";

interface Props {
    isLoggedIn?: boolean;
}

interface State {

}

class CombinedMonthlyAndDepartmentComponents extends React.Component <Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        console.log(this.props.isLoggedIn);

        if(this.props.isLoggedIn) {
            return (
                <Container fluid={true}>
                    <Grid>
                        <Grid.Row>
                            <SidePanel />
                            <Grid.Column computer={13}>
                    <Grid.Row>
                        <MonthlyRmsMetricsSection/>
                    </Grid.Row>
                    <div style={{margin: '20px'}}>.</div>
                    <Grid.Row>
                        <DepartmentalViewSection/>
                    </Grid.Row>
                </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>

            );
        }
        else{
            return <Redirect to={'/login'}/>
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.loginToggle
    }
};

const CombinedMonthlyAndDepartmentComponentsConnected = connect(mapStateToProps)
    (CombinedMonthlyAndDepartmentComponents);

export default CombinedMonthlyAndDepartmentComponentsConnected;