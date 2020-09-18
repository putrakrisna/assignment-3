function Button(props) {
    console.log(props);
    const { stars } = props;
    return <div>Next stars: {stars}</div>;
  }
  
  Page.getInitialProps = async (ctx) => {
    const { query } = ctx;
    const response = await fetch("https://api.github.com/repos/vercel/next.js");
    const json = await response.json();
    return { stars: json.stargazers_count, query: query, title: "Contoh SSR" };
  };
  
  export default Button;
  