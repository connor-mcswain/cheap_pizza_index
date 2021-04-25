export interface InflationReading {
    value: number,
    year: string,
}

export const cpiData: InflationReading[] = [{
    "value": 1,
    "year": "2016"
}, {
    "value": 2,
    "year": "2017"
}, {
    "value": 6.1,
    "year": "2018"
}, {
    "value": 0.1,
    "year": "2019"
}];