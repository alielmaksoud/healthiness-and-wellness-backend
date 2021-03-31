import React, { useEffect, useState } from 'react';
import './Blog.css';
import BlogItem from './BlogItem';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Title from "../BlogTitle/Title";


function Blog() {
  const [Blogs, setBlogs] = useState([]);
  const [items, setItems] = useState([]);

  const BlogItems = [];

  useEffect( () => {
        axios.get('http://localhost:8000/api/item',{
       
      })
            .then(res => {
                    setItems(res.data.data);
                    res.data.data.map((item) =>{
                     if (item.is_blog){
                      BlogItems.push(item)
                     }
                      
                      });
                        
                      setBlogs(BlogItems)
    
            }).catch(err => {
              console.log(err.request)
            })
      },[]);
    
      console.log(Blogs,'Blogggssss')



  return (
    <div className='cards'>
      <h1><Title /></h1>
      <div className='cards__container'>
        <ul className='cards__items'>
          {Blogs.map((data, key) => <BlogItem key={key} data={data}/>)}
          
        </ul>

      </div>
      
    </div>
  );
}

export default Blog;