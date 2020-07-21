import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state,action) => {
    
    switch(action.type){

        case 'get_blogPosts':
        return action.payload;//como los datos vienen de una api no es necesario hacer return [...state,action.payload] ya que la informacion  del servidor siempre es la correcta

        case 'edit_blogPost':
        return state.map( (blogPost) => {
        return blogPost.id === action.payload.id //condicion
        ?action.payload // si se cumple la condicion
        :blogPost;//si no se cumple la condicion

        //Esto es equivalente al codigo anterior
        /*   if(blogPost.id === action.payload.id){
               return action.payload;
           }else{
               return blogPost;
           }*/
        });

        case 'delete_blogPost':
        return state.filter( blogPost => blogPost.id !== action.payload );

        case 'add_blogPost':
        return[...state, {
            id: Math.floor(Math.random()*99999),
            title:action.payload.title,
            content:action.payload.content
        }];

        default:
        return state;
    }

};

const getBlogPost = dispatch => {
    return async() => {
       const response = await jsonServer.get('/blogposts');
       // response.data === [{},{},{}];
       dispatch({type:'get_blogPosts',payload:response.data});
    }
};

const addBlogPost = dispatch => {
    return async(title,content,callBack) => {
        //dispatch({type:'add_blogPost', payload:{title,content}});
        await jsonServer.post('/blogposts',{title,content});
        if(callBack){//se valida que siempre esxista un re llamada
          callBack();//esta funcion de retorno ejecuta el codigo para retornar al index
        }
    }
};

const deleteBlogPost = dispatch => {
    return async(id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({type:'delete_blogPost',payload: id });
    }
};

const editBlogPost = dispatch => {
    return async(title,content,id,callBack) => {
        await jsonServer.put(`/blogposts/${id}`,{title,content});
        dispatch({type:'edit_blogPost',payload:{title,content,id}});
        if(callBack){
            callBack();//esta funcion de retorno ejecuta el codigo para retornar al index
        }
    }
};
//este Contex y el Provider es el que nos devuelve el objeto createDataContext cuando es creado
export const { Context, Provider } = createDataContext(
    blogReducer,{
        addBlogPost,
        deleteBlogPost,
        editBlogPost,
        getBlogPost
    },[]);
