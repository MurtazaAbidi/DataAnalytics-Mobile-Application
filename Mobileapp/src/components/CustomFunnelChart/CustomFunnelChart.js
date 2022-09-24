import { View, Text } from 'react-native'
import React from 'react'
import * as Progress from "react-native-progress";
import FunnelChart from 'react-native-funnel-chart';

const CustomFunnelChart = (props) => {
    const {showFunnel, funnel_Data} = props;

    
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
          Funnel Analysis
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 10,
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
    
    <View style={{
      margin: 10,
      // marginBottom:10,
      paddingVertical:5,
      paddingHorizontal:7,
        borderRadius: 20,
        backgroundColor: '#232B5D',
      }}>
    
    {renderTitle()}
    
    {showFunnel?
        <FunnelChart
        animated
        data={funnel_Data}
        backgroundColor={'#232B5D'}
        height={300}
        lineColor={'#fff'}
        space={3}
        fontSize={10}
        textColor={'#fff'}
        /> :
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Progress.CircleSnail color={["red", "green", "blue"]} />
         </View>
   }
   </View>

      </>
  )
}

export default CustomFunnelChart