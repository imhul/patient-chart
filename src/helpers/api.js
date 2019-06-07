// Формируем URL строку с параметрами для отправки на сервер
export const requestBody = data => `RequestData=${JSON.stringify(data)}`;

export const requestURL = 'https://med.uax.co/api/?Method=GetHospitalizationTemperatures';

export const requestHeader = {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
};