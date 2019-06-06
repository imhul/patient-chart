// Hospitalization Form Loader
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import ReactToPdf from "react-to-pdf";
import { Table, Button, Icon, } from 'antd';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

// Helpers
import {
    requestBody,
    requestURL,
    requestHeader,
} from '../../helpers';

const ref = React.createRef();
const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];
const options = {
    orientation: 'landscape',
};

class PatientChart extends Component {

    loadAllData() {

        // Формируем список параметров для передачи на сервер
        const data = {
            'Hospital': document.getElementById("Hospital").value,
            'Patient': document.getElementById("Patient").value,
            'Hospitalization': document.getElementById("Hospitalization").value,
            'Reception': document.getElementById("Reception").value,
            'Department': document.getElementById("Department").value,
        };

        // Отправляем данные на сервер
        fetch(requestURL, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: requestBody(data)
        })
            .then((response) => response.json())
            .then((data) => {
                this.props.uiActions.loadData(data);
            })
            .catch((error) => {
                console.warn('main fetch error: ', error)
            })
    };

    // componentDidMount() {
    //     this.loadAllData();  // First data loading
    // };

    render() {
        // Props to constants
        // const { } = this.props.ui;
        // const { uiActions } = this.props;

        return (
            <div className="PatientChart">
                <div className="flex-container" ref={ref}>
                    <table cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr>
                                <td colSpan="3" align="center" valign="middle" className="bRight bBott bTop">День перебування в стаціонарі</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d1%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d2%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d3%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d4%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d5%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d6%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d7%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d8%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d9%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d10%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d11%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d12%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d13%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d14%</td>
                                <td colSpan="2" align="center" valign="middle" className="bRight bBott bTop">%d15%</td>
                            </tr>
                            <tr>
                                <td width="70" align="center" valign="middle" className="bRight bBott">Пульс</td>
                                <td width="70" align="center" valign="middle" className="bRight bBott">АТ</td>
                                <td width="70" align="center" valign="middle" className="bRight bBott">Т<sup>o</sup></td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                                <td align="center" valign="middle" className="bRight bBott">Р</td>
                                <td align="center" valign="middle" className="bRight bBott">В</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td height="50" align="center" valign="middle" className="bRight bBott">140</td>
                                <td align="center" valign="middle" className="bRight bBott">200</td>
                                <td align="center" valign="middle" className="bRight bBott">41</td>
                                <td colSpan="30" rowSpan="7" align="left" valign="bottom" className="bRight bBott">
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={data}
                                        margin={{
                                            top: 20, right: 30, left: 20, bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="pv" stackId="a" fill="none" />
                                        <Bar dataKey="uv" stackId="a" fill="#1890ff" />
                                    </BarChart>
                                </td>
                            </tr>
                            <tr>
                                <td height="50" align="center" valign="middle" className="bRight bBott">120</td>
                                <td align="center" valign="middle" className="bRight bBott">175</td>
                                <td align="center" valign="middle" className="bRight bBott">40</td>
                            </tr>
                            <tr>
                                <td height="50" align="center" valign="middle" className="bRight bBott">100</td>
                                <td align="center" valign="middle" className="bRight bBott">150</td>
                                <td align="center" valign="middle" className="bRight bBott">39</td>
                            </tr>
                            <tr>
                                <td height="50" align="center" valign="middle" className="bRight bBott">90</td>
                                <td align="center" valign="middle" className="bRight bBott">125</td>
                                <td align="center" valign="middle" className="bRight bBott">38</td>
                            </tr>
                            <tr>
                                <td height="50" align="center" valign="middle" className="bRight bBott">80</td>
                                <td align="center" valign="middle" className="bRight bBott">100</td>
                                <td align="center" valign="middle" className="bRight bBott">37</td>
                            </tr>
                            <tr>
                                <td height="50" align="center" valign="middle" className="bRight bBott">70</td>
                                <td align="center" valign="middle" className="bRight bBott">75</td>
                                <td align="center" valign="middle" className="bRight bBott">36</td>
                            </tr>
                            <tr>
                                <td height="50" align="center" valign="middle" className="bRight bBott">60</td>
                                <td align="center" valign="middle" className="bRight bBott">50</td>
                                <td align="center" valign="middle" className="bRight bBott">35</td>
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="bRight bBott">Дихання</td>
                                <td colSpan="30" rowSpan="6" align="left" valign="top" className="bRight bBott">%TemperatureData%</td>
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="bRight bBott">Вага</td>
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="bRight bBott">Випито  рідини</td>
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="bRight bBott">Добова  кількість сечі</td>
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="bRight bBott">Випорожнення</td>
                            </tr>
                            <tr>
                            <td colSpan="3" align="left" className="bRight bBott">Ванна</td>
                        </tr>
                        </tbody>
                    </table>

                    <ReactToPdf targetRef={ref} filename="patient-chart.pdf" options={options}>
                        {({ toPdf }) => (
                            <Button type="primary" className="to-pdf" onClick={toPdf}>PDF</Button>
                        )}
                    </ReactToPdf>
                </div>
            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return {
        uiActions: bindActionCreators(UI_ACTIONS, dispatch),
    }
};

function mapStateToProps(state) {
    return {
        ui: state.ui,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientChart);