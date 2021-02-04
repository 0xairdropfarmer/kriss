import React, {useEffect, useState, useContext} from 'react';
import {FlatList, View, Image} from 'react-native';
import FlatlistItem from '../components/FlatlistItem';
import {Headline, Text} from 'react-native-paper';
import ContentPlaceholder from '../components/ContentPlaceholder';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Config from 'react-native-config';
const Bookmark = ({navigation}) => {
  const [bookmarkpost, setbookmarkpost] = useState([]);
  const [isloading, setisloading] = useState(true);

  const isFocused = useIsFocused();
  useEffect(() => {
    fetchBookMark();
  }, [isFocused]);
  const fetchBookMark = async () => {
    await AsyncStorage.getItem('bookmark').then(async token => {
      res = JSON.parse(token);
      setisloading(true);
      if (res) {
        console.log('arr', res);
        const result = res.map(post_id => {
          return 'include[]=' + post_id;
        });
        let query_string = result.join('&');
        const response = await fetch(
          `${Config.API_URL}/wp-json/wp/v2/posts?${query_string}`,
        );
        const post = await response.json();
        setbookmarkpost(post);
        console.log(post);
        setisloading(false);
      } else {
        setbookmarkpost([]);
        setisloading(false);
      }
    });
  };
  if (isloading) {
    return (
      <View style={{marginTop: 30, padding: 12}}>
        <ContentPlaceholder />
      </View>
    );
  } else if (bookmarkpost.length == 0) {
    return (
      <View
        style={{
          textAlign: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Image source={require('../assets/image/nobookmark.png')} />
      </View>
    );
  } else {
    return (
      <View>
        <Headline style={{marginLeft: 30}}>Bookmark Post</Headline>

        <FlatList
          data={bookmarkpost}
          renderItem={({index, item}) => (
            <React.Fragment>
              <FlatlistItem item={item} navigation={navigation} />
            </React.Fragment>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
};
export default Bookmark;
