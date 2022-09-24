import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import axios from "axios";
import CustomFunnelChart from "../../components/CustomFunnelChart";
import CustomBarChart from "../../components/CustomBarChart";
import CustomLineChart from "../../components/CustomLineChart";
import getEnvVars from "../../../environment";
import CustomTable from "../../components/CustomTable";
const { apiUrl } = getEnvVars();

const DataAnalyticsScreen = () => {
  var funnelData = [
    {
      label: "Home Page",
      value: "13589",
      color: "green",
    },
    {
      label: "Search Page",
      value: "8855",
      color: "orange",
    },
    {
      label: "Payment page",
      value: "8453",
      color: "purple",
    },
    {
      label: "Payment Confirmed",
      value: "10586",
      color: "pink",
    },
  ];
  const [tableHead, setTableHead] = useState([]);
  const [widthArr, setWidthArr] = useState([
    200, 200, 60, 60, 60, 60, 60, 60, 60, 60, 60,
  ]);
  const [funnel_Data, setFunnel_Data] = useState([]);
  const [showFunnel, setShowFunnel] = useState(false);
  const [apiWait, setApiWait] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const months = ["Jan", "Feb", "Mar", "Apr"];
  useEffect(() => {
    // console.warn('hello')

    // Update the document title using the browser API
    axios
      .post(
        // body: JSON.stringify({
        `http://${apiUrl}/api/v1/data_analytics`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(function (response) {
        // ----------------------------------------------------------------------FunnelChart////
        let funnel_response = response.data.funnel1[0];
        // console.warn (funnel_response);
        let resArr = [];
        resArr.push(funnel_response.home_page);
        resArr.push(funnel_response.search_page);
        resArr.push(funnel_response.payment_page);
        resArr.push(funnel_response.payment_confirm);
        if (response.status === 200) {
          let i = 0;
          let temp = response.data.barGraph;
          //setBarData(response.data.barGraph);
          // console.warn (barData)
          funnelData.forEach((element) => {
            element.value = resArr[i];
            element.label +=
              " " +
              String(parseFloat((resArr[i] * 100) / resArr[0]).toFixed(2)) +
              "%";
            i += 1;
          });

          // ----------------------------------------------------------------------FunnelChart////

          // ------------------------------------------------------------- BarChart
          let arr = [];
          let lineChart1 = [];
          let lineChart2 = [];
          let lineChart3 = [];
          let lineChart4 = [];

          i = 0;
          temp.forEach((element) => {
            arr.push({
              value: element.home_page / 10,
              label: months[i],
              spacing: 2,
              labelWidth: 30,
              labelTextStyle: { color: "white" },
              frontColor: "#177AD5",
            });
            arr.push({
              value: element.search_page / 10,
              spacing: 2,
              labelWidth: 30,
              labelTextStyle: { color: "white" },
              frontColor: "#ED6665",
            });
            arr.push({
              value: element.payment_page / 10,
              spacing: 2,
              labelWidth: 30,
              labelTextStyle: { color: "white" },
              frontColor: "green",
            });
            arr.push({ value: element.payment_confirm, frontColor: "yellow" });

            lineChart1.push({
              value: element.home_page / 10,
              dataPointText: String(element.home_page),
              label: String(months[i]),
            });
            lineChart2.push({
              value: element.search_page / 10,
              dataPointText: String(element.search_page),
              label: String(months[i]),
            });
            lineChart3.push({
              value: element.payment_page / 10,
              dataPointText: String(element.payment_page),
              label: String(months[i]),
            });
            lineChart4.push({
              value: element.payment_confirm / 10,
              dataPointText: String(element.payment_confirm),
              label: String(months[i]),
            });

            i += 1;
          });
          // console.warn(arr);
          setBarData(arr);
          // -------------------------------------------------------------//BarChart

          // -------------------------------------------------------------LineChart

          temp = [];

          temp.push(lineChart1);
          temp.push(lineChart2);
          temp.push(lineChart3);
          temp.push(lineChart4);
          // console.warn (temp)
          setLineData(temp);

          // -------------------------------------------------------------//LineChart
          setFunnel_Data(funnelData);
          setShowFunnel(true);

          //-------------------------------------------------------------//Table

          console.warn(response.data.unknownQuery5[0].f_items[0]);
          const f_items = response.data.unknownQuery5[0].f_items;
          let tableheader = [];
          for (i in f_items[0]) {
            tableheader.push(i);
          }
          // console.warn (tableheader)
          setTableHead(tableheader);
          let finalTable = [];
          f_items.forEach((element) => {
            let eachRow = [];
            let count = 0;
            tableheader.forEach((i) => {
              if (count < 2) {
                eachRow.push(element[i]);
              } else {
                eachRow.push(parseFloat(element[i]).toFixed(3));
              }
              count += 1;
            });
            finalTable.push(eachRow);
          });
          console.warn(finalTable);
          setTableData(finalTable);

          //-------------------------------------------------------------//Table

          // console.warn (funnel_Data)
          setApiWait(false);
          // console.warn(response)
        }
      })
      .catch(function (error) {
        console.warn(error);
      });
    console.warn(barData);
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
    // <View style={}>
    //   {/* <Text style={{color: '#000', fontWeight: '900'}}>
    //     Welcome to Data Analytics Page!!!
    //   </Text> */}
    <>
      <ImageBackground
        source={require("../../../assets/images/bg.png")}
        style={{ width: "100%", height: "100%", backgroundColor: "#ECFFFF" }}
      >
        {apiWait ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Progress.CircleSnail color={["red", "green", "blue"]} />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={pullMe} />
            }
          >
            <View
              style={{
                margin: 20,
                padding: 16,
                borderRadius: 20,
                backgroundColor: "#232B5D",
              }}
            >
              <CustomBarChart barData={barData} />
              <CustomLineChart lineData={lineData} />
            </View>
            <CustomFunnelChart
              showFunnel={showFunnel}
              funnel_Data={funnel_Data}
            />
            <CustomTable
              tableData={tableData}
              tableHead={tableHead}
              widthArr={widthArr}
              headText = "Frequent Item Sets"
            />
          </ScrollView>
        )}
      </ImageBackground>
    </>
  );
};

export default DataAnalyticsScreen;
