
import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native'
import {
    Headline, Title
} from 'react-native-paper';
import { IApContext } from '../components/IApController'
import { AdmobContext } from '../components/AdmobController'
import ContentPlaceholder from '../components/ContentPlaceholder'
import FlatlistItem from '../components/FlatlistItem'
import { NetworkContext } from '../components/NetworkController'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const Home = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    const { isConnected } = useContext(NetworkContext)
    let { renderBanner } = useContext(AdmobContext)
    let { showads } = useContext(IApContext)
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
    useEffect(() => {
        if (isConnected) {
            fetchLastestPost();
        } else {
            setIsLoading(false)
        }
    }, [isConnected]);
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
    } else if (!isConnected) {
        return (
            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons
                    name={'wifi-off'}
                    size={150}
                    color={'black'}
                />
                <Title style={{ textAlign: 'center' }} >Your are offline App will automatically reload when your back to online</Title>

            </View>
        )
    } else {

        return (
            <View>
                <Headline style={{ marginLeft: 23 }}>Lastest Post</Headline>
                {showads && renderBanner()}
                <FlatList
                    data={posts}
                    onRefresh={() => onRefresh()}
                    refreshing={isFetching}
                    onEndReached={() => handleLoadMore()}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => renderFooter()}
                    renderItem={({ item, index }) => (
                        <React.Fragment>

                            <FlatlistItem item={item} navigation={navigation} />

                        </React.Fragment>
                    )}

                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
        );
    }
}

export default Home
