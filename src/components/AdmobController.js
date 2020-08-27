import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { BannerAd, BannerAdSize, TestIds, RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob';
const banner_id =
    Platform.OS === 'ios'
        ? 'ca-app-pub-2547344479047582/1964568575'
        : 'ca-app-pub-2547344479047582/6824518092';
const reward_id =
    Platform.OS === 'ios'
        ? 'ca-app-pub-2547344479047582/1964568575'
        : 'ca-app-pub-2547344479047582/3578793688';
export const AdmobContext = createContext();
export const AdmobController = ({ children }) => {
    const [point, setPoint] = useState()
    const initRewardAds = () => {
        const rewarded = RewardedAd.createForAdRequest(reward_id, {
            requestNonPersonalizedAdsOnly: true,
        });
        rewarded.onAdEvent(async (type, error, reward) => {
            if (type === RewardedAdEventType.LOADED) {
                rewarded.show();
            }
            if (type === RewardedAdEventType.EARNED_REWARD) {
                await AsyncStorage.setItem('yourcanreadfreepost', '10').then(res => {
                    setPoint(10)
                    alert('Thank for support us')
                });

            }
        });

        rewarded.load();
    }

    const renderBanner = () => {
        return (
            <BannerAd style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}
                unitId={banner_id}
                size={BannerAdSize.SMART_BANNER}
                onAdLoaded={() => {
                    console.log('Advert loaded');
                }}
                onAdFailedToLoad={(error) => {
                    console.log('Advert failed to load: ', error);
                }}
            />
        )
    }
    return (
        <AdmobContext.Provider value={{ renderBanner, initRewardAds, point, setPoint }}>
            {children}
        </AdmobContext.Provider>
    );
};
