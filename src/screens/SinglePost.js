
import React, { useState, useEffect, useContext } from 'react';
import {
    Avatar,
    withTheme,
    Card,
    Title,
    Paragraph,
    List, Button
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HTML from 'react-native-render-html';
import ImageLoad from 'react-native-image-placeholder';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Share,
    ScrollView,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';
import ContentPlaceholder from '../components/ContentPlaceholder';
import moment from 'moment';
const SinglePost = ({ route }) => {
    const [isLoading, setisLoading] = useState(true);
    const [post, setpost] = useState([]);
    const [bookmark, setbookmark] = useState(false);
    useEffect(() => {
        fetchPost()
    }, []);
    const fetchPost = async () => {
        let post_id = route.params.post_id;
        const response = await fetch(
            `https://kriss.io/wp-json/wp/v2/posts?_embed&include=${post_id}`,
        );
        const post = await response.json();
        setpost(post);
        setisLoading(false);
        renderBookMark(post_id);
    }
    const onShare = async (title, uri) => {
        Share.share({
            title: title,
            url: uri,
        });
    };
    const saveBookMark = async post_id => {
        setbookmark(true);
        await AsyncStorage.getItem('bookmark').then(token => {
            const res = JSON.parse(token);
            if (res !== null) {
                let data = res.find(value => value === post_id);
                if (data == null) {
                    res.push(post_id);
                    AsyncStorage.setItem('bookmark', JSON.stringify(res));
                    alert('Your bookmark post');
                }
            } else {
                let bookmark = [];
                bookmark.push(post_id);
                AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
                alert('Your bookmark post');
            }
        });
    };
    const removeBookMark = async post_id => {
        setbookmark(false);
        const bookmark = await AsyncStorage.getItem('bookmark').then(token => {
            const res = JSON.parse(token);
            return res.filter(e => e !== post_id);
        });
        await AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
        alert('Your unbookmark post');
    };
    const renderBookMark = async post_id => {
        await AsyncStorage.getItem('bookmark').then(token => {
            const res = JSON.parse(token);
            if (res != null) {
                let data = res.find(value => value === post_id);
                return data == null ? setbookmark(false) : setbookmark(true);
            }
        });
    };
    if (isLoading) {
        return (
            <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                <ContentPlaceholder />
            </View>
        )
    } else {
        return (
            <ScrollView>
                <Card>
                    <Card.Content>
                        <Title>{post[0].title.rendered}</Title>

                        <List.Item
                            title={`${post[0]._embedded.author[0].name}`}
                            description={`${post[0]._embedded.author[0].description}`}
                            left={props => {
                                return (
                                    <Avatar.Image
                                        size={55}
                                        source={{
                                            uri: `${post[0]._embedded.author[0].avatar_urls[96]}`,
                                        }}
                                    />
                                );
                            }}
                            right={props => {
                                if (bookmark == true) {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => removeBookMark(post[0].id)}>
                                            <MaterialCommunityIcons name="bookmark" size={30} />
                                        </TouchableOpacity>
                                    );
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => saveBookMark(post[0].id)}>
                                            <MaterialCommunityIcons
                                                name="bookmark-outline"
                                                size={30}
                                            />
                                        </TouchableOpacity>
                                    );
                                }
                            }}
                        />
                        <List.Item
                            title={`Published on ${moment(
                                post[0].date,
                                'YYYYMMDD',
                            ).fromNow()}`}
                            right={props => {
                                return (
                                    <TouchableOpacity
                                        onPress={() =>
                                            onShare(post[0].title.rendered, post[0].link)
                                        }>
                                        <MaterialCommunityIcons name="share" size={30} />
                                    </TouchableOpacity>
                                );
                            }}

                        />
                        <Paragraph />
                    </Card.Content>
                    <ImageLoad
                        style={{ width: '100%', height: 250 }}
                        loadingStyle={{ size: 'large', color: 'grey' }}
                        source={{ uri: post[0].jetpack_featured_media_url }}
                    />
                    <Card.Content>
                        <HTML
                            html={post[0].content.rendered}
                            imagesMaxWidth={Dimensions.get('window').width}

                        />
                    </Card.Content>
                </Card>
            </ScrollView>
        );
    }
}
export default SinglePost