import * as React from "react";
import {FormEvent} from "react";
import {timeToResolutionsDropdownValues} from "../../../dropdown-values";
import {DropdownItemProps, Form, Grid, InputOnChangeData, Message} from "semantic-ui-react";
import {getFirstOfMonth, RequestTypeReport} from "../../../util/util";
import ApiClientService from "../../../api-client-service";


interface FormProps {

}

interface FormState {

}

const inlineStyle = {
    error: {
        color: 'red',
        paddingBottom: '0px',
        paddingTop: '5px',
        height: '1em'
    }
};

const recordMapper = (key: any) => {
    let mapper = {};
    timeToResolutionsDropdownValues.map( (item: DropdownItemProps) =>{
        mapper[item.key] = item.text;
    });

    return mapper[key];
};

class RmsTimeToResolutionForm extends React.Component<FormProps, FormState> {

    private client: ApiClientService;

    constructor(props: FormProps, state: FormState) {
        super(props, state);

        this.client = new ApiClientService();

        let mapper = {};
        timeToResolutionsDropdownValues.map( (item: DropdownItemProps) =>{
            mapper[item.key] = "";
        });

        mapper["success"] = false;
        mapper['timeFormat'] = true;

        this.state = mapper;
    }

    mapToRecords = () => {

        this.state['timeFormat'] = true;
        const records: (RequestTypeReport|undefined)[] = Object.keys(this.state).map( (key,index) => {
            if(key !== "success" && key !== 'timeFormat') {
                let record: RequestTypeReport = {firstOfMonth: getFirstOfMonth(1), value: 0, requestType: ""};

                let error: any = document.getElementById(index + 'atrError');

                if((this.state[key].match('^(?:(?:([0-9]+):)?([0-5]?\\d):)?([0-5]?\\d)$'))
                    || this.state[key].trim() === '') {
                    record.value = this.state[key];
                    error.innerText = '';
                }
                else{
                    this.state['timeFormat'] = false;
                    this.setState({success: false});
                    error.innerText = "Please enter time in HH:MM:SS format";
                }
                record.requestType = recordMapper(key);
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
        this.setState({[data.name] : data.value});
    };

    handleDismiss = ()=>{
        this.setState({success: false});
        let form: any = document.getElementById('create-form-4');
        form.reset();
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>, data: FormProps) => {
        let promises: any = [];
        let records = this.mapToRecords();

        if (this.state['timeFormat']) {
            records.forEach(record => promises.push(this.client.createTableData("rms-time-to-resolution", record)));

            Promise.all(promises).then(() => {
                this.setState({success: true});
            })
        }
    };

    public render() {
        const inputs = timeToResolutionsDropdownValues.map( (item: DropdownItemProps, index) => {
            return <div key={index} >
                <Grid>
                    <Grid.Row style={inlineStyle.error}>
                        <Grid.Column computer={16}>
                            <div id={index+'atrError'}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={16}>
                            <Form.Input fluid={true} label={item.text} name={item.value} onChange={this.handleChange}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <br/>
            </div>
        });

        return (
            <Form onSubmit={this.handleSubmit} success={this.state["success"]} id={"create-form-4"}>
                {inputs}
                <Form.Group>
                    <Form.Button content={'Submit'} />
                </Form.Group>
                <Message success={true} header={"Submission Successful"} onDismiss={this.handleDismiss}/>
            </Form>
        )
    }
}

export default RmsTimeToResolutionForm;