//
//  CategoryAppearance.tsx
//  AtSight version 1.0.0
//
//  Created by Nathan Quême.
//


import React from 'react'
import colors from './../../assets/Colors'
import TextStyles from './../../components/styles/TextStyles'
import { View, Text, Pressable } from 'react-native'
import { CounterCapsule } from '../ui/CounterCapsule'
import { useState } from 'react'
import { useEffect } from 'react'



interface CategoryAppearanceInterface {
    title: string
    itemsCount?: number
    paddingTop: number
    paddingBottom: number
    loadingAppearance?: boolean
    children: any
    subtitle?: string
    onPress?: any
    hideItemsCountButton?: boolean
    wasCreated?: boolean
}
/**
  * Displays the title, a subtitle and the post count of the given postCategory. 
*/
export default function CategoryAppearance({ title, itemsCount = 0, paddingTop = 0, paddingBottom = 0, loadingAppearance = false, children, subtitle = "", onPress, hideItemsCountButton = false, wasCreated = false }: CategoryAppearanceInterface) {


    // States 
    const [wasCreatedAppearance, setWasCreatedAppearance] = useState(false)
    useEffect(() => {

        if (wasCreated) {
            setWasCreatedAppearance(true)
            setTimeout(() => {
                setWasCreatedAppearance(false)
            }, 950)
        }

    }, [wasCreated])


    return (
        <View style={{
            width: '100%',
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            backgroundColor: wasCreatedAppearance ? colors.newItemBlue : colors.clear,
        }}>


            {/* Top : info */}
            <Pressable
                onPress={onPress}
                style={{
                    paddingVertical: 13, // Originaly 8
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20
                }}
            >


                {/* Name + description */}
                <View style={{ alignItems: 'flex-start' }}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={[
                            TextStyles.medium15, {
                                color: loadingAppearance ? colors.clear : colors.black,
                                backgroundColor: loadingAppearance ? colors.softGray : colors.clear,
                            }]}
                    >{title}</Text>

                    {subtitle.length > 0 &&
                        <Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{
                                fontSize: 12,
                                paddingTop: 3, // NEW
                                color: loadingAppearance ? colors.clear : colors.smallGrayText,
                            }}
                        >{subtitle}</Text>
                    }
                </View>


                {/* Post count */}
                {!loadingAppearance && !hideItemsCountButton ?
                    <CounterCapsule itemsCount={itemsCount} /> : null
                }
            </Pressable>


            {children}
        </View>
    )
}


