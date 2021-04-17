export interface InflationReading {
    value: number,
    time: string,
}

export const cpiData: InflationReading[] = [{
    "value": 1,
    "time": "2016"
}, {
    "value": 2,
    "time": "2017"
}, {
    "value": 3,
    "time": "2018"
}, {
    "value": 10,
    "time": "2019"
}];