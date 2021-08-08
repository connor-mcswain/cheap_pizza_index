import React, { useState, useEffect } from 'react';
import SensorChart from "./SensorChart";
import StackedLines from "./StackedLines";
import {inflationData} from "./Data3";
import {cpiData} from "./Data4";
import {m2Data} from "./Data5";
import {blankCPI} from "./Data6";
import {MuiThemeProvider, Theme, withStyles, createStyles, WithStyles, TextareaAutosize} from "@material-ui/core";
import {createTheme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';

const theme = createTheme({
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

const GreyTextTypography = withStyles({
    root: {
      color: "#374151",
      fontSize: 18
    }
})(Typography);

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
        //fontSize: ,
        
    },

    img: {
        top: 1000
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

            // proxy

            console.log(body);
            console.log("test");
            const test = await fetch(`/inflations/${body}`, {
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
        
        <div className={props.classes.root} style = {{alignItems: "center"}}>
            {/* <Grid container alignItems = "center" justify="center"> */}
                {/* <Grid style = {{width: 500}}> */}
                <div style = {{width: 1050, textAlign: "left"}}>
                <h1 style = {{textAlign: 'center'}}><img style = {{position: 'relative', top: 9}} src = {process.env.PUBLIC_URL + '/Pepperoni-Pizza-Flipped.png'} height = "42px" width = "42px"/> CPI = Cheap Pizza Index <img style = {{position: 'relative', top: 9}} src = {process.env.PUBLIC_URL + '/Pepperoni-Pizza.png'} height = "42px" width = "42px"/></h1>
                
                <GreyTextTypography variant="body1" display="initial">According to the <a href = "https://www.bls.gov/cpi/" target = "_blank">U.S. Bureau of Labor Statistics</a>, The Consumer Price Index (CPI) is a measure of the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services. Jerome Powell <a href = "https://youtu.be/ZgHjjQLlHNA?t=47" target = "_blank">frequently points out</a> that inflation has been low: </GreyTextTypography>
                      <blockquote><h3>"We’ve all been living in a world for a quarter century or more where all of the pressures were disinflationary, pushing downward on inflation. 
                      We’ve averaged less than 2% inflation for more than the last 25 years."</h3></blockquote>

                      <GreyTextTypography variant="body1" display="initial">But how can we pick one scalar quantity to represent inflation for everyone? Shouldn't inflation be different for each individual, depending on the market basket of goods each individual wants to buy? Michael Saylor argues that inflation is not a scalar quantity, but instead a vector.
                     Saylor points out that the CPI is largely dominated by consumer goods, which are impacted by deflationary pressures. Saylor <a href = "https://youtu.be/XgqC5_eugJI?t=2225" target = "_blank">claims</a> that most people don't care about the price of cheap consumer goods:</GreyTextTypography>
                     <blockquote><h3>"You don’t want cheap pizza, and you don’t want free streaming youtube and netflix - that’s patronizing."</h3></blockquote>

                     <GreyTextTypography variant="body1" display="initial">Instead, most people care about the rising cost of desirable, expensive goods like housing, education, childcare, and healthcare. These costs represent a huge portion of the average American's budget, and they are proportionally under-represented in the CPI.
                     To illustrate this, we can create our own hypothetical market basket of goods, and track the inflation rate for the last 25 years: let's see what the inflation rate would be for an individual who spends 25% of their budget on housing, 25% on education and childcare, 25% on healthcare, and invests the remaining 25% in the S&P: </GreyTextTypography>
                    
                </div>
                {/* </Grid> */}
                {/* <Grid> */}
                <span>{<br/>}</span><span>{<br/>}</span>

                <div style = {{textAlign: "left", alignItems: "left", width: 700}}>
                    <Grid container>
                    <Grid item style = {{fontWeight: "bold", paddingTop: 9}}>
                    <span>{<br/>}</span>
                        Market<span>{<br/>}</span>
                        Basket
                    </Grid>
                    <Grid item style = {{fontSize: 70, paddingLeft: 9}}>{'{'}</Grid>
                    <Grid item style = {{paddingTop: 8, paddingLeft: 4}}>
                    <div>
                    <input
                        type="checkbox"
                        checked={housing}
                        onChange={housingSelect}
                    />
                    Housing (<a href="https://dqydj.com/historical-home-prices/" target = "_blank">USA Median SFH Prices</a>)
                    </div>

                    <div>
                    <input
                        type="checkbox"
                        checked={education}
                        onChange={educationSelect}
                    />
                    Education and Childcare (<a href="https://fred.stlouisfed.org/series/CUSR0000SEEB" target = "_blank">USA Average Tuition and Childcare Prices</a>)
                    </div>

                    <div>
                    <input
                        type="checkbox"
                        checked={healthcare}
                        onChange={healthcareSelect}
                    />
                    Healthcare (<a href="https://www.kff.org/report-section/ehbs-2020-section-1-cost-of-health-insurance/" target = "_blank">USA Average Premiums for Family Coverage</a>)
                    </div>

                    <div>
                    <input
                        type="checkbox"
                        checked={stocks}
                        onChange={stocksSelect}
                    />
                    Stocks (<a href="https://finance.yahoo.com/quote/%5EGSPC/history/" target = "_blank">S&P 500</a>)
                    </div>
                    </Grid>
                    </Grid>

                </div>

                    <span>{<br/>}</span>

                    <div style={{"height" : "550px", "width" : "650px", "marginRight": "50px"}}>
                    
                        <SensorChart data={inflation} data2 = {cpi} data3 = {m2}/>
                    </div>
                
                <div style = {{width: 1050, textAlign: "left", marginTop: 90}}>
                

                     <GreyTextTypography variant="body1" display="initial">You can check/uncheck the different categories to see what different "market baskets" look like. Each category is weighted evenly (e.g. if 3 categories are selected then each category will be weighted by 1/3). If you exclude housing, the market basket increases almost exactly with the expansion of the money supply. 
                     For those who wish to raise a family and have a good quality of life, it's clear that the true inflation rate is closer to the expansion of the money supply than it is to the CPI.
                     <h3>Bitcoin Fixes This</h3>
                    For the first time in human history, we have the technology to truly separate money from state. Bitcoin will bring an end to the expansion of the money supply, and it will usher in a new era of human flourishing. For a good intro to Bitcoin, check out <a href = "https://vijayboyapati.medium.com/the-bullish-case-for-bitcoin-6ecc8bdecc1" target = "_blank">The Bullish Case for Bitcoin</a>. 
                    For some more alarming graphs showing the societal implications of fiat currency, check out <a href = "https://wtfhappenedin1971.com/" target = "_blank">wtfhappenedin1971.com</a>. 
                     </GreyTextTypography>
                    
                     <span>{<br/>}</span><span>{<br/>}</span><span>{<br/>}</span>

                     <div style = {{textAlign: "right"}}>site by: <a href = "mailto:cpmcswain98@gmail.com">Connor McSwain</a></div>

                     <span>{<br/>}</span><span>{<br/>}</span>
                </div>

                {/* </Grid> */}

            {/* </Grid> */}
        </div>
    </MuiThemeProvider>
};

export default withStyles(styles)(App);
