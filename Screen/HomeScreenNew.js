import React,{useState,useEffect} from 'react';
// import { Appbar, Avatar,Button,TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, Image,Button } from 'react-native';

function HomeScreenNew({ navigation, route }) {
  const [posts, setPosts] = useState([
    {post: 'Coding...'},
    {post: 'Dancing...'},
    {post: 'Singing...'},
  ])
  console.warn(route.params?.post)
  const value = route.params?.post;
  const totalPosts = [...posts,{post:value}]
  console.log(totalPosts)
    useEffect(() => {
      if (route.params?.post) {
        // Post updated, do something with `route.params.post`
        // For example, send the post to the server
      }
    }, [route.params?.post]);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Create post"
          onPress={() => navigation.navigate('create')}
        />
        <Text style={{ margin: 10 }}>Post: {totalPosts.map(val=><Text>{val.post}</Text>)}</Text>
      </View>
    );
  }

  export default HomeScreenNew;
