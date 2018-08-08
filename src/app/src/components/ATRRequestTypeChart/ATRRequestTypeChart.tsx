import * as React from 'react';
import {Line} from 'react-chartjs-2';
import {getATRChartData} from "../getChartDataFunctions/getChartData";
import {ATRChartData, RequestTypeReport} from "../../util/util";
import ApiClientService from "../../api-client-service";


interface ChartProps {

}

interface ChartState {
    data: any;
}



class ATRRequestTypeChart extends React.Component<ChartProps,ChartState> {
    private client: ApiClientService;

    constructor(props: ChartProps, state: ChartState) {
        super(props, state);
        this.client = new ApiClientService();
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this.client.getATRReport()
            .then( (response: RequestTypeReport[]) => {
                let data: ATRChartData = getATRChartData(response);

                let datasets = {

                    labels: data.labels,
                    datasets: [
                        {
                            label: "General Inquiry (5 Day)",
                            backgroundColor:'rgba(95, 6, 88, 0)',
                            borderColor:"#5f0658",
                            data: data.generalInquiry5Day
                        },
                        {
                            label: "General Inquiry (No SLA)",
                            backgroundColor: 'rgba(9, 105, 5, 0)',
                            borderColor:'#096905',
                            data: data.generalInquiryNoSla
                        },
                        {
                            label: "Settlement Inquiry (5 Day)",
                            backgroundColor: 'rgba(26, 69, 137, 0)',
                            borderColor:'#1a4589',
                            data: data.settlementInquiry5Day
                        },
                        {
                            label: "Settlement Inquiry (10 Day)",
                            backgroundColor: 'rgba(168, 45, 37, 0)',
                            borderColor:'#a82d25',
                            data: data.settlementInquiry10Day
                        },
                        {
                            label: "Project Inquiries",
                            backgroundColor: 'rgba(191, 169, 37, 0)',
                            borderColor:'#bfa925',
                            data: data.projectInquiries
                        },
                        {
                            label: "RTO Compliance",
                            backgroundColor: 'rgba(17, 170, 162, 0)',
                            borderColor:'#11aaa2',
                            data: data.rtoCompliance
                        }

                    ]
                };


                this.setState({data: datasets});

            })
    }

    public render() {
        return (
            <div>
                <Line
                    data={this.state.data} options={{
                        scales:{
                            yAxes:[{
                                ticks: {
                                    callback: function(value, index, values){

                                        let ms = value % 1000;
                                        value = (value - ms) / 1000;
                                        let secs = value % 60;
                                        value = (value - secs) / 60;
                                        let mins = value % 60;
                                        let hrs = (value - mins) / 60;

                                        return hrs + ':' + mins + ':' + secs + '.' + ms;
                                    }
                                }
                            }]
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem:any,data:any){
                                        let ms = tooltipItem.yLabel % 1000;
                                        tooltipItem.yLabel = (tooltipItem.yLabel - ms) / 1000;
                                        let secs = tooltipItem.yLabel % 60;
                                             tooltipItem.yLabel = (tooltipItem.yLabel - secs) / 60;
                                        let mins = tooltipItem.yLabel % 60;
                                        let hrs = (tooltipItem.yLabel - mins) / 60;

                                        return hrs + ':' + mins + ':' + secs + '.' + ms;

                                    }
                                }
                            }

                    }}
                />
            </div>
        );
    }
}

export default ATRRequestTypeChart;