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
};

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
            let Switcher = false;
            return chartData.map(item => {
                if(Switcher == false)
                {
                    return ( 
                        <td 
                            colSpan="2" 
                            rowSpan="2" 
                            align="center" 
                            valign="middle" 
                            key={`day${item.day}${item.time === "e" ? "e" : "m"}`}
                            className="chart-wrapper"
                        >
                            <div className="mourning day-full-cell">
                                { `День ${item.day}` }
                            </div>
                            <div className="mourning day-half-cell">Р</div>
                            <div className="evening day-half-cell">В</div>
                            { Switcher = true }
                        </td>
                    )
                }
                else Switcher = false;              
            })
        };

        const FooterTD = data => { 
            return chartOptions.map((day, index) => {
                const dayData = day.filter(item => item.name === data.name)[0];
                return (
                    <td key={ index } align="center" valign="middle" className="bRight bBott">
                        { dayData.value }
                    </td>
                )
            })
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td height="50" align="center" valign="middle" className="bRight bBott">140</td>
                                <td align="center" valign="middle" className="bRight bBott">200</td>
                                <td align="center" valign="middle" className="bRight bBott">41</td>
                                <td colSpan="30" rowSpan="7" align="left" valign="bottom" className="bRight bBott pos-relative">
                                    
                                    <ComposedChart width={740} height={352} data={chartData}>
                                        {/* Pressure */}
                                        <CartesianGrid 
                                            width={740} 
                                            height={352} 
                                            vertical={false} 
                                            horizontalPoints={[ 0, 50, 100, 150, 200, 250 ]} 
                                            // verticalPoints={[ 0, 125, 250, 375, 500, ]}
                                        />
                                        <XAxis dataKey="day" hide={true} />
                                        <YAxis id="press" hide={true} domain={[50, 250]} />
                                        <Bar dataKey="sys" stackId="m" fill="none" />
                                        <Bar dataKey="dia" stackId="m" fill="#1890ff" />
                                        <Line 
                                            type="monotone" 
                                            dataKey="res" 
                                            stroke="#64dd17" 
                                            label={<CustomLabel />} 
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="avg" 
                                            stroke="#c51162" 
                                            label={<CustomLabel />} 
                                        />
                                    </ComposedChart>

                                    <ComposedChart width={740} height={352} data={chartData} className="chart-with-no-bg">
                                        {/* Temperatture */}
                                        <XAxis dataKey="day" hide={true} />
                                        <YAxis id="temp" hide={true} domain={[34, 43]} />
                                        <Line 
                                            type="monotone" 
                                            dataKey="temp" 
                                            stroke="#faad14" 
                                            label={<CustomLabel />} 
                                        />
                                    </ComposedChart>

                                    <ComposedChart width={740} height={352} data={chartData} className="chart-with-no-bg">
                                        {/* Pulse */}
                                        <XAxis dataKey="day" hide={true} />
                                        <YAxis id="pulse" hide={true} domain={[50, 150]} />
                                        <Line 
                                            type="monotone" 
                                            dataKey="pulse" 
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
                            <tr>
                                <td colSpan="3" align="left" className="bRight bBott">Дихання</td>
                                <FooterTD name="Respiration" />
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="bRight bBott">Вага</td>
                                <FooterTD name="Weight" />
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="bRight bBott">Випито рідини</td>
                                <FooterTD name="AquaDrink" />
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="bRight bBott">Добова кількість сечі</td>
                                <FooterTD name="Urine" />
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="bRight bBott">Випорожнення</td>
                                <FooterTD name="Defecation" />
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="bRight bBott">Ванна</td>
                                <FooterTD name="Bath" />
                            </tr>
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