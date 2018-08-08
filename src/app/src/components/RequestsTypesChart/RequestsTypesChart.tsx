import * as React from 'react';
import {Bar} from 'react-chartjs-2';
import {getRequestTypesChartData} from "../getChartDataFunctions/getChartData";
import {RequestTypeReport, RequestTypesChartData} from "../../util/util";
import ApiClientService from "../../api-client-service";

interface ChartProps {

}

interface ChartState {
    data: any;
}

function backgroundList (labels: string[], color: string){
    let colorList: string[] = [];

    for(let i = 0; i < labels.length; i++){
        colorList.push(color);
    }

    return colorList;
}

class RequestsTypesChart extends React.Component<ChartProps,ChartState> {

    private client: ApiClientService;

    constructor(props: ChartProps, state: ChartState) {
        super(props, state);

        this.client = new ApiClientService();

        this.state = {
            data: {}
        };
    }

    componentDidMount() {

        this.client.getRequestsItems()
            .then( (response: RequestTypeReport[]) => {
                let data: RequestTypesChartData = getRequestTypesChartData(response);

                let datasets = {
                    labels: data.labels,
                    datasets: [
                        {
                            label: "General Inquiry",
                            backgroundColor: backgroundList(data.labels, "#5f0658"),
                            data: data.generalInquiry
                        },
                        {
                            label: "Gen Inq No 1st Call",
                            backgroundColor: backgroundList(data.labels, '#096905'),
                            data: data.genInqNo1stCall
                        },
                        {
                            label: "Settlement Inquiry",
                            backgroundColor: backgroundList(data.labels, '#1a4589'),
                            data: data.settlementInquiry
                        },
                        {
                            label: "Settlement Dispute",
                            backgroundColor: backgroundList(data.labels, '#a82d25'),
                            data: data.settlementDispute
                        },
                        {
                            label: "Project Inquiries",
                            backgroundColor: backgroundList(data.labels, '#bfa925'),
                            data: data.projectInquiries
                        },
                        {
                            label: "Z2 Inquiries and Disputes",
                            backgroundColor: backgroundList(data.labels, '#11aaa2'),
                            data: data.z2InquiriesandDisputes
                        }

                        ]
                };

            this.setState({data: datasets});

            })
    }
    public render() {
        return (
            <div>
                <Bar
                    data={this.state.data} />
            </div>
        );
    }
}

export default RequestsTypesChart;