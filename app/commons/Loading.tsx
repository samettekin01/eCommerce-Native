import React from 'react'
import { ActivityIndicator, Dimensions, View } from 'react-native'

function Loading() {
    return (
        <View style={{
            flex: 1,
            width: Dimensions.get("window").width,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ActivityIndicator size="large" />
        </View>
    )
}

export default Loading