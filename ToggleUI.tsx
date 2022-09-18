//
//  ToggleUI.tsx
//  AtSight version 1.0.0
//
//  Created by Nathan Quême.
//


// @ts-check
import React from 'react'
import { View, Text, Switch, Platform, Pressable } from 'react-native'
import Colors from './../../assets/Colors'
import TextStyles from '../styles/TextStyles'



interface ToggleUIInterface {
    title: string
    description?: string
    value: boolean
    onSetValue: any
    paddingVertical?: number
    disabled?: boolean
}
function ToggleUI({ title, description = "", value, onSetValue, paddingVertical = 20, disabled = false }: ToggleUIInterface) {
    return (
        <Pressable 
        onPress={() => { onSetValue(!value) }}
        style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: paddingVertical,
            backgroundColor: Colors.whiteToGray2,

        }}>
            <View style={{ flex: 1 }}>
                <Text style={[TextStyles.calloutMedium, { color: Colors.black }]} >{title}</Text>

                {(description !== "") &&
                    <Text style={[TextStyles.gray13Text, { paddingTop: 6 }]}>{description}</Text>
                }
            </View>



            <View style={{ paddingLeft: 35, opacity: Platform.OS === "android" && disabled ? 0.5 : 1 }}>
                <Switch
                    disabled={disabled}
                    trackColor={{ true: Colors.darkBlue }}
                    onValueChange={boolean => { onSetValue(boolean) }}
                    value={value}
                />
            </View>



        </Pressable>
    )
}



export default ToggleUI