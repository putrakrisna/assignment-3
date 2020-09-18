import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useQuery, gql } from "@apollo/client";
import Layout from "../components/layout";
import Link from "next/link";
import { withApollo } from "../lib/apollo";
const CATEGORY_LIST = gql`
  {
    categoryList(filters: {}) {
      id
      name
      level
      url_key
      url_path
      display_mode
      children_count
      children {
        id
        name
        url_key
        url_path
        display_mode
      }
    }
  }
`;
const Category = () => {
  const response = useQuery(CATEGORY_LIST);
  const { loading, error, data } = response;
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error...</div>;
  }
  const category = data.categoryList;
  
  return (
    <div className={styles.container}>
        <div className="block-widget categories">
          <h3>Categories</h3>
          <ul>
            {category.map((val, idx) => {
              if(`${val.level}` == 1 || `${val.level}` == 2) {
                return (
                  <li key={idx}>
                    <Link href="/category/[id]" as={`/category/${val.id}`}>
                      <a>{val.name}</a>
                    </Link>
                  </li>
                );
              }
              
              
            })}
          </ul>
        </div>
      </div>
  );
};
export default withApollo({ ssr: true })(Category);