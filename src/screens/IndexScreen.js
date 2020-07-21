import React, {useContext,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {Context} from '../context/BlogContext';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({navigation}) => {
    const { state, deleteBlogPost, getBlogPost }= useContext(Context);
    //para evitar que se recargue constantemente el componente y se produzca el bucle infinito
    useEffect( () => {
        getBlogPost();//esto se ejecuta una sola vez por eso es necesario usar addListener
        //una vez creado el post, regresa al index pero no se muestra el post creado, no se actualiza, lo resolveremos asi:
       const listener = navigation.addListener('didFocus',() => {
            //lo que hace addListener es que cuando se carga el componente actual, index se ejecuta getBlogPost
            getBlogPost();
        });

        return () => {
            listener.remove();//este es para hacer una limpieda del componente cuando salimos del mismo
        }
    },[]);
     return(
         <View>
             <FlatList 
             data={state}
             keyExtractor={(blogPost) => blogPost.title}
             renderItem={({item}) => {
                 return (
                 <TouchableOpacity onPress={() => navigation.navigate('Show',{id: item.id})}>
                 <View style={styles.row}>
                     <Text style={styles.title}>{item.title}</Text>
                     <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                     <AntDesign style={styles.icon} name="delete" size={24} />
                     </TouchableOpacity>
                 </View>
                 </TouchableOpacity>
                 )
             }}
             />
         </View>
         
     );
}

IndexScreen.navigationOptions = ({navigation}) => {
    return{
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name = "plus" size={24} color="black"/>
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:20,
        borderTopWidth:1,
        paddingHorizontal:10,
        borderColor:'gray'
    },
    title:{
        fontSize:18
    },
    icon:{
        fontSize:24
    }
});
export default IndexScreen;