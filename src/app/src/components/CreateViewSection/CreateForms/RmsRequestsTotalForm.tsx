import * as React from "react";
import {FormEvent} from "react";
import {DropdownItemProps, Form, InputOnChangeData, Message} from "semantic-ui-react";
import {requestTotalsDropdownValues} from "../../../dropdown-values";
import {getFirstOfMonth, RequestsOpenClosedReport} from "../../../util/util";
import ApiClientService from "../../../api-client-service";

interface FormProps {

}

interface FormState {
}

const recordMapper = (key: any) => {
    let mapper = {};
    requestTotalsDropdownValues.map( (item: DropdownItemProps) =>{
        mapper[item.key] = item.value;
    });

    return mapper[key];
};

class RmsRequestsTotalForm extends React.Component<FormProps, FormState> {

    private client: ApiClientService;

    constructor(props: FormProps, state: FormState) {
        super(props, state);

        this.client = new ApiClientService();

        let mapper = {};
        requestTotalsDropdownValues.map( (item: DropdownItemProps) =>{
            mapper[item.key] = 0;
        });

        mapper["success"] = false;
        this.state = mapper;
    }

    mapToRecords = () => {
        const records: (RequestsOpenClosedReport|undefined)[] = Object.keys(this.state).map( key => {
            if(key !== "success") {
                let record: RequestsOpenClosedReport = {firstOfMonth: getFirstOfMonth(1), value: 0, status: ""};
                record.value = this.state[key];
                record.status = recordMapper(key);
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
        let form: any = document.getElementById('create-form');
        form.reset();
    };
    //successMessage = <br/>;

    handleSubmit = (event: FormEvent<HTMLFormElement>, data: FormProps) => {
        let promises: any = [];
        this.mapToRecords().forEach( record => promises.push(this.client.createTableData("rms-requests-total", record)));

        Promise.all(promises).then(()=> {
            this.setState({success: true});
        })
    };

    public render() {
        const inputs = requestTotalsDropdownValues.map( (item: DropdownItemProps, index: number) => {
            return <Form.Input type={"number"} fluid={true} label={item.text} name={item.value} onChange={this.handleChange}
                        key={index}/>;

        });

        return (
            <Form onSubmit={this.handleSubmit} success={this.state["success"]} id={"create-form"}>
                <Form.Group widths={'equal'}>
                    {inputs}
                </Form.Group>
                <Form.Group>
                    <Form.Button content={'Submit'} />
                </Form.Group>
                <Message success={true} header={"Submission Successful"} onDismiss={this.handleDismiss}/>
            </Form>
        )
    }
}

export default RmsRequestsTotalForm;