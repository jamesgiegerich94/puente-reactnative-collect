import { Formik } from 'formik';
import { getData } from '../../../../../modules/async-storage';
import surveyingUserFailsafe from '../../../../../domains/DataCollection/Forms/utils';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import I18n from '../../../../../modules/i18n';
import {
  Keyboard,
  StyleSheet,
  View
} from 'react-native';
import PaperButton from '../../../../../components/Button';
import { isEmpty } from 'lodash';
import yupValidationPicker from '../../../../FormikFields/YupValidation';
import { postIdentificationForm } from '../../../../../modules/cached-resources';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PaperInputPicker from '../../../../FormikFields/PaperInputPicker';
import configArray from './config/config';
import { ActivityIndicator } from 'react-native-paper';
import { region } from 'expo-localization';

const Demographics = ({
  surveyingOrganization, dob, city, community, province,
  scrollViewScroll, setScrollViewScroll, age, fname, lname,
  nickname, sex, telephonenumber, marriagestatus, occupation,
  educationLevel, subcounty, region, country, location,
  photo, householdId // setSelectedForm, setSurveyee, surveyingUser
}) => {

  useEffect(() => {
    // setValidationSchema(yupValidationPicker(configArray));
  }, []);

  const [inputs, setInputs] = useState([]);
  const dateOfBirth = dob?.split('/', 3) || ''; 
  const [submitting, setSubmitting] = useState(false);
  const [validationSchema, setValidationSchema] = useState();
  const [submissionError, setSubmissionError] = useState(false);

  useEffect(() => {
    setInputs(configArray.fields);
    // setValidationSchema(yupValidationPicker(configArray));
  }, [setInputs, configArray]);

  return (
    <View style={styles.container}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          initialValues={{
                          communityname: community, 
                          city: city,
                          province: province,
                          dob: dateOfBirth,
                          age: age,
                          fname: fname,
                          lname: lname,
                          nickname: nickname,
                          sex: sex,
                          subcounty: subcounty,
                          region: region,
                          country: country,
                          location: location,
                          photoFile: photo,
                          householdId: householdId,
                          telephoneNumber: telephonenumber,
                          marriageStatus: marriagestatus,
                          occupation: occupation,
                          educationLevel: educationLevel
                        }}
                        onSubmit={async (values,) => {
                          setSubmitting(true);
              
                          const formObject = values;
                          const user = await getData('currentUser');
                          console.log(formObject);
                          formObject.surveyingOrganization = surveyingOrganization || user.organization;
                          formObject.surveyingUser = await surveyingUserFailsafe(user, surveyingUser, isEmpty);
                          // formObject.appVersion = await getData('appVersion') || '';
                          // formObject.phoneOS = Platform.OS || '';
              
                          // formObject.latitude = values.location?.latitude || 0;
                          // formObject.longitude = values.location?.longitude || 0;
                          // formObject.altitude = values.location?.altitude || 0;
              
                          formObject.dob = `${values.Month || '00'}/${values.Day || '00'}/${values.Year || '0000'}`;
              
                          // formObject.searchIndex = [
                          //   values.fname,
                          //   values.lname,
                          //   // values.nickname,
                          //   values.communityname
                          // ]
                          //   .filter((result) => result)
                          //   .map((result) => result.toLowerCase().trim());
              
                          // formObject.fullTextSearchIndex = formObject.searchIndex.join(' ');
              
                          const valuesToPrune = ['Month', 'Day', 'Year'];
                          valuesToPrune.forEach((value) => {
                            delete formObject[value];
                          });
              
                          const submitAction = () => {
                            setTimeout(() => {
                              setSelectedForm('');
                              setSubmitting(false);
                            }, 1000);
                          };
                          const postParams = {
                            parseClass: 'SurveyData',
                            parseUser: user.objectId,
                            localObject: formObject
                          };
                          postIdentificationForm(postParams).then((surveyee) => {
                            setSurveyee(surveyee);
                            submitAction();
                          }, () => {
                            // perhaps an alert to let the user know there was an error
                            setSubmitting(false);
                            setSubmissionError(true);
                          });
                        }}
          validationSchema={validationSchema}
          // only validate on submit, errors persist after fixing
          validateOnBlur={false}
          validateOnChange={false}
        >
          {(formikProps) => (
            <View>
              {inputs.length != 0 && inputs.map((result) => (
                <View key={result.formikKey}>
                  <PaperInputPicker
                    data={result}
                    formikProps={formikProps}
                    surveyingOrganization={surveyingOrganization}
                    scrollViewScroll={scrollViewScroll}
                    setScrollViewScroll={setScrollViewScroll}
                    customForm={false}
                  />
                </View>
              )
              )}
            {submitting ? (
                <ActivityIndicator />
              ) : (
                <PaperButton
                  onPressEvent={formikProps.handleSubmit}
                  buttonText={_.isEmpty(formikProps.values) ? I18n.t('global.emptyForm') : I18n.t('assetForms.createAsset')}
                  icon={_.isEmpty(formikProps.values) ? 'alert-octagon' : 'plus'}
                  style={{ backgroundColor: _.isEmpty(formikProps.values) ? 'red' : 'green' }}
                />
              )}  
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  labels: {
    marginTop: 20,
    fontSize: 17,
    color: '#696969'
  },
  topLabel: {
    fontSize: 17,
    color: '#696969'
  }
});

export default Demographics;