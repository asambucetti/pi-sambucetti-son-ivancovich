import {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import DynamicForm from '../components/DynamicForm';
import { FlatList } from 'react-native-web';
import { db } from '../firebase/config';

function Home(props) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    setPosts(posts)
                    setLoading(false)
                })
            }
        )
    })


    return (
        <View>
            <Text>NOMBRE DE LA APP</Text>
            <DynamicForm />
            <FlatList
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Text>{item.title}</Text>}
            />
        </View>
    )
}

export default Home;