import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import * as Progress from "react-native-progress";

const CustomBarChart = (props) => {

  //   const [barChartData, setBarChartData]= ([])
  const { barData } = props;

 


  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegend = (text, color) => {
    return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
            paddingTop:10
          }}>
        {renderDot(color)}
        <Text style={{color: 'white', fontSize: 16, fontWeight:'bold'}}>{text}</Text>
      </View>

    );
  };

  const renderTitle = () => {
    return (
      <View style={{ marginTop: 10, marginBottom:10 }}>
        <Text
          style={{
            color: "white",
            fontSize: 25,

            fontWeight: "bold",
            textAlign: "center",
            textDecorationLine:"underline"
          }}
        >
          Page Visits
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
            //   backgroundColor: 'yellow',
          }}
        >
          <View style={{flexDirection: 'row',flexWrap: "wrap", justifyContent: 'center'}}>

          {renderLegend("Home Page", "#177AD5")} 
          {renderLegend("Search Page", "#ED6665")} 
          {renderLegend("Payment Page", "green")} 
          {renderLegend("Payment Confirmed", "yellow")} 
          </View>
      
        </View>
      </View>
    );
  };

  return (
    <>

          {renderTitle()}

          <BarChart

data={barData}
barWidth={8}
spacing={24}
roundedTop
roundedBottom
hideRules
            xAxisThickness={1}
            yAxisThickness={1}
            yAxisTextStyle={{ color: "#fff" }}
            
            noOfSections={5}
            maxValue={2500}
            renderTooltip={(item, index) => {
              return (
                <View
                style={{
                  marginBottom: 20,
                  marginLeft: -6,
                  backgroundColor: '#ffcefe',
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  borderRadius: 4,
                }}>
                  <Text>{item.value*10}</Text>
                </View>
              );
            }}
          />

  
  </>
  );
};

export default CustomBarChart;
