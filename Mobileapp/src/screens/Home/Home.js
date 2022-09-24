import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from "react-native";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomPieChart from "../../components/CustomPieChart/CustomPieChart";
import AgePieChart from "../../components/CustomPieChart/AgePieChart";
import BrowserPieChart from "../../components/CustomPieChart/BrowserPieChart";
import CustomTable from "../../components/CustomTable";
import getEnvVars from "../../../environment";
const { apiUrl } = getEnvVars();

// ...

{
  /* <BarChart data = {data} />
<LineChart data = {data} />
<PieChart data = {data} /> */
}

// For Horizontal Bar chart, just add the prop horizontal to the <BarChart/> component

{
  /* <BarChart data = {data} horizontal /> */
}

// For Area chart, just add the prop areaChart to the <LineChart/> component

// For Donut chart, just add the prop donut to the <PieChart/> component

{
  /* <PieChart data = {data} donut /> */
}

const colors = [
  "lightblue",
  "green",
  "orange",
  "purple",
  "yellow",
  "red",
  "blue",
  "pink",
];
const Home = () => {
  const [tableHead, setTableHead] = useState([
    "Marchandise",
    "Total Quantity",
    "Total Price",
  ]);
  const [widthArr, setWidthArr] = useState([200, 50, 80]);
  const [ageRanges, setAgeRanges] = useState([]);
  const [genderRanges, setGenderRanges] = useState([]);
  const [browserRanges, setbrowserRanges] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [percentage, setPercentage] = useState([]);
  const [percentageGender, setPercentageGender] = useState([]);
  const [percentageBrowser, setPercentageBrowser] = useState([]);
  const [apiWait, setApiWait] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
    axios
      .post(
        // body: JSON.stringify({
        `http://${apiUrl}/api/v1/homepage`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.status.toString());
        if (response.status === 200) {
          // console.warn(response.data);
          const ageData = response.data.age;
          const genderData = response.data.gender;
          const browserData = response.data.browser;
          const transactions = response.data.transactions;
          // console.warn(ageData)
          const ageOccurance = [];
          const genderOccurance = [];
          const browserOccurance = [];

          var i = 0;
          var total = 0;
          ageData.forEach((element) => {
            total += Number(element.number_of_occurences);
            // setData ({value:element.number_of_occurences})
            ageOccurance.push({
              value: Number(element.number_of_occurences),
              text: element.ages,
              color: colors[i],
            });
            i += 1;
          });
          let temp = [];
          temp = ageOccurance.map((element) => {
            // console.log(element.value,"/",total," = ",element.value*100/total)
            return (
              String(parseFloat((element.value / total) * 100).toFixed(0)) + "%"
            );
          });
          setPercentage(temp);
          total = 0;
          i = 0;
          genderData.forEach((element) => {
            console.log(genderRanges);
            total += Number(element.number_of_occurences);
            // setData ({value:element.number_of_occurences})
            genderOccurance.push({
              value: Number(element.number_of_occurences),
              text: element.gender,
              color: colors[i],
            });
            i += 1;
          });
          temp = [];
          temp = genderOccurance.map((element) => {
            // console.log(element.value,"/",total," = ",element.value*100/total)
            return (
              String(parseFloat((element.value / total) * 100).toFixed(0)) + "%"
            );
          });
          setPercentageGender(temp);
          total = 0;
          i = 0;
          browserData.forEach((element) => {
            // console.log(browserRanges)
            total += Number(element.count);
            // setData ({value:element.number_of_occurences})
            browserOccurance.push({
              value: Number(element.count),
              text: element.browser,
              color: colors[i],
            });
            i += 1;
          });
          temp = [];
          temp = browserOccurance.map((element) => {
            // console.log(element.value,"/",total," = ",element.value*100/total)
            return (
              String(parseFloat((element.value / total) * 100).toFixed(0)) + "%"
            );
          });
          setPercentageBrowser(temp);
          let finalTable = [];
          transactions.forEach((element) => {
            let rowData = [];
            rowData.push(element.name);
            rowData.push(element.total_quantity);
            rowData.push("$" + element.total_price);
            finalTable.push(rowData);
            rowData = [];
          });
          setTableData(finalTable);
          // console.warn(finalTable);

          // console.warn (ageOccurance)
          setAgeRanges(ageOccurance);
          setGenderRanges(genderOccurance);
          setbrowserRanges(browserOccurance);
          setApiWait(false);
        }
      })
      .catch(function (error) {
        Alert.alert(error.response.data);
        console.log(error.response.data);
      });
  }, [refresh]);

  const pullMe = () => {
    setRefresh(true);
    setApiWait(true);
    setTimeout(() => {
      setRefresh(false);
      // setApiWait(false);
    }, 50);
  };

  return (
    // <SafeAreaView>

    <ImageBackground
      source={require("../../../assets/images/bg.png")}
      style={{ width: "100%", height: "100%", backgroundColor: "#ECFFFF" }}
    >
      {/* {console.warn (data)} */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Text style={{color: '#000', fontWeight: '900'}}>
        Welcome to Home Page!!!
      </Text> */}
        {/* <View
    style={{
      paddingVertical: 100,
      backgroundColor: '#34448B',
      flex: 1,
    }}> */}
        {apiWait ? (
          <Progress.CircleSnail color={["red", "green", "blue"]} />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={pullMe} />
            }
          >
            <CustomPieChart
              text={"Age"}
              data={ageRanges}
              color={colors}
              percentage={percentage}
            />
            <AgePieChart
              text={"Gender"}
              data={genderRanges}
              color={colors}
              percentage={percentageGender}
            />
            <BrowserPieChart
              text={"Browser"}
              data={browserRanges}
              color={colors}
              percentage={percentageBrowser}
            />
            {console.warn(apiWait, tableData)}

            <CustomTable
              tableData={tableData}
              tableHead={tableHead}
              widthArr={widthArr}
              headText="Marchandise"
            />
          </ScrollView>
        )}
      </View>
    </ImageBackground>
    // </SafeAreaView>
  );
};

export default Home;
