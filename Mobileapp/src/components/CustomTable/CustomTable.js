import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Table, TableWrapper, Row } from 'react-native-table-component';

const CustomTable = (props) => {
    const { tableData, tableHead, widthArr, headText} = props;
      return (
        <View style={{
          margin: 20,
          padding: 16,
          borderRadius: 20,
          backgroundColor: '#232B5D',
          

        }}>
        {/* {console.warn (tableHead, widthArr)} */}
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
        {/* {Marchandise, Frequent Item Sets} */}
        {headText}
      </Text>
      
      <View style={{padding: 20, alignItems: 'center'}}>
        
    <ScrollView horizontal={true} >
      <View>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
        </Table>
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            {
              tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={[styles.row,index%2 &&  {backgroundColor: '#F7F6E7'}]}
                  textStyle={styles.text}
                />
              ))
            }
          </Table>
        </ScrollView>
      </View>
    </ScrollView>
</View>
  </View>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '300' },
    dataWrapper: { marginTop: -1 },
    row: { height: 70, backgroundColor: '#E7E6E1' }
  });

export default CustomTable