import * as React from "react";
import {FormEvent} from "react";
import {Button, Divider, Form, Grid, Header, InputOnChangeData, Segment} from "semantic-ui-react";
import ApiClientService from "../../api-client-service";
import {connect} from "react-redux";
import * as actionTypes from "../../store/actions";
import {Redirect} from "react-router";

interface PageProps {
    userToken?: string;
    isLoggedIn?: boolean;
    updateToken: (token: string) => Promise<void>;
    updateLoginToggle: (loginToggle: boolean) => Promise<void>;
}

interface PageState {
    username: string;
    password: string;
    loginFailed: JSX.Element
}

// TODO - redirect to home page after login.
class LoginPage extends React.Component<PageProps, PageState> {

    private client: ApiClientService;

    constructor(props: PageProps, state: PageState) {
        super(props);

        this.client = new ApiClientService();

        this.state = {
            username: '',
            password: '',
            loginFailed: <div/>
        }
    }

    handleChange = (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({[data.name]: data.value, loginFailed: <div/>});
    };



    handleSubmit = (event: FormEvent<HTMLFormElement>, data: any) => {
         if(this.client.login(this.state.username, this.state.password))
         {
                console.log("completed");
                this.props.updateLoginToggle(true);
                //this.props.updateToken(response);
                console.log(this.props.isLoggedIn);
                console.log(this.props.userToken);
            }
            else{
                console.log("fail");
                this.setState({loginFailed :
                        <div style={{'color' : 'red'}}>
                            Username/Password is incorrect. Please enter valid credentials.
                        </div>});
        }
    };


    public render() {
        console.log(this.props.isLoggedIn);
        if(this.props.isLoggedIn) {
            return <Redirect to={'/'}/>;
        }
        else {
            return (
                <Grid.Column computer={13}>
                    <Header as={"h1"} textAlign={"center"}>RMS Dashboard Login</Header>
                    <Divider/>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={5}/>
                            <Grid.Column computer={6}>
                                {this.state.loginFailed}
                                <Segment color={"blue"}>

                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Field>
                                            <label>Username</label>
                                            <Form.Input placeholder={'your 3+4 username'} name={'username'}
                                                        id={'username'}
                                                        onChange={this.handleChange}/>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Password</label>
                                            <Form.Input type={"password"} placeholder={'password'} name={'password'}
                                                        id={'password'} onChange={this.handleChange}/>
                                        </Form.Field>
                                        <Button type='submit'>Login</Button>
                                    </Form>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            );
        }
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

const LoginPageConnected = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default LoginPageConnected;