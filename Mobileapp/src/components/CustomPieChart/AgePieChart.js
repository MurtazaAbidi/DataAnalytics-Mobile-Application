import { View, Text } from 'react-native'
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import React from 'react'

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

  const renderLegend = (text, color, percentage) => {
    return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
        {renderDot(color)}
        <Text style={{color: 'white', fontSize: 16, fontWeight:'bold'}}>{text+": "+percentage || ''}</Text>
      </View>

    );
  };

const AgePieChart = (props) => {

    const {text, data, color, percentage}= props;
   
  return (
    <View
      style={{
        margin: 20,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#232B5D',
      }}>
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
        Gender
      </Text>

      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={data}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'#232B5D'}
          toggleFocusOnPress={true}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                  Gender
                </Text>
                <Text style={{fontSize: 14, color: 'white'}}>sex</Text>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
          
        
      </View>
      <View style={{flexDirection: 'row',flexWrap: "wrap", justifyContent: 'center'}}>
      {/* {i=0}
      {percentage.map(element => {
          return renderLegend("abc", color[i], element)

        
      })} */}
    
      {renderLegend(data[0].text, color[0], percentage[0])} 
      {renderLegend(data[1].text, color[1], percentage[1])}
      
</View>
        
        {/* {renderLegendComponent()} */}
      </View>


  )
}

export default AgePieChart