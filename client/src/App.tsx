import React, { useState, useEffect } from 'react';
import SensorChart from "./SensorChart";
import StackedLines from "./StackedLines";
import {inflationData} from "./Data3";
import {cpiData} from "./Data4";
import {createMuiTheme, MuiThemeProvider, Theme, withStyles, createStyles, WithStyles} from "@material-ui/core";

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
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: theme.palette.primary.light,
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
    }

    useEffect(() => {
        getInflation();
    }, [stocks, housing, education, healthcare]);

    const stocksSelect = () => {
        setStocks(stocks => !stocks)
        getInflation()
    }

    const housingSelect = () => {
        setHousing(housing => !housing)
        getInflation()
    }

    const educationSelect = () => {
        setEducation(education => !education)
        getInflation()
    }

    const healthcareSelect = () => {
        setHealthcare(healthcare => !healthcare)
        getInflation()
    }

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
        
    };

    return <MuiThemeProvider theme={theme}>
        <div className={props.classes.root}>
            <input
                type="checkbox"
                checked={stocks}
                onChange={stocksSelect}
            />
            Stocks<br />

            <input
                type="checkbox"
                checked={housing}
                onChange={housingSelect}
            />
            Housing

            <input
                type="checkbox"
                checked={education}
                onChange={educationSelect}
            />
            Education and Childcare

            <input
                type="checkbox"
                checked={healthcare}
                onChange={healthcareSelect}
            />
            Healthcare


            <SensorChart data={inflation} data2 = {cpi}/>
            
        </div>
    </MuiThemeProvider>
};

export default withStyles(styles)(App);
