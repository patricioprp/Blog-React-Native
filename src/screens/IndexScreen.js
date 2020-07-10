import React, {useContext} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BlogContext from '../context/BlogContext'

const IndexScreen = () => {
    const blogPost = useContext(BlogContext);
     return(
         <View>
             <Text>Index Screen</Text>
             <FlatList 
             data={blogPost}
             keyExtractor={(blogPost) => blogPost.title}
             renderItem={({item}) => {
                 return <Text>{item.title}</Text>
             }}
             />
         </View>
     );
}

const styles = StyleSheet.create({});
export default IndexScreen;