import React, {useCallback, useEffect, useState} from "react";
import {PointTooltipProps, ResponsiveLine, Serie} from "@nivo/line";
import {
    Theme,
    withStyles,
    createStyles,
    WithStyles,
    useTheme
} from "@material-ui/core";
import {ScaleLinearSpec, ScaleTimeSpec} from '@nivo/scales'
import {AxisProps} from '@nivo/axes'

const styles = (theme: Theme) => createStyles({
    chartRoot: {
        padding: theme.spacing(6),
        borderRadius: theme.spacing(2),
        backgroundColor: "white",
        display: "flex",
        minWidth: 0,
        height: "100%",
        width: "100%",
        border: "1px solid rgba(0,0,0,0.15)",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
            border: "1px solid " + theme.palette.primary.main,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
        }
    },
    toolTip: {
        backgroundColor: "white",
        borderRadius: theme.spacing(2),
        padding: theme.spacing(2),
        fontFamily: "Helvetica",
        fontSize: 13,
        fontWeight: "bold",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
        marginBottom: theme.spacing(2),

    }
});


interface InflationReading {
    value: number,
    year: string,
}

interface PlotProps extends WithStyles<typeof styles> {
    data: InflationReading[],
    data2: InflationReading[],
    data3: InflationReading[]
}

const InflationChart: React.FunctionComponent<PlotProps> = props => {

    const {classes} = props;
    const theme = useTheme();
    const [hover, setHover] = useState<boolean>(false);
    const [series, setSeries] = useState<Serie[]>([]);

    const light = theme.palette.primary.main;
    const dark = theme.palette.primary.dark;

    const chartTheme = useCallback(() => {

        return {
            grid: {
                line: {
                    stroke: "rgba(0,0,0,0.05)",
                }
            },
            axis: {
                legend: {
                    text: {
                        fill: hover ? light : dark,
                        fontSize: 15,
                    }
                },
                ticks: {
                    text: {
                        fill: "rgba(0,0,0,0.3)",
                        fontSize: 13,
                    },
                    line: {
                        stroke: "rgba(0,0,0,0.3)",
                        strokeWidth: 1,
                    }
                },
                domain: {
                    line: {
                        stroke: "rgba(0,0,0,0.1)",
                        strokeWidth: 1,
                    },
                },
            },
            legends: {
                text: {
                    fontSize: 14
                }
            },
            crosshair: {
                line: {
                    stroke: 'rgba(0,0,0,0.5)',
                    strokeWidth: 1,
                    strokeOpacity: 0.35,
                },
            }
        }
    }, [hover]);

    useEffect(() => {

        setSeries([
            {
                id: "CPI",
                data: props.data2
                    .sort((r1, r2) => parseInt(r1.year) - parseInt(r2.year))
                    .map(reading => {
                        return {
                            x: (parseInt(reading.year) + 1).toString(),
                            y: reading.value,
                        }
                    }),
                
            },
            {
                id: "Market Basket",
                data: props.data
                    .sort((r1, r2) => parseInt(r1.year) - parseInt(r2.year))
                    .map(reading => {
                        return {
                            x: (parseInt(reading.year) + 1).toString(),
                            y: reading.value,
                        }
                    }),
                
            },
            {
                id: "M2 Money Supply",
                data: props.data3
                    .sort((r1, r2) => parseInt(r1.year) - parseInt(r2.year))
                    .map(reading => {
                        return {
                            x: (parseInt(reading.year) + 1).toString(),
                            y: reading.value,
                        }
                    }),
                
            }
        ]);
    }, [props.data, props.data2, props.data3]);

    const yScale: ScaleLinearSpec = {
        type: "linear",
        min: -10,
        max: 500
    }

    const xScale: ScaleTimeSpec = {
        type: "time",
        format: "%Y"
    };

    let margin = {
        top: 10,
        right: 20,
        bottom: 30,
        left: 56
    };

    const axisBottom: AxisProps = {
        format: "%Y",
        tickValues: 8

    };

    const axisLeft: AxisProps = {
        legend: "Percentage Increase Since 1996",
        legendOffset: -50,
        legendPosition: "middle",
        tickSize: 0,
        tickValues: 6,
        tickPadding: 4,
    };

    const toolTipElement = (props: PointTooltipProps) => {
        return <div className={classes.toolTip} style={{ color: props.point.color, border: "2px solid " + props.point.color}}>
            {props.point.data.y}%
        </div>
    };

    return <div className={classes.chartRoot}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
        
        <ResponsiveLine
            curve={"monotoneX"}
            data={series}
            theme={chartTheme()}
            colors={{ scheme: 'dark2'}}
            enableGridY={hover}
            enableGridX={hover}
            margin={margin}
            yScale={yScale}
            xScale={xScale}
            axisBottom={axisBottom}
            axisLeft={axisLeft}
            lineWidth={1}
            pointSize={0}
            useMesh={true}
            crosshairType="cross"
            tooltip={toolTipElement}
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    justify: false,
                    translateX: 0,
                    translateY: 0,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemsSpacing: 4,
                    symbolSize: 20,
                    symbolShape: 'circle',
                    itemDirection: 'left-to-right',
                    itemTextColor: '#777',
                }
            ]}
        />
    </div>
};


export default withStyles(styles)(InflationChart);