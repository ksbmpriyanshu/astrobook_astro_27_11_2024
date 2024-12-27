import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_WIDTH } from '../../../config/Screen';
import { base_url } from '../../../config/Constants';

const Banner = ({data}) => {
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    source={{ uri: base_url + item }}
                    style={{ width: SCREEN_WIDTH * 0.95, height: SCREEN_WIDTH / 2.3, borderRadius: 10 }}
                    resizeMode="stretch"
                />
            </TouchableOpacity>
        );
    }
    return (
        <View>
            <Carousel
                loop
                width={SCREEN_WIDTH}
                height={SCREEN_WIDTH / 2}
                autoPlay={true}
                data={data}
                scrollAnimationDuration={1500}
                autoPlayInterval={5000}
                renderItem={renderItem}
            />
        </View>

    )
}

export default Banner