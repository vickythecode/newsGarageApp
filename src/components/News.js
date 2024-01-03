import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>{

  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResult,setTotalResult]=useState(0)

  const capitalizer=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }


  const updateNews=async()=>{
    props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    props.setProgress(50);
    let data =await fetch(url);
    let parsedData=await data.json();
    setArticles(parsedData.articles)
    setTotalResult(parsedData.totalResult)
    setLoading(false)
    props.setProgress(100)
  }

  useEffect(()=>{
    document.title=`${capitalizer(props.category)} - NewsGarage`
    updateNews()
  },[])


  const fetchMoreData = async() => {
   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
   setPage(page+1)
   let data =await fetch(url);
   let parsedData=await data.json();
   setArticles(articles.concat(parsedData.articles))
   setTotalResult(parsedData.totalResult)
  };


    return (
      <>
        <h1 className="text-center" style={{margin:"30px",marginTop:"90px"}}>NewsGarage - Top Headlines</h1>
        {loading &&<Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResult}
          loader={<Spinner/>}
        >

        <div className="container">
        <div className="row">
        {articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title.slice(0,44)} desc={element.description} imageUrl={element.urlToImage}
                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        
      </>
        
    )
}

News.defaultProps={
  country:"in",
  pageSize:6,
  category:"sports"
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News
