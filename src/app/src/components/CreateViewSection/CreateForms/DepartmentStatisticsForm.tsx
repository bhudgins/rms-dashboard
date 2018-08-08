import * as React from "react";
import {FormEvent} from "react";
import {DropdownItemProps, Form, Grid, InputOnChangeData, Message} from "semantic-ui-react";
import {departmentDropdownValues} from "../../../dropdown-values";
import {DepartmentRequestTypeReport, getFirstOfMonth} from "../../../util/util";
import ApiClientService from "../../../api-client-service";

interface FormProps {

}

interface FormState {

}

const inlineStyle = {
    error: {
        color: 'red',
        padding: '0px',
        height: '1em'
    }
};

const recordMapper = (key: any) => {
    let mapper = {};
    departmentDropdownValues.map( (item: DropdownItemProps) =>{
        mapper[item.key] = item.text;
    });

    return mapper[key];
};

class DepartmentStatisticsForm extends React.Component<FormProps, FormState> {
    private client: ApiClientService;

    constructor(props: FormProps, state: FormState) {
        super(props, state);
        this.client = new ApiClientService();

        let mapper = {};
        departmentDropdownValues.map( (item: DropdownItemProps) =>{
            mapper[item.key] = {
                averageTimeToResolution: '',
                numberOfTasksAssigned: 0
            };
        });

        mapper['success'] = false;
        mapper['timeFormat'] = true;
        this.state = mapper;
    }

    mapToRecords = () => {

        this.state['timeFormat'] = true;
        const records: (DepartmentRequestTypeReport|undefined)[]  = Object.keys(this.state).map( (key, index) => {
            if(key !== 'success' && key !== 'timeFormat') {
                let record: DepartmentRequestTypeReport = {
                    quarterEnd: getFirstOfMonth(1), quarterBegin: getFirstOfMonth(3),
                    departmentName: "", averageTimeToResolution: '', numberOfTasksAssigned: 0
                };
                record.numberOfTasksAssigned = this.state[key].numberOfTasksAssigned;

                let error: any = document.getElementById(index + 'atrError');

                if((this.state[key].averageTimeToResolution.match('^(?:(?:([0-9]+):)?([0-5]?\\d):)?([0-5]?\\d)$'))
                    || this.state[key].averageTimeToResolution.trim() === '') {
                    record.averageTimeToResolution = this.state[key].averageTimeToResolution;
                    error.innerText = '';
                }
                else{
                    this.state['timeFormat'] = false;
                    this.setState({success: false});
                    error.innerText = "Please enter time in HH:MM:SS format";
                }
                record.departmentName = recordMapper(key);
                return record;
            }
            else
                return;

        });

        let num = 0;
        while(num !== -1) {
            num = records.indexOf(undefined);
            records.splice(num, 1);
        }
        return records;
    };

    handleChange = (event: React.SyntheticEvent<HTMLInputElement>,  data: InputOnChangeData) => {
        if(data.type === "number")
            this.setState({[data.name] : {numberOfTasksAssigned: parseInt(data.value), averageTimeToResolution: this.state[data.name].averageTimeToResolution}});
        else if(data.type === "text")
            this.setState(({[data.name] : {averageTimeToResolution: data.value, numberOfTasksAssigned: this.state[data.name].numberOfTasksAssigned}}));
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>, data: FormProps) => {
        let promises: any = [];
        let records = this.mapToRecords();

        if(this.state['timeFormat']) {
            records.forEach(record => promises.push(this.client.createTableData("department-statistics", record)));
            Promise.all(promises).then(() => {
                this.setState({success: true});
            })
        }
    };

    handleDismiss = ()=>{
        this.setState({success: false});
        let form: any = document.getElementById('create-form-5');
        form.reset();
    };

    public render() {
        const inputs = departmentDropdownValues.map( (item: DropdownItemProps, index) => {
            return <div key={index}><h3>{item.text}</h3>
                <Grid>
                    <Grid.Row  style={inlineStyle.error}>
                        <Grid.Column computer={8}/>
                        <Grid.Column computer={8}>
                            <div id={index+'atrError'} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={8}>
                            <Form.Input inline={true} type={"number"} fluid={true} label={"Number of Tasks Assigned"}
                                        name={item.value} onChange={this.handleChange}/>
                        </Grid.Column>
                        <Grid.Column computer={8}>
                            <Form.Input inline={true} fluid={true} label={"Average Time to Resolution"}
                                        name={item.value} onChange={this.handleChange} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <br/>
            </div>
        });

        return (
            <Form onSubmit={this.handleSubmit} success={this.state["success"]} id={'create-form-5'}>
                {inputs}
                <Form.Group>
                    <Form.Button content={'Submit'} />
                </Form.Group>
                <Message success={true} header={"Submission Successful"} onDismiss={this.handleDismiss}/>
            </Form>
        )
    }
}

export default DepartmentStatisticsForm;