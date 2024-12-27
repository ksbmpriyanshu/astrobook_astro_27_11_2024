import { View, FlatList, Text, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect,useRef } from 'react';
import MyHeader from '../../../components/MyHeader';
import { colors, fonts,getFontSize } from '../../../config/Constants';
import { useState } from 'react';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import AntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('screen');
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { captureRef } from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';


const WeeklyRashi = props => {
  const [horoscopeData] = useState(props.route.params.data);
  const [horoscopeName] = useState(props.route.params.items);
  const [isVisible, setIsVisible] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const { t } = useTranslation();
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);


  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
      header: () => (
        
        <MyHeader
          title="Horoscope"
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  const viewRef = useRef(null);

  const captureScreens = async () => {
    try {
      // Array to store captured image URIs
      const imageURIs = [];

      const pages = ['ascendant'];
  
      for (let i = 0; i < 1; i++) {

        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(viewRef)
        const uri = await captureRef(viewRef, {
          format: 'png',
          quality: 1,
          result: 'tmpfile',
        });
        console.log('uri====', uri);
       
        // Store the captured image URI
        imageURIs.push(uri);
      }
      
     
     

      sharePDF(imageURIs);
    } catch (error) {
      console.error('Error capturing or converting to PDF:', error);
    }
  };

  const sharePDF = async (filePath) => {
    try {
      const options = {
        title: 'Share PDF',
        url: `file://${filePath}`,
        subject: 'Screens PDF',
        message: 'Check out this PNG with captured screens!',
        failOnCancel: false,
      };
      await Share.open(options);
    } catch (error) {
      console.error('Error sharing PDF:', error);
      Alert.alert('Error', 'Failed to share PDF.');
    }
  };


  const astrologer_list = (item) => {
    navigation.navigate('astrologerList', { routename: item });
  };

  const horoscope_renderItems = ({ item, index }) => {
    console.log(item?.option);
    const show =
      item?.option == "weekly" ? false : true
      ;
    // bar chart
    const data = [
      {
        value: item?.love, labelText: 'Love', frontColor: '#8ecae6', sideColor: '#8ecae6', topColor: '#8ecae6', topLabelComponent: () => (
          <Text allowFontScaling={false} style={{ color: 'blue', fontSize: 18, marginBottom: 6 }}>{item?.love}</Text>
        ), labelComponent: () => (
          <Text allowFontScaling={false} style={{ color: 'red', fontSize: 12, marginTop: 2, marginLeft: 10 }}>Love</Text>
        )
      },
      {
        value: item?.wealth, label: 'Wealth', frontColor: '#219ebc', sideColor: '#219ebc', topColor: '#219ebc', topLabelComponent: () => (
          <Text allowFontScaling={false} style={{ color: 'blue', fontSize: 18, marginBottom: 6 }}>{item?.wealth}</Text>
        ), labelComponent: () => (
          <Text allowFontScaling={false} style={{ color: 'red', fontSize: 12, marginTop: 2, marginLeft: 10 }}>Wealth</Text>
        )
      },
      {
        value: item?.health, label: 'Health', frontColor: '#ffb703', sideColor: '#ffb703', topColor: '#ffb703', topLabelComponent: () => (
          <Text allowFontScaling={false} style={{ color: 'blue', fontSize: 18, marginBottom: 6 }}>{item?.health}</Text>
        ), labelComponent: () => (
          <Text allowFontScaling={false} style={{ color: 'red', fontSize: 12, marginTop: 2, marginLeft: 10 }}>Health</Text>
        )
      },
      {
        value: item?.business, label: 'Business', frontColor: '#588157', sideColor: '#588157', topColor: '#588157', topLabelComponent: () => (
          <Text allowFontScaling={false} style={{ color: 'blue', fontSize: 18, marginBottom: 6 }}>{item?.business}</Text>
        ), labelComponent: () => (
          <Text allowFontScaling={false} style={{ color: 'red', fontSize: 12, marginTop: 2, marginLeft: 10 }}>Business</Text>
        )
      },
      {
        value: item?.luck, label: 'Luck', frontColor: '#fb8500', sideColor: '#fb8500', topColor: '#fb8500',
        topLabelComponent: () => (
          <Text allowFontScaling={false} style={{ color: 'blue', fontSize: 18, marginBottom: 6 }}>{item?.luck}</Text>
        ), labelComponent: () => (
          <Text allowFontScaling={false} style={{ color: 'red', fontSize: 12, marginTop: 2, marginLeft: 15 }}>Luck</Text>
        )
      },

    ];

    

   
   

    return (
        <>
        { item?.option == 'weekly' ? (
            <View
            style={{
              flex: 1,
              margin: 0,
              backgroundColor: colors.background_theme1,
              borderRadius: 10,
              shadowColor: colors.black_color5,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              marginTop: 20,
              marginBottom: 10
            }} ref={viewRef}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text allowFontScaling={false} style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Weekly</Text>
              
  
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
              }}>
              <Image
                source={horoscopeName}
                style={{
                  width: width * 0.25,
                  height: width * 0.25,
                  resizeMode: 'contain',
  
                }}
              />
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 18,
                    color: colors.black_color,
                    fontFamily: fonts.bold,
                  }}>
                  Rashi Report
                </Text>
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    color: colors.black_color,
                    fontFamily: fonts.semi_bold,
                    textTransform: 'capitalize'
                  }}>
                  Sign: {item?.name}
                </Text>
              </View>
            </View>
  
            <Text allowFontScaling={false}
              style={{
                fontSize: 14,
                color: colors.black_color7,
                fontFamily: fonts.medium,
                padding:10
              }}>
              {item?.title}
            </Text>
            <Text allowFontScaling={false}
              style={{
                fontSize: 14,
                color: colors.black_color7,
                fontFamily: fonts.medium,
                padding:10
              }}>
              {item?.description}
            </Text>
            <BarChart
              barWidth={30}
              noOfSections={3}
              yAxisThickness={0}
              xAxisThickness={0}
              barBorderRadius={4}
              maxValue={100}
              isThreeD={true}
              backgroundColor={'white'}
              textColor={'red'}
              labelWidth={50}
              activeOpacity={1}
              isAnimated={true}
              yAxisLabelTexts={['0', '25', '50', '100']}
              height={250}
  
              labelTextStyle={{
                color: 'red'
              }}
              autoShiftLabels={true}
              data={data} donut />
  
  
          </View>
        ):(null)}
       
       </>
       
    )
  }

  return (
    <PaperProvider>
    <View style={{ flex: 1, backgroundColor: colors.background_theme1 }}>
     
      {horoscopeData && (
        
        <FlatList
          data={horoscopeData}
          renderItem={horoscope_renderItems}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 0,
                  height: height * 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: colors.black_color5,
                    fontFamily: fonts.medium,
                  }}>
                  No Data Available...
                </Text>
              </View>
            );
          }}

        />
      )}
    </View>
    </PaperProvider>
  );
};

export default WeeklyRashi;
