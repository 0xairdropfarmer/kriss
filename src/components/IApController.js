import React, { createContext, useState, useContext } from 'react';
import * as RNIap from 'react-native-iap';
import { Alert, Platform } from 'react-native'
export const IApContext = createContext();

const itemSkus = Platform.select({
    ios: [
        'kriss.once.removeads',
        'kriss.sub.removeads'
    ],
    android: [
        'com.kriss.remove_ads_monthly',
        'com.kriss.remove_ad_forever'
    ]
});

export const IApController = ({ children }) => {
    const [products, setProducts] = useState([])
    const [showads, setShowads] = useState(true);
    const initIAp = async () => {
        try {
            const products = await RNIap.getProducts(itemSkus);
            if (Platform.OS === 'android') {
                const subscription = await RNIap.getSubscriptions(itemSkus);
                products.push(subscription[0])
            }
            console.log(products)
            setProducts({ products });
            console.log(products)
        } catch (err) {
            console.warn(err); // standardized err.code and err.message available
        }
    }
    makePurchase = async (sku) => {
        try {
            await RNIap.requestPurchase(sku, false).then(async (res) => {
                toggleAds(false)
            });
        } catch (err) {
            console.warn(err.code, err.message);
        }
    }
    makeSubscription = async (sku) => {
        try {
            await RNIap.requestSubscription(sku, false).then(async (res) => {
                toggleAds(false)
            });
        } catch (err) {
            console.warn(err.code, err.message);
        }
    }

    const toggleAds = value => {
        if (value === true) {
            setShowads(true);
        } else {
            setShowads(false);
        }
    };
    checkValidPurchase = async () => {
        try {
            const purchases = await RNIap.getAvailablePurchases();

            purchases.forEach(async (purchase) => {
                switch (purchase.productId) {
                    case 'kriss.once.removeads':
                        // await AsyncStorage.setItem('removeadsmonthly', JSON.stringify(res));
                        toggleAds(false)
                        break

                    case 'kriss.sub.removeads':
                        //   await AsyncStorage.setItem('removeadsmonthly', JSON.stringify(res));
                        toggleAds(false)
                        break
                    case 'com.kriss.remove_ads_monthly':
                        // await AsyncStorage.setItem('removeadsmonthly', JSON.stringify(res));
                        toggleAds(false)
                        break
                    case 'com.kriss.remove_ad_forever':
                        //   await AsyncStorage.setItem('removeadsmonthly', JSON.stringify(res));
                        toggleAds(false)
                        break
                    default: console.warn('your did not have any purchase');

                }
            })

        } catch (err) {
            console.warn(err);
        }
    }

    return (
        <IApContext.Provider value={{
            initIAp,
            showads,
            checkValidPurchase,
            products,
            makePurchase,
            makeSubscription,
        }}>
            {children}
        </IApContext.Provider>
    );
}   