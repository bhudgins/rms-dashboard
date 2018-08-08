import * as React from 'react';
import {Links, Page, TableSchema} from "../EditViewInterfaces";
import ReactTable, {Column} from "react-table";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

interface DataTableProps {
    endpoint: string;
    schema: TableSchema;
    data: any[];
    pagination: Page;
    links: Links;
}

interface DataTableState {
    selected: any;
    data: any,
    firstLoad: boolean
}

class DataTable extends React.Component<DataTableProps, DataTableState> {
    constructor(props: DataTableProps, state: DataTableState) {
        super(props, state);

        this.state = {
            selected: null,
            data: undefined,
            firstLoad: true
        }

    }

    deleteRow=(record: any)=>{
        let temp;
        console.log(this.props.data);
        if(this.state.data !== undefined)
            temp = this.state.data;
        else
            temp = this.props.data;

        let index = temp.indexOf(record);
        temp.splice(index, 1);
        this.setState({data: temp});
    };

    editRow=(origRecord: any, newRecord: any)=>{
        let temp;


        if(this.state.data !== undefined)
            temp = this.state.data;
        else
            temp = this.props.data;

        let index = temp.indexOf(origRecord);

        if(index !== -1)
            temp[index] = newRecord;
        else
            console.log("editRow Failed")

        this.setState({data: temp});
    };

    editRecord = (row: any) => {
        return (
            <div>
            <EditModal schema={this.props.schema} record={row} endpoint={this.props.endpoint} updateParent={this.editRow}/>
            <DeleteModal record={row} updateParent={this.deleteRow}/>
            </div>
        )
    };

    getColumns = () => {
        if (this.props.schema.properties == undefined) return [];

        let columns: Column[] = Object.keys(this.props.schema.properties).sort().map( key => {
            return {
                accessor: key,
                Header: this.props.schema.properties[key].title,
                show: true
            };
        });

        columns.push({
            accessor: '_links.self.href',
            Header: 'id',
            show: false
        });

        columns.push({
            accessor: '_links.self.href',
            Header: 'Actions',
            show: true,
            Cell: row => this.editRecord(row)
        });

        return columns;
    };

    render() {
        if (this.props.schema == undefined)
            return (<div />);

        if(this.state.data === undefined) {
            return (

                <ReactTable data={this.props.data} defaultPageSize={20} showPaginationBottom={true} showPaginationTop={true}
                            columns={this.getColumns()}/>
            )
        }
        else
        {
            //pages={this.props.pagination.totalPages}
            return (
                <ReactTable data={this.state.data} defaultPageSize={20} showPaginationBottom={true} showPaginationTop={true}
                            columns={this.getColumns()}/>
            )
        }
    }


}

export default DataTable;