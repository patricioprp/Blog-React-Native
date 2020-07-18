import React, {useContext} from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import {Context} from '../context/BlogContext';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({navigation}) => {
    const { state, deleteBlogPost }= useContext(Context);
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