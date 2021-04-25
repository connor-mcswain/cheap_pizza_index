import React, { useState } from 'react';
import SensorChart from "./SensorChart";
import StackedLines from "./StackedLines";
import {temperatureData} from "./Data";
import {temperatureData2} from "./Data2";
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

const App: React.FunctionComponent<WithStyles<typeof styles>> = props => {
    const [checked, setChecked] = useState(false);
    const [inflation, setInflation] = useState(inflationData);
    const [cpi, setCpi] = useState(cpiData);
    
    //const [checkboxes, setCheckBoxes] = useState([{id: 1, value: "cpi", isChecked: true}, {id: 2, value: "m2", isChecked: true}]);

    const checkboxSelect = () => {
        console.log(inflation)
        setChecked(checked => !checked)
        if (inflation == inflationData) {
            setInflation(cpiData)
            setCpi(inflationData)
        }
        else {
            setInflation(inflationData)
            setCpi(cpiData)
        }
        
    };

    return <MuiThemeProvider theme={theme}>
        <div className={props.classes.root}>
            <input
                type="checkbox"
                checked={checked}
                onChange={checkboxSelect}
            />
            {checked ? "" : ""}

            <SensorChart data={inflation} data2 = {cpi}/>
            
        </div>
    </MuiThemeProvider>
};

export default withStyles(styles)(App);