import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import MyHeader from '../../components/MyHeader';
import { colors, fonts, getFontSize } from '../../config/Constants';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Colors, Fonts, Sizes } from '../../assets/style';
import MyStatusBar from '../../components/MyStatusbar';
import ShowSvg from './components/ShowSvg';
import { Dropdown } from 'react-native-element-dropdown';
import { SCREEN_HEIGHT } from '../../config/Screen';
import * as KundliActions from '../../redux/actions/KundliActions'

const charts = [
  { label: 'Chalit Chart', value: 'chalit' },
  { label: 'Moon Chart', value: 'MOON' },
  { label: 'Sun Chart', value: 'SUN' },
  { label: 'Brith Chart', value: 'D1' },
  { label: 'Hora Chart', value: 'D2' },
  { label: 'Dreshkan Chart', value: 'D3' },
  { label: 'Chathurthamasha Chart', value: 'D4' },
  { label: 'Panchmansha Chart', value: 'D5' },
  { label: 'Saptamansha Chart', value: 'D7' },
  { label: 'Ashtamansha Chart', value: 'D8' },
  { label: 'Navamansha Chart', value: 'D9' },
  { label: 'Dashamansha Chart', value: 'D10' },
  { label: 'Dwadashamsha Chart', value: 'D12' },
  { label: 'Shodashamsha Chart', value: 'D16' },
  { label: 'Vishamansha Chart', value: 'D20' },
  { label: 'Chaturvimshamsha Chart', value: 'D24' },
  { label: 'Bhamsha Chart', value: 'D27' },
  { label: 'Trishamansha Chart', value: 'D30' },
  { label: 'Khavedamsha Chart', value: 'D40' },
  { label: 'Akshvedansha Chart', value: 'D45' },
  { label: 'Shashtymsha Chart', value: 'D60' },
]

const ShowKundliCharts = ({ navigation, chartData, dispatch, isLoading }) => {
  const { t } = useTranslation();
console.log(chartData,'chartdata')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('chalit');

  useEffect(() => {
    dispatch(KundliActions.getKundliChartData('chalit'))
  }, [dispatch])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={colors.new_color} barStyle={'light-content'} />
      <MyHeader title={'Chart'} navigation={navigation} />
      <View>
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{...Fonts.black14InterMedium}}
          iconStyle={styles.iconStyle}
          data={charts}
          maxHeight={SCREEN_HEIGHT * 0.4}
          labelField="label"
          valueField="value"
          placeholder={'Select item'}
          value={value}
          onChange={item => {
            
            setValue(item?.value)
            dispatch(KundliActions.getKundliChartData(item?.value))
            // setValue(item.data);
          }}

        />

        <View>
          {chartData && <ShowSvg data={chartData} />}
        </View>

      </View>
    </View>
  );

};

const mapStateToProps = state => ({
  chartData: state.kundli.chartData,
  isLoading: state.setting.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ShowKundliCharts);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '90%',
    alignSelf: 'center',
    marginVertical: Sizes.fixPadding * 2
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    ...Fonts.gray14RobotoMedium
  },
  selectedTextStyle: {
    fontSize: 16,
    ...Fonts.black14InterMedium
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

