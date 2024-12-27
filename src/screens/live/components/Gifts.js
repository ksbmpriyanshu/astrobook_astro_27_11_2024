import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { Colors, Fonts, Sizes } from '../../../assets/style';
import { SCREEN_HEIGHT } from '../../../config/Screen';
import MaskedView from './masked/maskedView';
import MaskedElement from './masked/giftMaskElement';

const Gifts = ({ giftedData }) => {
  console.log(giftedData)
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={{ ...Fonts.white11InterMedium }}>
          {item?.message}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 0.3,
        maxHeight: SCREEN_HEIGHT * 0.15,
        transform: [{ scaleY: -1 }],
      }}>
      <MaskedView element={<MaskedElement type={'gift'} />}>
        {
          giftedData && <FlatList
            data={giftedData}
            keyExtractor={item => item?.messageID}
            renderItem={renderItem}
            initialNumToRender={10}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: Sizes.fixPadding * 0.5,
            }}
          />
        }

      </MaskedView>
    </View>
  );
};

const mapStateToProps = state => ({
  giftedData: state.live.giftedData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Gifts);

const styles = StyleSheet.create({
  itemContainer: {
    transform: [{ scaleY: -1 }],
    flexDirection: 'row',
    marginBottom: Sizes.fixPadding * 0.5,
  },
});
