import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts"

const CustomLineChart = (props) => {
  const {lineData} = props;
  console.warn(lineData)

  // const lineData = [
  //   {value: 0, dataPointText: '0'},
  //   {value: 10, dataPointText: '10'},
  //   {value: 8, dataPointText: '8'},
  //   {value: 58, dataPointText: '58'},
  //   {value: 56, dataPointText: '56'},
  //   {value: 78, dataPointText: '78'},
  //   {value: 74, dataPointText: '74'},
  //   {value: 120, dataPointText: '98'},
  // ];

  // const lineData2 = [
  //   {value: 0, dataPointText: '0'},
  //   {value: 20, dataPointText: '20'},
  //   {value: 18, dataPointText: '18'},
  //   {value: 40, dataPointText: '40'},
  //   {value: 36, dataPointText: '36'},
  //   {value: 60, dataPointText: '60'},
  //   {value: 54, dataPointText: '54'},
  //   {value: 85, dataPointText: '85'},
  // ];
return (
    <View style={{
        // margin: 20,
        // padding: 16,
        padding:30,
        marginTop:40,

        borderRadius: 20,
        backgroundColor: '#fff9',
        borderWidth:7,
        borderColor:'#232B5D'
        // backgroundColor: '#232B5D',

      }}>
          <LineChart
          data={lineData[0]}
          data2={lineData[1]}
          data3={lineData[2]}
          data4={lineData[3]}
          height={250}
          
          spacing={65}
          initialSpacing={5}
          color1="black"
          color2="black"
          color3="black"
          color4="black"
          textColor1="green"
          textColor2="green"
          textColor3="green"
          textColor4="green"
          dataPointsHeight={-1}
          dataPointsWidth={6}
          dataPointsColor1="blue"
          dataPointsColor2="red"
          dataPointsColor3="green"
          dataPointsColor4="yellow"
          textShiftY={-2}
          textShiftX={10}
          textFontSize={13}
          // rulesColor="blue"
          indicatorColor="black"
          showScrollIndicator={true}
          // style={{backgroundColor:'red'}}
          rulesLength={200}
          xAxisLength={200}
          curved
          isAnimated={true}
          showVerticalLines={false}
          
          thickness={2}
          
        
          
          
          
          // textColor1="#fff"
          // textColor2="#fff"
          

      />


      </View>
);
};

export default CustomLineChart;