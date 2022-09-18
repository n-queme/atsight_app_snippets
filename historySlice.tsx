//
//  relatedItemsSlice.tsx
//  AtSight version 1.0.0
//
//  Created by Nathan Quême on 06/03/22.
//


// @ts-check
import { AccountMainData } from '../../Data'
import { createSlice } from '@reduxjs/toolkit'




const initialState: AccountMainData[] = []

export const historySlice = createSlice({
    name: 'history',
    initialState: initialState,
    reducers: {
        initializeHistory: (state, action) => {

            // Updates
            let seenAccounts = action.payload.seenAccounts ?? []
            return state = seenAccounts

        },
        /**
           * Adds an item if not already part of the history otherwise, removes it and adds it at the beginning of the list.
        */
        appendSeenAccountMainData: (state, action) => {

            // Values 
            const { accountMainData }: { accountMainData: AccountMainData } = action.payload

            // Indexes 
            let index = state.findIndex(e => { return e.account_id === accountMainData.account_id })

            // Updates 
            if (index === -1) {
                state.unshift(accountMainData)
            } else {
                state.splice(index, 1) // Removes it
                state.unshift(accountMainData) // Then adds it at the beginning
            }

        },
        removeSeenAccountMainData: (state, action) => {

          
            // Values 
            const account_id: string = action.payload.account_id

            // Indexes 
            let index = state.findIndex(e => { return e.account_id === account_id })

            // Updates 
            if (index === -1) return
            state.splice(index, 1) // Removes it

        },
        clearAllHistory: state => {

            // Updates
            state = initialState

        },
    }
})

export const { initializeHistory, appendSeenAccountMainData, removeSeenAccountMainData, clearAllHistory } = historySlice.actions


export default historySlice.reducer


// Selector 
export const selectHistory = state => state.history as AccountMainData[]




