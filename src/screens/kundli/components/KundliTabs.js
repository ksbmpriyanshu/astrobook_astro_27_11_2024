import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const getFontSize = (titleLength) => {
    // Adjust as needed
    return 16;
  };
  
  const calculateTabWidth = (title) => {
    const titleWidth = title.length * getFontSize(1.5) * 0.6;
    // Adding some padding or gap to the calculated width
    return titleWidth + 20; // Adjust as needed
  };

const CustomTabBarButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ padding: 10, minWidth: 50, width: 'auto' }}>
            {children}
        </TouchableOpacity>
    );
};

const KundliTabs = ({ state, navigation }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const width = calculateTabWidth(route.name); // Assuming 'name' instead of 'title'
                const isFocused = state.index === index;
                return (
                    <CustomTabBarButton
                        key={route.key}
                        onPress={() => navigation.navigate(route.name)}
                        style={{ width: width, backgroundColor: isFocused ? 'blue' : 'transparent' }}>
                        <Text style={{ color: isFocused ? 'white' : 'black' }}>{route.name}</Text>
                    </CustomTabBarButton>
                );
            })}
        </View>
    )
}

export default KundliTabs