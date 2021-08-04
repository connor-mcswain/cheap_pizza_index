import React, { useState, useEffect } from 'react';
import SensorChart from "./SensorChart";
import StackedLines from "./StackedLines";
import {inflationData} from "./Data3";
import {cpiData} from "./Data4";
import {m2Data} from "./Data5";
import {blankCPI} from "./Data6";
import {createMuiTheme, MuiThemeProvider, Theme, withStyles, createStyles, WithStyles, TextareaAutosize} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "white",
            main: "#029E74",
            dark: "rgba(0,0,0,0.3)",
        },
        secondary: {
            light: "white",
            main: "#42BE9D",
            dark: "rgba(0,0,0,0.3)",
        },
    },
    spacing: 4,
});

const styles = createStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        //alignItems: "center",
        //justifyContent: "center",
        height: "100vh",
        backgroundColor: theme.palette.primary.light,
        margin: "0 auto",
        //width: "100vw",
        //marginLeft: "500px",
        //marginRight: "500px"

        fontFamily: "Helvetica",
    }
});

interface InflationReading {
    value: number,
    year: string,
}

const App: React.FunctionComponent<WithStyles<typeof styles>> = props => {
    const [checked, setChecked] = useState(true);
    const [stocks, setStocks] = useState(true);
    const [housing, setHousing] = useState(true);
    const [education, setEducation] = useState(true);
    const [healthcare, setHealthcare] = useState(true);
    const [inflation, setInflation] = useState(inflationData);
    const [cpi, setCpi] = useState(cpiData);
    const [m2, setM2] = useState(m2Data);
    
    //const [checkboxes, setCheckBoxes] = useState([{id: 1, value: "cpi", isChecked: true}, {id: 2, value: "m2", isChecked: true}]);

    const getInflation = async () => {
        //const body = "test,test2";
        var categories = [];

        if (stocks == true) {
            categories.push("stocks");
        }
        if (housing == true) {
            categories.push("housing");
        }
        if (education == true) {
            categories.push("education");
        }
        if (healthcare == true) {
            categories.push("healthcare");
        }

        console.log("categories:");
        console.log(categories);

        if (categories.length > 0) {
            const body = categories.toString();

            console.log(body);
            console.log("test");
            const test = await fetch(`http://localhost:5000/inflations/${body}`, {
                method: "GET"
            });

            console.log(test);

            const jsonData: InflationReading[] = await test.json();

            console.log(jsonData);

            setInflation(jsonData);
            
        }
        else {
            console.log("blank");
            setInflation(blankCPI);
        }
    }

    useEffect(() => {
        getInflation();
    }, [stocks, housing, education, healthcare]);

    const stocksSelect = () => {
        setStocks(stocks => !stocks)
        //getInflation()
    }

    const housingSelect = () => {
        setHousing(housing => !housing)
        //getInflation()
    }

    const educationSelect = () => {
        setEducation(education => !education)
        //getInflation()
    }

    const healthcareSelect = () => {
        setHealthcare(healthcare => !healthcare)
        //getInflation()
    }
/*
    const checkboxSelect = () => {
        console.log(inflation)
        setChecked(checked => !checked)
        getInflation()
        if (inflation == inflationData) {
            setInflation(cpiData)
            //setCpi(inflationData)
        }
        else {
            setInflation(inflationData)
            //setCpi(cpiData)
        }
        
    };*/

    return <MuiThemeProvider theme={theme}>
        
        <div className={props.classes.root}>
            <Grid container /*alignItems = "center" justify="center"*/>
                <Grid item xs={6}>
                    Cheap Pizza Index (CPI)

                </Grid>
                <Grid item xs={6}>
            
                    <div>
                    <input
                        type="checkbox"
                        checked={stocks}
                        onChange={stocksSelect}
                    />
                    Stocks (<a href="https://finance.yahoo.com/quote/%5EGSPC/history/">S&P 500</a>)
                    </div>
                    
                    <div>
                    <input
                        type="checkbox"
                        checked={housing}
                        onChange={housingSelect}
                    />
                    Housing (<a href="https://dqydj.com/historical-home-prices/">USA Median SFH Prices</a>)
                    </div>

                    <div>
                    <input
                        type="checkbox"
                        checked={education}
                        onChange={educationSelect}
                    />
                    Education and Childcare (<a href="https://fred.stlouisfed.org/series/CUSR0000SEEB">USA Average Tuition and Childcare Prices</a>)
                    </div>

                    <div>
                    <input
                        type="checkbox"
                        checked={healthcare}
                        onChange={healthcareSelect}
                    />
                    Healthcare (<a href="https://www.kff.org/report-section/ehbs-2020-section-1-cost-of-health-insurance/">USA Average Premiums for Family Coverage</a>)
                    </div>

                    <span>{<br/>}</span>

                    <div style={{"height" : "550px", "width" : "600px"}}>
                    
                        <SensorChart data={inflation} data2 = {cpi} data3 = {m2}/>
                    </div>

                </Grid>

            </Grid>
        </div>
    </MuiThemeProvider>
};

export default withStyles(styles)(App);
