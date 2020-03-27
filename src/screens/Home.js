
import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native'
import {
    Headline, withTheme
} from 'react-native-paper';
import ContentPlaceholder from '../components/ContentPlaceholder'
import FlatlistItem from '../components/FlatlistItem'
const Home = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
        if (isFetching) {
            fetchLastestPost();
        }
    }, [isFetching]);
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
        setIsLoading(false)

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
    if (isLoading) {
        return (
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Headline style={{ marginLeft: 23 }}>Lastest Post</Headline>
                <ContentPlaceholder />
            </View>
        )
    } else {
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
                        <FlatlistItem item={item} navigation={navigation} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
        );
    }
}

export default Home
