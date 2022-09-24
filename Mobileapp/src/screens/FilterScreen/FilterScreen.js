import {View, Text, ImageBackground} from 'react-native';
import React from 'react';

const FilterScreen = () => {
  return (
    <ImageBackground source={require('../../../assets/images/bg.png')} style={{width: '100%', height: '100%', backgroundColor:'#ECFFFF'}}>

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#000', fontWeight: '900'}}>
        Welcome to Filer Page!!!
      </Text>
    </View>
    </ImageBackground>
  );
};

export default FilterScreen;
