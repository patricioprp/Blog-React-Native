import React, { useReducer } from 'react';

export default (reducer,actions,initialState) => {

     const Context = React.createContext();

     const Provider = ({children}) => {
    
    const [state,dispatch] = useReducer(reducer,initialState);

    // actions === { addBlogPost (dispath) => { return () => {}}}
    const boundActions = {};
    for(let key in actions){
        //key === 'addBlogPost'
        boundActions[key] = actions[key](dispatch);
    }

    //boundActions pasa todos los actions addBlogPost, editBlogPost etc

    return<Context.Provider value={{ state,...boundActions }}> 
        {children}
    </Context.Provider>
     } 

     return {Context,Provider}
}
//https://es.reactjs.org/docs/hooks-reference.html