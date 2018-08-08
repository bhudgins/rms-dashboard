import * as React from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {Grid, Header, Segment} from 'semantic-ui-react';
import {getDepartmentChartData} from "../getChartDataFunctions/getChartData";
import {DepartmentChartData, DepartmentRequestTypeReport} from "../../util/util";
import ApiClientService from "../../api-client-service";

interface ChartProps {
    dept: string;
}

interface ChartState {
    atrData: any;
    tasksData: any
}

function backgroundList (labels: string[][], color: string){
    let colorList: string[] = [];
    let newColorArray = ['#86097c','#b60ca9', '#d40ec5'];
    for(let i = 0; i < labels.length; i++){
        colorList.push(color);
        if(i < newColorArray.length)
            color = newColorArray[i];
    }

    return colorList;
}

class DepartmentCharts extends React.Component<ChartProps,ChartState> {
    private client: ApiClientService;

    constructor(props: ChartProps, state: ChartState) {
        super(props, state);

        this.client = new ApiClientService();

        this.state = {
            atrData: {},
            tasksData: {}
        };
    }

    makeDataCall(selectedDepartment: string){
        this.client.getDepartmentReport(selectedDepartment)
            .then( (response: DepartmentRequestTypeReport[]) => {
                let data: DepartmentChartData = getDepartmentChartData(response);

                let ATRDatasets = {

                    labels: data.labels,
                    datasets: [
                        {
                            label: "Average Time To Resolution",
                            backgroundColor:backgroundList(data.labels, '#5f0658'),
                            data: data.atr
                        },


                    ]
                };

                let tasksDatasets = {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Number Of Tasks',
                            backgroundColor: "rgba(24, 238, 228, 0)",
                            borderColor: "#1343af",
                            data: data.numOfTasks,
                        }
                    ]
                };


                this.setState({atrData: ATRDatasets, tasksData:tasksDatasets});

            })
    }

    componentWillReceiveProps(nextProps: ChartProps){
        this.makeDataCall(nextProps.dept);
    }

    componentDidMount() {
        this.makeDataCall(this.props.dept);

    }

    public render() {
        return (
            <Grid.Row stretched={true}>
                <Grid.Column computer={8}>
                    <Segment>
                        <Header as={"h4"}>
                            Number of Tasks Assigned to Department
                        </Header>
                        <div>
                            <Line data={this.state.tasksData} options={{
                                legend: {
                                    "display": false
                                }
                            }}/>

                        </div>
                    </Segment>
                </Grid.Column>
                <Grid.Column computer={8}>
                    <Segment>
                        <Header as={"h4"}>
                            Departmental Average Time to Resolution (ATR)
                        </Header>
                        <div>

                            <Bar
                                data={this.state.atrData} options={{
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
                                        label: function(tooltipItem:any, data:any){
                                            let ms = tooltipItem.yLabel % 1000;
                                            tooltipItem.yLabel = (tooltipItem.yLabel - ms) / 1000;
                                            let secs = tooltipItem.yLabel % 60;
                                            tooltipItem.yLabel = (tooltipItem.yLabel - secs) / 60;
                                            let mins = tooltipItem.yLabel % 60;
                                            let hrs = (tooltipItem.yLabel - mins) / 60;

                                            return hrs + ':' + mins + ':' + secs + '.' + ms;

                                        }
                                    }
                                },
                                legend: {
                                    display: false
                                }

                            }}
                            />
                        </div>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

export default DepartmentCharts;