import * as React from "react";
import {Button, Icon, Modal} from "semantic-ui-react";
import {RowInfo} from "react-table";
import ApiClientService from "../../../api-client-service";

const inlineStyle = {
    modal : {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

interface ModalProps {
    record: RowInfo,
    updateParent: any
}

interface ModalState {
    show: boolean
}


class DeleteModal extends React.Component<ModalProps, ModalState> {

    private client: ApiClientService;

    constructor(props: ModalProps, state: ModalState) {
        super(props, state);

        this.client = new ApiClientService();

        this.state = {
            show: false
        }
    }

    closeModal=()=> {
        this.setState({show: false});
    };

    handleRemove=(evt:any)=>{
        evt.preventDefault();
       this.client.deleteTableData(this.props.record["value"]).then(()=>{
            this.closeModal();
            this.props.updateParent(this.props.record['original']);
        });

    };

    handleCancel=(evt:any)=>{
        evt.preventDefault();
        this.closeModal();
    };

    openHandler=()=>{
        this.setState({ show: true })
    };

    render() {
        const showModal = this.state.show;
        return (
            <Modal style={inlineStyle.modal} closeIcon={true} onClose={this.closeModal} open={showModal}
                   trigger={<Button negative={true} onClick={this.openHandler}>Delete</Button>}>
                <Modal.Header>Delete</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Are you sure you want to delete?
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic={true} color='red'  onClick={this.handleCancel}>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='green' onClick={this.handleRemove}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default DeleteModal;