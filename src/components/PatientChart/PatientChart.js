import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UI_ACTIONS from '../../redux/ui_actions';
import ReactToPdf from "react-to-pdf";
import { Button, message, } from 'antd';
import {
    Bar, Line, XAxis, YAxis, CartesianGrid, ComposedChart, Legend,
} from 'recharts';

// Helpers
import {
    requestBody,
    requestURL,
    requestHeader,
    CustomLabel,
    CustomBarDIALabel,
    CustomBarSYSLabel,
} from '../../helpers';

const reff = React.createRef();
const successLoadText = "Дані успішно завантажені!";
const successPDFDownloading = "PDF успішно завантажений!";
const errorPDFDownloading = "Помилка завантаження PDF!";
const errorLoadText = "Помилка з'єднання! Дані не завантажені!";
const PDFOptions = {
    unit: 'px',
    format: [935, 1015],
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
                if (response.ok && (response.status === 200)) {
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
        this.loadAllData();
    };

    completePDF = () => {
        this.props.uiActions.toPDF;
        message.success(successPDFDownloading, 3)
        .then(() => this.props.uiActions.resetPDF)
    };

    render() {
        const { chartData, patientOptions, chartOptions, } = this.props.ui;
        const DayTD = () => {
            let Switcher = false;
            return chartData.map(item => {
                if (Switcher == false) {
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
                                {`День ${item.day}`}
                            </div>
                            <div className="mourning day-half-cell">Р</div>
                            <div className="evening day-half-cell">В</div>
                            {Switcher = true}
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
                    <td key={index} align="center" valign="middle">
                        {dayData.value}
                    </td>
                )
            })
        };

        return (
            <div className="PatientChart">
                <div className="flex-container" style={{ width: 1000 }} ref={ reff }>

                    <header>
                        <div className="bordered display-flex">
                            <div className="left-block bordered">
                                <div className="bordered">
                                    Міністерство охорони здоров’я України
                                </div>
                                <div className="bordered">
                                    <p>КУ «Обласна клінічна лікарня ім. О.Ф. Гербачевського»</p>
                                    <p>вул. Червоного Хреста, 3, Житомир, Житомирська область, 10002</p>              
                                </div>
                            </div>
                            <div className="right-block bordered">
                                <p>МЕДИЧНА ДОКУМЕНТАЦІЯ</p>
                                <h2><b>ФОРМА № 004/0</b></h2>
                                <p>Затверджена наказом МОЗ України 26.07.99 р. № 184</p>
                            </div>
                        </div>
                        <div className="bottom-block">
                            <h1>ЛИСТОК ЛІКАРСЬКИХ ПРИЗНАЧЕНЬ</h1>
                            <p>
                                <span className="stat">Карта: №</span>
                                <span>{ patientOptions.hospitalization }</span>
                            </p>
                            <p>
                                <span className="stat">Прізвище, ім’я, по батькові хворого: </span>
                                <span>{ patientOptions.name }</span>
                            </p>
                            <p>
                                <span className="stat">Палата: №</span>
                                <span>{ patientOptions.room }</span>
                            </p>
                            <p>
                                <span className="stat">Дата: </span>
                                { patientOptions.date }
                            </p>
                            <p>
                                <span className="stat">День хвороби: </span>
                                { patientOptions.day }
                            </p>
                        </div>
                    </header>

                    <table cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr>
                                <td colSpan="3" align="center" valign="middle" style={{padding: '4px 0'}}>
                                    День перебування в стаціонарі
                                </td>
                                <DayTD />
                            </tr>
                            <tr>
                                <td width="70" align="center" valign="middle" style={{padding: '4px 0'}}>Пульс</td>
                                <td width="70" align="center" valign="middle" style={{padding: '4px 0'}}>АТ</td>
                                <td width="70" align="center" valign="middle" style={{padding: '4px 0'}}>Т<sup>o</sup></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td height="50" align="center" valign="middle">140</td>
                                <td align="center" valign="middle">200</td>
                                <td align="center" valign="middle">41</td>
                                <td colSpan="30" rowSpan="7" align="left" valign="bottom" className="pos-relative">

                                    <ComposedChart width={740} height={352} data={chartData}>
                                        <CartesianGrid
                                            width={740}
                                            height={352}
                                            vertical={false}
                                            horizontalPoints={[0, 50, 100, 150, 200, 250]}
                                        />
                                        <XAxis dataKey="day" hide={true} />
                                        <YAxis hide={true} domain={[50, 250]} />
                                        <Bar 
                                            dataKey="sys" 
                                            id="sys" 
                                            stackId="m" 
                                            fill="none" 
                                            label={<CustomBarSYSLabel />}
                                        />
                                        <Bar 
                                            dataKey="dia" 
                                            id="dia" 
                                            stackId="m" 
                                            fill="#1890ff" 
                                            label={<CustomBarDIALabel />}
                                        />
                                        <Legend 
                                            align="center" 
                                            iconSize={20} 
                                            payload={[
                                                { 
                                                    value: '', 
                                                    type: 'cross', 
                                                    id: 'sys', 
                                                    color: "rgba(0,0,0,0)" 
                                                },
                                                {
                                                    value: 'Артеріальний тиск', 
                                                    type: 'cross', 
                                                    id: 'dia', 
                                                    color: "#1890ff" 
                                                },
                                                {
                                                    value: 'Частота дихання', 
                                                    type: 'cross', 
                                                    id: 'temp', 
                                                    color: "#64dd17" 
                                                },
                                                {
                                                    value: 'Пульсовий тиск', 
                                                    type: 'cross', 
                                                    id: 'temp', 
                                                    color: "#c51162" 
                                                },
                                            ]}  
                                        />
                                        <Line
                                            id="res"
                                            type="monotone"
                                            dataKey="res"
                                            stroke="#64dd17"
                                            label={<CustomLabel />}
                                            dot={{ r: 10 }}
                                        />
                                        <Line
                                            id="avg"
                                            type="monotone"
                                            dataKey="avg"
                                            stroke="#c51162"
                                            label={<CustomLabel />}
                                            dot={{ r: 10 }}

                                        />
                                    </ComposedChart>

                                    <ComposedChart width={740} height={352} data={chartData} className="chart-with-no-bg">
                                        <XAxis dataKey="day" hide={true} />
                                        <YAxis hide={true} domain={[34, 43]} />
                 
                                        <Legend 
                                            align="left" 
                                            iconSize={20}  
                                            payload={[{ value: 'Температура', type: 'cross', id: 'temp', color: "#ff6f00" }]}    
                                        />
                                        <Line
                                            id="temp"
                                            type="monotone"
                                            dataKey="temp"
                                            stroke="#ff6f00"
                                            label={<CustomLabel />}
                                            dot={{ r: 10 }}
                                        />
                                    </ComposedChart>

                                    <ComposedChart width={740} height={352} data={chartData} className="chart-with-no-bg">
                                        <XAxis dataKey="day" hide={true} />
                                        <YAxis hide={true} domain={[50, 150]} />
                               
                                        <Legend 
                                            align="right" 
                                            iconSize={20} 
                                            payload={[{ value: 'Пульс', type: 'cross', id: 'temp', color: "#aa00ff" }]} 
                                        />
                                        <Line
                                            id="pulse"
                                            type="monotone"
                                            dataKey="pulse"
                                            stroke="#aa00ff"
                                            label={<CustomLabel />}
                                            dot={{ r: 10 }}
                                        />
                                    </ComposedChart>
                                </td>
                            </tr>
                            <tr>
                                <td height="50" align="center" valign="middle">120</td>
                                <td align="center" valign="middle">175</td>
                                <td align="center" valign="middle">40</td>
                            </tr>
                            <tr>
                                <td height="50" align="center" valign="middle">100</td>
                                <td align="center" valign="middle">150</td>
                                <td align="center" valign="middle">39</td>
                            </tr>
                            <tr>
                                <td height="50" align="center" valign="middle">90</td>
                                <td align="center" valign="middle">125</td>
                                <td align="center" valign="middle">38</td>
                            </tr>
                            <tr>
                                <td height="50" align="center" valign="middle">80</td>
                                <td align="center" valign="middle">100</td>
                                <td align="center" valign="middle">37</td>
                            </tr>
                            <tr>
                                <td height="50" align="center" valign="middle">70</td>
                                <td align="center" valign="middle">75</td>
                                <td align="center" valign="middle">36</td>
                            </tr>
                            <tr>
                                <td height="50" align="center" valign="middle">60</td>
                                <td align="center" valign="middle">50</td>
                                <td align="center" valign="middle">35</td>
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="padding-left">Частота дихання</td>
                                <FooterTD name="Respiration" />
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="padding-left">Вага</td>
                                <FooterTD name="Weight" />
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="padding-left">Випито рідини</td>
                                <FooterTD name="AquaDrink" />
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="padding-left">Добова кількість сечі</td>
                                <FooterTD name="Urine" />
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="padding-left">Випорожнення</td>
                                <FooterTD name="Defecation" />
                            </tr>
                            <tr>
                                <td colSpan="3" align="left" className="padding-left">Ванна</td>
                                <FooterTD name="Bath" />
                            </tr>
                        </tbody>
                    </table>

                    <ReactToPdf
                        targetRef={ reff }
                        filename="patient-chart.pdf"
                        options={ PDFOptions }
                        onComplete={() => this.completePDF()}
                    >
                        {({ toPdf }) => (
                            <Button 
                                icon="file-pdf" 
                                type="primary" 
                                className="to-pdf" 
                                onClick={toPdf}
                            >
                                PDF
                            </Button>
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