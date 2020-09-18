import React, { useState, Component, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, connect } from "react-redux";
import { addtoCart } from "../../redux/action/cart";
import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import Layout from "../../components/layout";
import Link from "next/link";
import { withApollo } from "../../lib/apollo";


import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  btnTest: {
    color: "white",
    background: "black",
  },
});


const PRODUCT_DETAILS = gql`
  query getProductCategory($category_id: String!) {
    products(filter: { category_id: { eq: $category_id } }) {
      total_count
      items {
        id
        name
        sku
        url_key
        description {
          html
        }
        small_image {
          url
          label
        }
        price_range {
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
      }
    }
  }
`;



const IndexProductIdPage = ({ query }) => {
  const router = useRouter();
  const catId = router.query.category;
  const prodId = router.query.id;
  const styles = useStyles();
  console.log(router);

  const dispatch = useDispatch();
  const handleAddtocart = (productId, productName, productImage, productPrice, productCurrency) => {
    dispatch(
      addtoCart({
        id: productId,
        name: productName,
        img : productImage,
        price : productPrice,
        qty : parseInt(document.getElementById("qty").value),
        currency: productCurrency
      })
    );
  };

  if (catId) {
    console.log(catId);
    const response = useQuery(PRODUCT_DETAILS, {
      variables: {
        category_id: catId,
      }
    });
    const { loading, error, data } = response;
    console.log(loading);

    if(data != null) {
        const productDetails = data.products;
        console.log(productDetails);
        return (
          <Layout>
            <div className="product-details-wrapper">
            {productDetails.items.map((val, idx) => {
                if(router.query.id==`${val.id}`) {
                  console.log(val);
                  return (
                    <div key={idx}>
                      <div className="product-main-info">
                        <h1 className="page-title">{val.name}</h1>
                        <div className="product-sku">SKU#: {val.sku}</div>
                        <div className="product-info-detailed" dangerouslySetInnerHTML={{
    __html: val.description.html}}></div>
                        <div className="product-info-price">
                          <div className="price-box">
                          <div className="price final-price">{val.price_range.maximum_price.final_price.currency} {val.price_range.maximum_price.final_price.value}</div>
                          </div>
                        </div>
                        <div className="product-addtocart">
                            <input type="number" name="qty" min="1" max="5" className="qty" id="qty" defaultValue="1"/>
                            <button 
                              color="secondary"
                              className={styles.btnTest} 
                              onClick={() => handleAddtocart(`${val.id}`, `${val.name}`, `${val.small_image.url}`, `${val.price_range.maximum_price.final_price.value}`, `${val.price_range.maximum_price.final_price.currency}`)}>
                                Add to Cart
                            </button>
                        </div>
                      </div>
                      <div className="product-media"><img src={val.small_image.url} /></div>
                  
                    </div>
                  );
                }
              
              
            })}
            </div>
          </Layout>
        );
    }

  }
  return null;
};
export default withApollo({ ssr: true })(IndexProductIdPage);