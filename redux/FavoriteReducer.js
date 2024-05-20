import { createSlice } from "@reduxjs/toolkit";

export const FavoriteSlice = createSlice({
    name:'favorite',
    initialState:{
        favorite:[]
    },
    reducers:{
        addOrRemoveFavorite:(state,action)=>{
            const itemPresent = state.favorite.find((item) => 
            item.id === action.payload.id);
            if(itemPresent){
                const removeItem= state.favorite.filter(item => 
                    item.id !== action.payload.id);
                    state.favorite = removeItem;
            }else{
                state.favorite.push({...action.payload})
            }
        },
        addFavorite:(state,action)=>{
            state.favorite.push({...action.payload})
        },
        removeFavorite:(state,action)=>{
            const removeItem= state.favorite.filter(item => 
                item.id !== action.payload.id);
                state.favorite = removeItem;
        },
          cleanFavorite:(state) => {
              state.favorite = [];
          }
    }
})

export const {addOrRemoveFavorite,addFavorite,removeFavorite} 
    = FavoriteSlice.actions;

export default FavoriteSlice.reducer;