//
//  NameInput.tsx
//  AtSight version 1.0.0
//
//  Created by Nathan Quême on the 02/01/22 - 05/31/22.
//


// @ts-check
import React, { useState, useRef, useEffect } from 'react'
import colors from './../../assets/Colors'
import MainStyles from '../../components/styles/MainStyles'
import TextStyles from '../../components/styles/TextStyles'
import RedError from "../../components/ui/RedError"
import localization from '../../utils/localizations'
import { StatusBar, StyleSheet, View, TextInput, Keyboard, BackHandler, Appearance } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { TitleAndSubTitle } from '../../components/Headers'
import { ChevronLargeSymbol } from '../../components/Symbols'
import { ClassicButton } from '../../components/Buttons'

// Global data 
import { useDispatch } from 'react-redux'
import { updateSignUpValue } from '../../state/slices/signUpSlice'



const colorScheme = Appearance.getColorScheme()
const isInDarkColorScheme = colorScheme === "dark"





const NameInput = ({ navigation }) => {

    // States
    const [name, setName] = useState('')
    const [error, setError] = useState('')


    // Global data
    const dispatch = useDispatch()


    // Values 
    const textInputRef = useRef(null)





    // Disable go back support for Android
    const [backHandler, setBackHandler]: [any, any] = useState() // used to stop disabling the back button
    useEffect(() => {

        // The listener needs to be canceled whatever happens : whether the user closed the sheet or used its cancel button
        const handler = BackHandler.addEventListener("hardwareBackPress", () => {
            // ... (Do nothing)
            return true // Indicates that has overwritten the back action 
        })
        setBackHandler(handler)

    }, [])





    useEffect(() => {
        setTimeout(() => {
            textInputRef.current.focus()
        }, 550)
    }, [navigation])



    const openNextPage = () => {

        const trimmedName = name.trim()
        
        if (trimmedName === "") {
            setError(localization.empty_name)
            return
        }

        Keyboard.dismiss()
        dispatch(updateSignUpValue({ key: "account_name", value: trimmedName }))
        backHandler?.remove()
        navigation.navigate("UsernameInput")
    }






    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteToGray2 }} edges={['top', 'right', 'left']}>
                <StatusBar
                    barStyle={isInDarkColorScheme ? "light-content" : "dark-content"}
                    backgroundColor={colors.clear}
                    translucent
                />


                <View style={[styles.headerContainer, { paddingVertical: 30 }]}>
                    <ChevronLargeSymbol handleCloseView={() => { navigation.goBack() }} hide />
                    <TitleAndSubTitle title={localization.name} description={localization.name_input_description} />
                </View>



                <View style={[MainStyles.valueInputContainer, { marginHorizontal: 30, paddingRight: 16 - 5 }]} >
                    <TextInput
                        ref={textInputRef}
                        onFocus={() => { setError("") }}
                        autoFocus={false}
                        autoCorrect={false}
                        autoCapitalize={'words'}
                        placeholder={localization.name}
                        value={name}
                        onChangeText={text => setName(text)}
                        style={TextStyles.textInput16Medium}
                        placeholderTextColor='gray'
                        clearButtonMode="always"
                        returnKeyType='next'
                        onSubmitEditing={openNextPage}
                    />
                </View>


                {error ? <RedError error={error} marginTop={20} /> : null}


                <ClassicButton
                    onPress={openNextPage}
                    condition={(name !== '')}
                    text={localization.next}
                    topMargin={20}
                    horizontalMargin={30}
                    backgroundColor={colors.darkBlue}
                    textColor={"white"}
                />


            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default NameInput



const styles = StyleSheet.create({


    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },


})