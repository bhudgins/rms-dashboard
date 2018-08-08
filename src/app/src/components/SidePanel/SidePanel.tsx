import * as React from 'react';
import {Button, Grid, Header, List, Segment} from 'semantic-ui-react';
//import ApiClientService from "../../api-client-service";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';


const inlineStyle = {
    buttonStyle:{
        padding: '1% 3%',
        marginLeft: '25%',
        width: '24%',
        backgroundColor: '#6199da',
        color: '#ffffff',
    },
    linkStyle:{
        color: '#FFFFFF'
    }
};
interface Props {
    isLoggedIn?: boolean;
    updateToken: (token: string) => Promise<void>;
    updateLoginToggle: (loginToggle: boolean) => Promise<void>;
}

interface State {
    loginMenuItem: string;
    menuItems: MenuItem[];
}

interface MenuItem {
    link: string;
    name: string;
    description: string;
    accessLevel: string;
}

let loginMenuItem = 'Logout';

const allMenuItems: MenuItem[] = [
    {
        link: '/',
        name: 'RMS Metrics',
        description: 'Rolling 12 Month View and Requests by Department',
        accessLevel: 'ROLE_USER'
    },
    {
        link: '/edit',
        name: 'Edit',
        description: 'Edit existing data',
        accessLevel: 'ROLE_ADMIN'
    },
    {
        link: '/create',
        name: 'Create',
        description: 'Input data that drives the visualizations for RMS Dashboard',
        accessLevel: 'ROLE_ADMIN'
    }
];


class SidePanel extends React.Component<Props, State> {

   // private client: ApiClientService;

    constructor(props: Props, state: State) {
        super(props);

       // this.client = new ApiClientService();

        this.state = {
            loginMenuItem: loginMenuItem,
            menuItems: []
        }
    }

    //TODO - look at how to store our menuItems in our redux store. then we can iterate over them here to build the menu list
    getMenuItems = () => {
        return this.state.menuItems.map( (item: MenuItem, index: number) => (
            <List.Item key={index}>
                <List.Content>
                    <List.Header><Link to={item.link} >{item.name}</Link></List.Header>
                    <List.Description as={"p"}>{item.description}</List.Description>
                </List.Content>
            </List.Item>
        ));
    };

    handleLoginOnClick = () => {
        //this.client.logout().then( response => {
            // we are calling the function that is setup in the mapDispatchToProps
            //if (response == true)
                this.props.updateLoginToggle(false);
        //});
    };

    getLoginMenuItems = () => {
        //console.log(this.props.isLoggedIn);
        if(this.props.isLoggedIn){
            return <Button style={inlineStyle.buttonStyle} onClick={this.handleLoginOnClick}>{this.state.loginMenuItem}</Button>
        }
        else
        {
            return <div/>;
        }

    };


    componentWillMount() {
        if(this.props.isLoggedIn) {
            //.filter(item => this.client.getRoles().indexOf(item.accessLevel) > -1)
            this.setState({menuItems: allMenuItems});
        }
    }

    public render() {
        return (
            <Grid.Column computer={3}>
                <Segment>
                    <Header as={"h3"}>
                        RMS Dashboard
                        {this.getLoginMenuItems()}
                    </Header>
                    <List divided={true} relaxed={true}>
                        {this.getMenuItems()}
                    </List>
                </Segment>
            </Grid.Column>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        userToken: state.userToken,
        isLoggedIn: state.loginToggle
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateToken: (token: string) => dispatch({type: actionTypes.CHANGE_TOKEN, payload: token}),
        updateLoginToggle: (loginToggle: boolean) => dispatch({type: actionTypes.TOGGLE_LOGIN, payload: loginToggle})
    }
};

const SidePanelConnected = connect(mapStateToProps, mapDispatchToProps)(SidePanel);

export default SidePanelConnected;
