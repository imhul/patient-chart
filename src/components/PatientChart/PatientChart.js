// Hospitalization Form Loader
import React, { Component, PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import ReactToPdf from "react-to-pdf";
import { Button, Icon, message, } from 'antd';
import { Bar, Line, XAxis, YAxis, CartesianGrid, ComposedChart,
} from 'recharts';

// Helpers
import {
    requestBody,
    requestURL,
    requestHeader,
} from '../../helpers';

const ref = React.createRef();
const successLoadText = "Дані успішно завантажені!";
const successPDFDownloading = "PDF успішно завантажений!";
const errorPDFDownloading = "Помилка завантаження PDF!";
const errorLoadText = "Помилка з'єднання! Дані не завантажені!";
const PDFOptions = {
    orientation: 'landscape',
};

class CustomLabel extends PureComponent {
    render() {
      const { x, y, stroke, value, } = this.props;
      return <text x={x} y={y} dy={-4} fill={stroke} className="chart-value">{value}</text>;
    }
  }

class PatientChart extends Component {

    loadAllData() {
        const data = {
            'Hospital': document.getElementById("Hospital").value,
            'Patient': document.getElementById("Patient").value,
            'Hospitalization': document.getElementById("Hospitalization").value,
            'Reception': document.getElementById("Reception").value,
            'Department': document.getElementById("Department").value,
        };

        fetch(requestURL, {
            method: 'post',
            headers: requestHeader,
            body: requestBody(data)
        })
        .then(response => {
            if(response.ok && (response.status === 200)) {
                message.success(successLoadText);
                return response.json()
            } else {
                message.error(errorLoadText);
                this.props.uiActions.loadError()
            }
        })
        .then(data => this.props.uiActions.loadData(data))
        .catch(error => message.error(error))
    };

    componentDidMount() {
        this.loadAllData();  // First data loading
    };

    completePDF = () => {
        this.props.uiActions.toPDF;
        message.success(successPDFDownloading, 3)
    };

    render() {
        // Props to constants
        const { chartData, patientOptions, chartOptions } = this.props.ui;
        const { uiActions } = this.props;

        const DayTD = () => {
            return chartData.map(item => (
                <td 
                    colSpan="2" 
                    align="center" 
                    valign="middle" 
                    key={`day${item.day}`}
                    className="bRight bBott bTop"
                >
                    { `День ${item.day}` }
                </td>
            ))
        };

        const EveningMourningTD = () => {
            return chartData.map(item => (
                <td align="center" valign="middle" className="bRight bBott" key={`${item.day}M`}>
                    { item.day%2 === 0 ? "В" : "Р" }
                </td>
            ))
        };

        return (
            <div className="PatientChart">
                <div className="flex-container" ref={ref}>
                    <table cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr>
                                <td colSpan="3" align="center" valign="middle" className="bRight bBott bTop">День перебування в стаціонарі</td>
                                <DayTD />
                            </tr>
                            <tr>
                                <td width="70" align="center" valign="middle" className="bRight bBott">Пульс</td>
                                <td width="70" align="center" valign="middle" className="bRight bBott">АТ</td>
                                <td width="70" align="center" valign="middle" className="bRight bBott">Т<sup>o</sup></td>
                                <EveningMourningTD />
                                <EveningMourningTD />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td height="50" align="center" valign="middle" className="bRight bBott">140</td>
                                <td align="center" valign="middle" className="bRight bBott">200</td>
                                <td align="center" valign="middle" className="bRight bBott">41</td>
                                <td colSpan="30" rowSpan="7" align="left" valign="bottom" className="bRight bBott pos-relative">
                                    
                                    <ComposedChart width={740} height={352} data={chartData}
                                    >
                                        {/* Pressure */}
                                        <XAxis dataKey="day" hide={true} />
                                        <YAxis id="press" hide={true} domain={[50, 240]} />
                                        <Bar dataKey="sysM" stackId="m" fill="none" />
                                        <Bar dataKey="diaM" stackId="m" fill="#1890ff" />
                                        <Bar dataKey="sysE" stackId="e" fill="none" />
                                        <Bar dataKey="diaE" stackId="e" fill="#f5222d" />
                                        <Line 
                                            id="resM" 
                                            type="monotone" 
                                            dataKey="resM" 
                                            stroke="#64dd17" 
                                            label={<CustomLabel />} 
                                        />
                                        <Line 
                                            id="resE"
                                            type="monotone" 
                                            dataKey="resE" 
                                            stroke="#33691e" 
                                            label={<CustomLabel />} 
                                        />
                                        <Line 
                                            id="avgM" 
                                            type="monotone" 
                                            dataKey="avgM" 
                                            stroke="#c51162" 
                                            label={<CustomLabel />} 
                                        />
                                        <Line 
                                            id="avgE" 
                                            type="monotone" 
                                            dataKey="avgE" 
                                            stroke="#aa00ff" 
                                            label={<CustomLabel />} 
                                        />
                                    </ComposedChart>

                                    <ComposedChart width={740} height={352} data={chartData} className="chart-with-no-bg">
                                        {/* Temperatture */}
                                        <CartesianGrid width={740} height={352} />
                                        <XAxis dataKey="day" hide={true} />
                                        <YAxis id="temp" hide={true} domain={[34, 43]} />
                                        <Line 
                                            id="tempM" 
                                            type="monotone" 
                                            dataKey="tempM" 
                                            stroke="#faad14" 
                                            label={<CustomLabel />} 
                                        />
                                        <Line 
                                            id="tempE" 
                                            type="monotone" 
                                            dataKey="tempE" 
                                            stroke="#f5222d"
                                            label={<CustomLabel />} 
                                        />
                                    </ComposedChart>

                                    <ComposedChart width={740} height={352} data={chartData} className="chart-with-no-bg">
                                        {/* Pulse */}
                                        <XAxis dataKey="day" hide={true} />
                                        <YAxis id="pulse" hide={true} domain={[50, 150]} />
                                        <Line 
                                            id="pulseE" 
                                            type="monotone" 
                                            dataKey="pulseE" 
                                            stroke="#aa00ff" 
                                            label={<CustomLabel />} 
                                        />
                                        <Line 
                                            id="pulseM" 
                                            type="monotone" 
                                            dataKey="pulseM" 
                                            stroke="#aa00ff" 
                                            label={<CustomLabel />} 
                                        />
                                    </ComposedChart>
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
                            
                            { 
                                chartOptions.map((day, index) => {
                                    console.info("day: ", day);

                                    return (
                                        <tr key={ index }>
                                            <td colSpan="3" align="left" className="bRight bBott">{ day[index].title }</td>
                                            {
                                                day.map((option, index) => {
                                                    return (
                                                        <td align="left" valign="top" key={ index } className="bRight bBott">
                                                            { option.value }
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>

                    <ReactToPdf 
                        targetRef={ref} 
                        filename="patient-chart.pdf" 
                        options={PDFOptions} 
                        onComplete={() => this.completePDF }
                    >
                        {({ toPdf }) => (
                            <Button type="primary" className="to-pdf" onClick={ toPdf }>PDF</Button>
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