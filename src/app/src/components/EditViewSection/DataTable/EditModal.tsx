import * as React from "react";
import {Button, Modal} from "semantic-ui-react";
import Form from "react-jsonschema-form";
import {JSONSchema6} from "json-schema";
import {TableSchema} from "../EditViewInterfaces";
import {RowInfo} from "react-table";
import {displaySchemas} from "./ui-schema";
import {editorDropdownValues} from "../../../dropdown-values";
import {titleCase} from "../../../util/util";
import './EditModal.css';
import ApiClientService from "../../../api-client-service";

const inlineStyle = {
    modal : {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

};

interface ModalProps {
    endpoint: string;
    schema: TableSchema;
    record: RowInfo;
    updateParent: any
}

interface ModalState {
    show: boolean
}


class EditModal extends React.Component<ModalProps, ModalState> {

    private client: ApiClientService;

    constructor(props: ModalProps, state: ModalState) {
        super(props, state);

        this.client = new ApiClientService();

        this.state = {
            show: false
        }
    }

    getDropdownValues = (key: string) => {
        return editorDropdownValues[this.props.endpoint][key];
    };



    toJSONSchema6 = () => {
        let schema = this.props.schema;
        Object.keys(schema.properties).map( item => {
            if(item === "departmentName" || item === "percentageType" || item === "status" || item === "requestType") {
                    schema.properties[item].enum = this.getDropdownValues(item);
            }
            else if(item === "firstOfMonth" || item === "quarterBegin" || item === "quarterEnd"){
                schema.properties[item].format = "date";
            }
            else if((item === "value" && schema.title === "RMS Time To Resolutions") || item === "averageTimeToResolution"){
                //schema.properties[item].format = "time";
                schema.properties[item].pattern = '^(?:(?:([0-9]+):)?([0-5]?\\d):)?([0-5]?\\d)$';

                let index = schema.properties[item].title.indexOf("HH:MM:SS");

                if(index === -1)
                    schema.properties[item].title += " (HH:MM:SS)";
            }

        });


        const jsonSchema6: JSONSchema6 = {
            title: titleCase(schema.title),
            properties:  schema.properties,
            definitions: schema.definitions,
            type: "object"
        };

        return jsonSchema6;
    };

    openHandler=()=>{
        this.setState({ show: true })
    };

    closeModal=()=> {
        this.setState({show: false});
    };

    handleSubmit = (evt: any) => {
        let newData = {};

        Object.keys(evt.formData).map(key => {
            if(key === "firstOfMonth" || key === "quarterBegin" || key === "quarterEnd" ||
                    key === "percentageType" || key === "status" || key === "value" || key === "requestType"
                    || key === "averageTimeToResolution" || key === "numberOfTasksAssigned" || key === "departmentName")
            {
                newData[key] = evt.formData[key];
            }
        });

        this.client.updateTableData(evt.formData["_links.self.href"], newData).then((response)=>{
            this.closeModal();
            this.props.updateParent(this.props.record['original'], response);
        });
    };

    render() {
        //const showModal = this.state.show;
        return (
        <Modal style={inlineStyle.modal} closeIcon={true} onClose={this.closeModal} open={this.state.show}
               trigger={<Button onClick={this.openHandler}>Edit</Button>}>
            <Modal.Header >Edit</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form className={"form"} schema={this.toJSONSchema6()} formData={this.props.record.row} uiSchema={displaySchemas[this.props.endpoint]}
                        onSubmit={this.handleSubmit}/>
                </Modal.Description>
            </Modal.Content>
        </Modal>
        )
    }
}

export default EditModal;