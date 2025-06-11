import React, { useReducer, useContext, createContext } from 'react';

const cartstatecontext = createContext();
const cartdispatchcontext = createContext();

const reducer = (state, action) => {

    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size }]
        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr
        // case "UPDATE":
        //     let arr = [...state];
        //     arr.find((food, index) =>{
        //         if(food.id === action.id ){
        //             arr[index] ={...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price};
        //         }
        //         return arr
        //     });
        //     return arr

        case "UPDATE":
            let arr = [...state];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id === action.id && arr[i].size === action.size) {
                    arr[i] = {
                        ...arr[i],
                        qty: parseInt(arr[i].qty) + parseInt(action.qty),
                         price: parseInt(arr[i].price) + parseInt(action.price)
                    };
                    break;
                }
            }
            return arr;

        case "DROP":
            let empArray = []
            return empArray
        default:
            console.log("Error in Reducer");
    }

}

export const Cartprovider = ({ children }) => {


    const [state, dispatch] = useReducer(reducer, []);
    return (
        <cartdispatchcontext.Provider value={dispatch}>
            <cartstatecontext.Provider value={state}>
                {children}
            </cartstatecontext.Provider>
        </cartdispatchcontext.Provider>

    )

}


export const useCart = () => useContext(cartstatecontext);
export const useCartdispatch = () => useContext(cartdispatchcontext);