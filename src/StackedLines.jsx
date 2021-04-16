// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine, Line } from '@nivo/line'
import data from './timescale_data.json'
import * as React from "react"
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = () => (
    <ResponsiveLine
    //data = {data}
    data={[
        {
            id: 'fake corp. A',
            data: [
                { x: '2018-01-01', y: 7 },
                { x: '2018-01-02', y: 5 },
                { x: '2018-01-03', y: 11 },
                { x: '2018-01-04', y: 9 },
                { x: '2018-01-05', y: 12 },
                { x: '2018-01-06', y: 16 },
                { x: '2018-01-07', y: 13 },
                { x: '2018-01-08', y: 13 },
            ],
        },
        {
            id: 'fake corp. B',
            data: [
                { x: '2018-01-04', y: 14 },
                { x: '2018-01-05', y: 14 },
                { x: '2018-01-06', y: 15 },
                { x: '2018-01-07', y: 11 },
                { x: '2018-01-08', y: 10 },
                { x: '2018-01-09', y: 12 },
                { x: '2018-01-10', y: 9 },
                { x: '2018-01-11', y: 7 },
            ],
        },
    ]}
    xScale={{
        type: 'time',
        format: '%Y-%m-%d',
        useUTC: false,
        precision: 'day',
    }}
    xFormat="time:%Y-%m-%d"
    yScale={{
        type: 'linear',
        stacked: false,
    }}
    axisLeft={{
        legend: 'linear scale',
        legendOffset: 12,
    }}
    axisBottom={{
        format: '%b %d',
        tickValues: 'every 2 days',
        legend: 'time scale',
        legendOffset: -12,
    }}
    enablePointLabel={true}
    pointSize={16}
    pointBorderWidth={1}
    pointBorderColor={{
        from: 'color',
        modifiers: [['darker', 0.3]],
    }}
    useMesh={true}
    enableSlices={false}
    />
);

export default MyResponsiveLine