import React, {useState, useEffect, useContext} from 'react';
import {FlatList, ScrollView, View, TouchableOpacity} from 'react-native';
import ContentPlaceholder from '../components/ContentPlaceholder';
import { Card, Title } from 'react-native-paper'
import Config from "react-native-config";
const Categories = ({ navigation }) => {
    const [isloading, setisloading] = useState(true);
    const [categories, setCategories] = useState([]);
    const fetchCategorie = async () => {
        setisloading(true);
        const response = await fetch(`${Config.API_URL}/wp-json/wp/v2/categories`);
        const categories = await response.json();
        setCategories(categories);
        setisloading(false);
    };
    useEffect(() => {
        fetchCategorie();
    }, []);
    if (isloading) {
        return (
            <View style={{ marginTop: 30, padding: 12 }}>
                <ContentPlaceholder />
            </View>
        );
    } else {
        return (
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('CategorieList', {
                                categorie_id: item.id,
                                categorie_name: item.name,
                            })
                        }>
                        <Card>
                            <Card.Content>
                                <Title>{item.name}</Title>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}
export default Categories
