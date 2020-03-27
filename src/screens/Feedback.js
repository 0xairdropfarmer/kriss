import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput as Input, Button, HelperText } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik';
import * as Yup from 'yup'
import database from '@react-native-firebase/database'
const submitForm = (values) => {
    database()
        .ref("feedback/")
        .push(values)
        .then(res => {
            alert("thank for giving feedback");
        })
        .catch(err => {
            console.error(err);
        });
}
const Feedback = () => {
    return (
        <Formik
            initialValues={{ email: '', name: '', message: '' }}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values)
                submitForm(values);
                setSubmitting(false);
            }}
            validationSchema={FeedbackSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, isValid, dirty, errors, touched, isSubmitting }) => (
                <KeyboardAwareScrollView>
                    <View style={{ padding: 10 }}>
                        <Input

                            placeholder={'Name'}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            underlineColor="transparent"
                            mode="outlined"

                        />
                        <HelperText
                            type="error"
                            visible={errors.name && touched.name}
                        >  {errors.name}</HelperText>
                        <Input

                            placeholder={'Email'}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            underlineColor="transparent"
                            mode="outlined"

                        />
                        <HelperText
                            type="error"
                            visible={errors.email && touched.email}
                        >  {errors.email}</HelperText>
                        <Input

                            placeholder={'Message'}
                            onChangeText={handleChange('message')}
                            onBlur={handleBlur('message')}
                            value={values.message}
                            underlineColor="transparent"
                            mode="outlined"
                            multiline={true}
                            numberOfLines={12}
                        />
                        <HelperText
                            type="error"
                            visible={errors.message && touched.message}
                        >  {errors.message}</HelperText>
                        <View >
                            <Button icon="email" disabled={!isValid} mode="contained" onPress={handleSubmit}>
                                Submit
                               </Button>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            )}
        </Formik>
    )
}
const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "name is Too Short!")
        .max(50, "name is Too Long!")
        .required("name is Required"),
    // recaptcha: Yup.string().required(),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is Required"),
    message: Yup.string()
        .min(12, "message is Too Short!")
        .max(50, "message is Too Long!")
        .required("message is Required"),
});
export default Feedback
