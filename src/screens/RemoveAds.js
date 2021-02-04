import React, { useContext } from 'react'
import HTML from 'react-native-render-html';
import {
    List,
    Card,
    Title,
    Paragraph,
    Avatar, Button, withTheme
} from 'react-native-paper';
import { ScrollView } from 'react-native'
import { IApContext } from '../components/IApController'
const RemoveAds = ({ theme }) => {
    const { products, makePurchase, makeSubscription, getPurchases } = useContext(IApContext)

    const htmlContent = `
    <p style="textAlign: center;">Recurring billing,Cancel any time.</p>
    <p style="textAlign: center;">if you choose to purchase a subscription, payment will be charged to your iTunes account,and your account will be charged within 24-hour to the end  of the current period.Auto-renewal may be turned off at any time by going to your seting in your iTunes store after purchase.For more information please visit our <br><a href="https://kriss.io/term-of-service/">Terms of Use</a> and <a href="https://kriss.io/privacy-policy-for-kriss/">Privacy Policy</a>.</p>
 `;
    return (
        <ScrollView>
            <Card style={{
                shadowOffset: { width: 5, height: 5 },
                width: '90%',
                borderRadius: 12,
                alignSelf: 'center',
                marginBottom: 10,
                marginTop: 10
            }}>
                <Card.Title
                    title="Remove Ads"
                    subtitle="Remove all ads that annoy your eye"
                    left={props => <Avatar.Icon {...props} icon="bullhorn" />}
                />
                <Card.Title
                    title="Support content production"
                    subtitle="You help fundarise for  produce content"
                    left={props => <Avatar.Icon {...props} icon="human-handsup" />}
                />
                <Card.Content>


                    <Title>One time payment</Title>
                    <Paragraph>pay only one time for remove ads</Paragraph>
                    <Button icon="cart" mode="contained" onPress={() => makePurchase(products.products[0].productId)}>
                        {products.products[0].localizedPrice} one time
                </Button>
                    <Title>Pay Monthly</Title>
                    <Paragraph>pay monthly for remove ads</Paragraph>
                    <Button icon="cart" mode="contained" onPress={() => makeSubscription(products.products[2].productId)}>
                        {products.products[1].localizedPrice} every month
                </Button>



                </Card.Content>
                <HTML
                    key={theme.dark}
                    html={htmlContent}
                    onLinkPress={(event, href) => {
                        Linking.openURL(href).catch((err) => console.error('An error occurred', err));
                    }}

                    tagsStyles={{
                        p: { color: theme.colors.text },
                        a: { color: theme.colors.accent },
                    }}
                />
            </Card >
        </ScrollView>
    )
}

export default withTheme(RemoveAds)