import React from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  Checkbox, Button, Text
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';
import { retrieveSignUpFunction, retrieveSignInFunction, retrieveCurrentUserFunction } from '../../../services/parse/auth';

import FormInput from '../../../components/FormikFields/FormInput';
import TermsModal from '../../../components/TermsModal';
// STYLING
import { theme } from '../../../modules/theme';
import { storeData, getData } from '../../../modules/async-storage';

import I18n from '../../../modules/i18n';

const validationSchema = yup.object().shape({
  firstname: yup
    .string()
    .label('First Name')
    .required(),
  lastname: yup
    .string()
    .label('Last Name')
    .required(),
  email: yup
    .string()
    .label('Email')
    .email(),
  phonenumber: yup
    .string()
    .label('Phone Number')
    .min(10, 'Seems a bit short..'),
  organization: yup
    .string()
    .label('Username')
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(4, 'Seems a bit short...'),
  password2: yup
    .string()
    .label('Password')
    .required()
    .min(4, 'Seems a bit short...')
});

// export default () => (
export default function SignUp({ navigation }) {
  const [checked, setChecked] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const handleLogIn = () => {
    navigation.navigate('Sign In');
  };
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: theme.colors.accent, flex: 1 }}
    >
      <View>
        <Button icon="arrow-left" width={100} style={{ paddingTop: 20 }} onPress={handleLogIn}>
          Back
        </Button>
        <ScrollView style={{ backgroundColor: theme.colors.accent }}>
          <SafeAreaView style={{ marginTop: 30 }}>
            <Formik
              initialValues={{
                firstname: '', lastname: '', email: '', phonenumber: '', password: '', password2: '', organization: ''
              }}
              onSubmit={(values, actions) => {
                if (!checked) {
                  alert(I18n.t('signUp.errorTerms')); // eslint-disable-line
                } else if (values.password !== values.password2) {
                  alert(I18n.t('signUp.errorPassword')) // eslint-disable-line
                } else {
                  retrieveSignUpFunction(values)
                    .then((user) => {
                      console.log("sign up success")
                      const userString = JSON.stringify(user);
                      const userValues = JSON.parse(userString);
                      const { username } = userValues;
                      // sign user in after successful sign up
                      retrieveSignInFunction(username, values.password)
                        .then(() => {
                          // user signed in and signed up
                          // store organization for future use
                          const currentUser = retrieveCurrentUserFunction();
                          getData('organization').then((organization) => {
                            if (organization !== currentUser.organization) {
                              storeData(currentUser.organization, 'organization');
                            }
                          });
                          navigation.navigate('Root');
                        }, () => {
                          // sign in failed, alert user
                          console.log("fail 1")
                        });
                    }, (error) => {
                      // sign up failed alert user
                      console.log(error);
                      console.log("fail 2")
                      alert("Sign up attempt failed.\n\nYou might have attempted to sign up with a username (email/phone number) that has been previously registered with another account.\n\nPlease contact your supervisor if you believe this is an error.")
                    });
                }
                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 1000);
              }}
              validationSchema={validationSchema}
            >
              {(formikProps) => (
                <>
                  <FormInput
                    label={I18n.t('signUp.firstName')}
                    formikProps={formikProps}
                    formikKey="firstname"
                    placeholder="John"
                    autoFocus
                  />
                  <FormInput
                    label={I18n.t('signUp.lastName')}
                    formikProps={formikProps}
                    formikKey="lastname"
                    placeholder="Doe"
                  />
                  <FormInput
                    label={I18n.t('signUp.email')}
                    formikProps={formikProps}
                    formikKey="email"
                    placeholder="johndoe@example.com"
                  />
                  <FormInput
                    label={I18n.t('signUp.phoneNumber')}
                    formikProps={formikProps}
                    formikKey="phonenumber"
                    placeholder="123-456-7890"
                  />
                  <FormInput
                    label={I18n.t('signUp.password')}
                    formikProps={formikProps}
                    formikKey="password"
                    placeholder="Password Here"
                    secureTextEntry
                  />
                  <FormInput
                    label={I18n.t('signUp.password2')}
                    formikProps={formikProps}
                    formikKey="password2"
                    placeholder="Password Here"
                    secureTextEntry
                  />
                  <FormInput
                    label={I18n.t('signUp.organization')}
                    formikProps={formikProps}
                    formikKey="organization"
                    placeholder="Puente"
                  />
                  <Button mode="text" theme={theme} color="#3E81FD" style={styles.serviceButton} onPress={() => setVisible(true)}>{I18n.t('signUp.termsOfService.view')}</Button>
                  <View style={styles.container}>
                    <Text style={styles.serviceText}>
                      {I18n.t('signUp.termsOfService.acknoledgement')}
                    </Text>
                    <View style={styles.checkbox}>
                      <Checkbox
                        disabled={false}
                        color={theme.colors.primary}
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked(!checked);
                        }}
                      />
                    </View>
                  </View>
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator />
                  ) : (
                      <Button mode="contained" theme={theme} style={styles.submitButton} onPress={formikProps.handleSubmit}>{I18n.t('signUp.submit')}</Button>
                    )}

                  <TermsModal visible={visible} setVisible={setVisible} />
                </>
              )}
            </Formik>
          </SafeAreaView>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    flex: 1,
    borderRadius: 5,
    marginLeft: 20,
    backgroundColor: 'white'
  },
  container: {
    flexDirection: 'row',
    marginLeft: 90,
    marginRight: 90,
    marginBottom: 5
  },
  serviceText: {
    flex: 5,
    fontSize: 10
  },
  submitButton: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 60,
  },
  serviceButton: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.colors.accent,
    marginBottom: 35
  },
  loginText: {
    fontSize: 15,
    marginTop: 'auto',
    marginBottom: 'auto'

  },
});
