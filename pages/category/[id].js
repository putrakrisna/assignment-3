import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/Category.module.css";
import { useQuery, gql } from "@apollo/client";
import Layout from "../../components/layout";
import Link from "next/link";
import { withApollo } from "../../lib/apollo";

const CATEGORY_DETAILS = gql`
  query getCategoryById($ids: String!) {
    categoryList(filters: { ids: { eq: $ids } }) {
      name
      description
      products {
        items {
          id
          name
          sku
          url_key
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
            }
          }
        }
      }
    }
  }
`;

const IndexCategoryIdPage = ({ query }) => {
  const router = useRouter();
  const id = router.query.id;
  
  if (id) {
    const response = useQuery(CATEGORY_DETAILS, {
      variables: {
        ids: id,
      }
    });
    const { loading, error, data } = response;
    
    if(data != null) {
      
      const category = data.categoryList;
      const productCatalog = data.categoryList[0].products.items;
      
      return (
        <Layout>
        <div >
          <div className="category-info">
          {category.map((val, idx) => {
              return (
                <div key={idx}>
                  <h1 className="page-title">{val.name}</h1>
                  <div className="category-description" dangerouslySetInnerHTML={{
    __html: val.description}}></div>
                </div>
              );
              
            })}
          </div>
          <div className="products-list">
          <ul>
            {productCatalog.map((val, idx) => {
              
              return (
                <li key={idx}>
                  <div className="product-item-info">
                    
                    <Link href={`/product/${val.id}?category=${id}`} >
                      <a><div className="product-image"><img src={val.small_image.url} /></div></a>
                    </Link>
                    <Link href="/product/[id]" as={`/product/${val.id}?category_id=${id}`}>
                      <a>{val.name}</a>
                    </Link>
                    <div className="price-box">
                    {val.price_range.maximum_price.final_price.currency} {val.price_range.maximum_price.final_price.value}
                    </div>
                  </div>
                  
                </li>
              );
              
            })}
          </ul>
          </div>
          
        </div>
        </Layout>
      );
    }

    return null
  }
  
  
};
export default withApollo({ ssr: true })(IndexCategoryIdPage);