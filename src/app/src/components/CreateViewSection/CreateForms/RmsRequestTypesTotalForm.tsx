import * as React from "react";
import {FormEvent} from "react";
import {DropdownItemProps, Form, InputOnChangeData, Message} from "semantic-ui-react";
import {requestTypeDropdownValues} from "../../../dropdown-values";
import {getFirstOfMonth, RequestTypeReport} from "../../../util/util";
import ApiClientService from "../../../api-client-service";


interface FormProps {

}

interface FormState {

}

const recordMapper = (key: any) => {
    let mapper = {};
    requestTypeDropdownValues.map( (item: DropdownItemProps) =>{
        mapper[item.key] = item.text;
    });

    return mapper[key];
};

class RmsRequestTypesTotalForm extends React.Component<FormProps, FormState> {

    private client: ApiClientService;

    constructor(props: FormProps, state: FormState) {
        super(props, state);

        this.client = new ApiClientService();

        let mapper = {};
        requestTypeDropdownValues.map( (item: DropdownItemProps) =>{
            mapper[item.key] = 0;
        });

        mapper["success"] = false;

        this.state = mapper;
    }

    mapToRecords = () => {
        const records: (RequestTypeReport|undefined)[] = Object.keys(this.state).map( key => {
            if(key!== 'success') {
                let record: RequestTypeReport = {firstOfMonth: getFirstOfMonth(1), value: 0, requestType: ""};
                record.value = this.state[key];
                record.requestType = recordMapper(key);
                return record;
            }
            else
                return;
        });

        let num = records.indexOf(undefined);
        records.splice(num, 1);

        return records;
    };

    handleChange = (event: React.SyntheticEvent<HTMLInputElement>,  data: InputOnChangeData) => {
        this.setState({[data.name] : parseInt(data.value)});
    };

    handleDismiss = ()=>{
        this.setState({success: false});
        let form: any = document.getElementById('create-form-3');
        form.reset();
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>, data: FormProps) => {
        let promises: any = [];
        this.mapToRecords().forEach( record => promises.push(this.client.createTableData("rms-request-types-total", record)));

        Promise.all(promises).then(()=> {
            this.setState({success: true});
        })
    };

    public render() {
        const inputs = requestTypeDropdownValues.map( (item: DropdownItemProps, index) => {
            return <Form.Input key={index} inline={true} type={"number"} fluid={true} label={item.text} name={item.value}
                        onChange={this.handleChange}/>;
        });

        return (
            <Form onSubmit={this.handleSubmit} success={this.state["success"]} id={"create-form-3"}>
                    {inputs}
                <Form.Group>
                    <Form.Button content={'Submit'} />
                </Form.Group>
                <Message success={true} header={"Submission Successful"} onDismiss={this.handleDismiss}/>
            </Form>
        )
    }
}

export default RmsRequestTypesTotalForm;