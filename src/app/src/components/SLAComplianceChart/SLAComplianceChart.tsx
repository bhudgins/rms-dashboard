import * as React from 'react';
import {Line} from "react-chartjs-2";
import {PercentageChartData, PercentageTypeReport} from "../../util/util";
import {getPercentageChartData} from "../getChartDataFunctions/getChartData";
import ApiClientService from "../../api-client-service";

interface ChartProps {

}

interface ChartState {
    data: any;
}

class SLAComplianceChart extends React.Component<ChartProps,ChartState> {

    private client: ApiClientService;

    constructor(props: ChartProps, state: ChartState) {
        super(props, state);

        this.client = new ApiClientService();

        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this.client.getSLACompliancePercentageReport()
            .then((response: PercentageTypeReport[]) =>{
                //console.log(response);
                let data: PercentageChartData = getPercentageChartData(response);
                //console.log(data);

                let datasets = {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'SLA',
                            backgroundColor: "rgba(24, 238, 228, 0)",
                            borderColor: "#dec42b",
                            data: data.percentages,
                        }
                    ]
                };

                this.setState({data: datasets});
            })




    }

    public render() {
        return (
            <div>
                <Line data={this.state.data} options={{
                    legend: {
                        "display": false
                    }
                }}/>
            </div>
        );
    }
}

export default SLAComplianceChart;