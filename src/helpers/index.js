import React, { PureComponent } from 'react';
import { requestBody, requestURL, requestHeader, } from './api';

class CustomLabel extends PureComponent {
    render() {
        const {
            x, y, stroke, value,
        } = this.props;
    
        return <text x={x} y={y} fill={stroke} dy={4} fontSize={10} textAnchor="middle">{value}</text>;
    }
};

class CustomBarSYSLabel extends PureComponent {
    render() {
        const {
            x, y, stroke, value, type,
        } = this.props;
        return (
            <text 
                x={ x } 
                y={ y } 
                fill="#ffffff" 
                stroke={ stroke }
                dy={ -15 }  
                dx={ 5 } 
                fontSize={ 14 }
                textAnchor="top"
            >
                { value }
            </text>
        )
    }
};

class CustomBarDIALabel extends PureComponent {
    render() {
        const {
            x, y, stroke, value, type,
        } = this.props;
        return ( <text 
                x={ x } 
                y={ y } 
                fill="#fff" 
                dy={ 15 }  
                dx={ 5 } 
                fontSize={ 14 }
                textAnchor="bottom"
            >
                { value }
            </text>
        )
    }
};

export {
    requestBody, 
    requestURL, 
    requestHeader,
    CustomLabel,
    CustomBarDIALabel,
    CustomBarSYSLabel,
};
