
import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList,ActivityIndicator } from 'react-native'
import {
    Avatar,
    Button,
    Card,
    Title,
    Paragraph,
    List,
    Headline,
} from 'react-native-paper';
import HTMLRender from 'react-native-render-html'
import moment from 'moment'

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (isFetching) {
            fetchLastestPost();
        }
    }, [isFetching]);
    useEffect(() => {
        if (page > 1) {
            fetchLastestPost();
        }
    }, [page]);
 
    function onRefresh() {
        setIsFetching(true);
    }
    function handleLoadMore() {
        setPage(page => page + 1);
    }
 
    const fetchLastestPost = async () => {
        const response = await fetch(
            `https://kriss.io/wp-json/wp/v2/posts?per_page=5&page=${page}`,
        );
        const post = await response.json();
        if (page == 1) {
            setPosts(post);
        } else {
            setPosts([...posts, ...post]);
        }
        setIsFetching(false);
 
 
    }

    useEffect(() => {
        fetchLastestPost()
    }, [])
    function renderFooter() {
        if (isFetching) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: '#CED0CE',
                }}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    }
 
    return (
        <View>
            <Headline style={{ marginLeft: 23 }}>Lastest Post</Headline>
            <FlatList
                data={posts}
                onRefresh={() => onRefresh()}
                refreshing={isFetching}
                onEndReached={() => handleLoadMore()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => renderFooter()}
                renderItem={({ item }) => (
                    <Card
                        style={{
                            shadowOffset: { width: 5, height: 5 },
                            width: '90%',
                            borderRadius: 12,
                            alignSelf: 'center',
                            marginBottom: 10,
                        }}>
                        <Card.Content>
                            <Title>{item.title.rendered}</Title>
                            <Paragraph>Published on {moment(item.date).fromNow()}</Paragraph>
                        </Card.Content>
                        <Card.Cover
                            source={{ uri: item.jetpack_featured_media_url }}
                        />
                        <Card.Content>

                            <HTMLRender html={item.excerpt.rendered} />

                        </Card.Content>

                    </Card>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

        </View>
    );

}

export default Home
