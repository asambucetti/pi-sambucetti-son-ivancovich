import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { db, auth } from '../firebase/config';

function NuevoPost() {
    const [description, setDescription] = useState('');

    function onSubmit() {
        db.collection('posts').add({
            email: auth.currentUser.email,
            description: description,
            likes: [],
            createdAt: Date.now(),
        })
            .then(() => {
                console.log('Post Creado');
                setDescription('');
            })
            .catch(e => console.log(e))
    }

    return (
        <View>
            <Text>New Post</Text>
            <TextInput
                placeholder='Post:'
                value={description}
                onChangeText={text => setDescription(text)}
            />

            <Pressable onPress={onSubmit}>
                <Text>Publicar Post</Text>
            </Pressable>


        </View>
    )
}

export default NuevoPost;