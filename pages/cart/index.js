import React, { useEffect, useState } from "react";
import { useSelector , useDispatch} from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Layout from "../../components/layout";

function Cart() {
    const data = useSelector((state) => state.cart);
    //let { url } = useRouteMatch();

    const dispatch = useDispatch();
    
    const [datacart, setDataCart] = useState([]);
    useEffect(() => {
        const getData = () => {
            for (let key in data.addtoCart) {
                setDataCart(prevArray => [...prevArray,
                {
                    img: data.addtoCart[key].data.img,
                    name: data.addtoCart[key].data.name,
                    price: data.addtoCart[key].data.price,
                    qty: data.addtoCart[key].data.qty,
                    currency: data.addtoCart[key].data.currency,
                },
                ]);
            }
        };
        getData();
    }, []);
  
   return (
       <Layout>
           <div className="cart-wrapper">
            <h3 className="title">Shopping Cart</h3>
            <style jsx="true">{`
            .cart-wrapper {}
            .cart {
                width:100%;
            }
            .cart th {
                text-align:left;
            }
        `}</style>
            {datacart.length > 0 ? (
                <table className="cart">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {datacart.map((val, index) => (
                                <tr key={index}>
                                    <td>{val.name}</td>
                                    <td>{val.currency} {val.price}</td>
                                    <td>{val.qty}</td>
                                    <td>{val.currency} {val.qty * val.price} </td>
                                </tr>
                            ))}
                </tbody>
            </table>
            ) : (
                    <p>Cart Empty</p>
                )}
            
            
            
            
        </div>
       </Layout>
   );
};
 
export default Cart;