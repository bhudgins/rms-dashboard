import * as React from 'react';
import {Line} from "react-chartjs-2";
import {getOpenClosedChartData} from "../getChartDataFunctions/getChartData";
import {OpenClosedChartData, RequestsOpenClosedReport} from "../../util/util";
import ApiClientService from "../../api-client-service";

interface ChartProps {

}

interface ChartState {
    data: any;
}

class RequestsOpenClosedChart extends React.Component<ChartProps,ChartState> {

    private client: ApiClientService;

    constructor(props: ChartProps, state: ChartState) {
        super(props, state);

        this.client = new ApiClientService();

        this.state = {
            data: {}
        };
    }

    componentDidMount() {

        this.client.getRequestsOpenClosedReport()
            .then( (response: RequestsOpenClosedReport[]) => {
               //console.log(response);
               let data: OpenClosedChartData = getOpenClosedChartData(response);
              // console.log(data);

               let datasets = {
                   labels: data.labels,
                   datasets: [
                       {
                           label: 'Open Requests',
                           backgroundColor: "rgba(24, 238, 228, 0)",
                           borderColor: "#1343af",
                           data: data.openRequestsSeries,
                       },
                       {
                           label: 'Closed Requests',
                           backgroundColor: "rgba(17, 170, 162, 0)",
                           borderColor: "#a82d25",
                           data: data.closedRequestsSeries,
                       },
                   ]
               };

               this.setState({data: datasets});

            });
    }

    public render() {
        return (
          <div>
              <Line data={this.state.data} />
          </div>
        );
    }
}

export default RequestsOpenClosedChart;