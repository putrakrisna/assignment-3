const initalState = {
    addtoCart: {}
};
  
const cartReducer = (state = initalState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "ADDTOCART":
            return {
                ...state,
                addtoCart: {
                    ...state.addtoCart,
                    [action.payload.id]: {
                        data: state.addtoCart[action.payload.id] ? {
                            id: action.payload.id,
                            name: action.payload.name,
                            img: action.payload.img,
                            price: action.payload.price,
                            qty: state.addtoCart[action.payload.id].data.qty + action.payload.qty,
                            currency: action.payload.currency
                        } : action.payload,
                    }
                }
            }
        default:
            return state;
    }
};

export default cartReducer;
  