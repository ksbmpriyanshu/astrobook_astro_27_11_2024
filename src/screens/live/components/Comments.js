import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {Colors, Sizes, Fonts} from '../../../assets/style';
import {SCREEN_HEIGHT} from '../../../config/Screen';
import MaskedView from './masked/maskedView';
import MaskedElement from './masked/maskElement';

const Comments = ({commentsData}) => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.nameContainer}>
          <Text style={{...Fonts.black14InterMedium}}>
            {item?.fromUser?.userName[0]}
          </Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={{...Fonts.white16RobotBold, fontSize: 13}}>
            {item?.fromUser?.userName}
          </Text>
          <Text style={{...Fonts.white11InterMedium,}}>{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 0.7,
        maxHeight: SCREEN_HEIGHT * 0.4,
        transform: [{scaleY: -1}],
      }}>
      <MaskedView element={<MaskedElement />}>
        <FlatList
          data={commentsData}
          keyExtractor={item => item?.messageID}
          renderItem={renderItem}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: Sizes.fixPadding * 0.5,
          }}
        />
      </MaskedView>
    </View>
  );
};

const mapStateToProps = state => ({
  commentsData: state.live.commentsData,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

const styles = StyleSheet.create({
  itemContainer: {
    transform: [{scaleY: -1}],
    flexDirection: 'row',
    marginBottom: Sizes.fixPadding * 0.5,
  },
  nameContainer: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    // backgroundColor: 'rgba(4, 4, 4, 0.13)',
    marginLeft: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 0.2,
    borderRadius: Sizes.fixPadding * 0.5,
    flex: 1
  },
});
