import React from 'react';

const BlogContext = React.createContext();

export const BlogProvider = ({ children}) =>{

    const blogPost = [
        {title:'Blog Post #1'},
        {title:'Blog Post #2'},
        {title:'Blog Post #3'},
        {title:'Blog Post #4'},
        {title:'Blog Post #5'},
        {title:'Blog Post #6'}
    ];
    return <BlogContext.Provider value={blogPost}>
             {children}
           </BlogContext.Provider>
};

export default BlogContext;