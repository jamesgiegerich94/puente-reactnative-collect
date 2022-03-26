import { Formik } from 'formik';
import _, { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  View
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ActivityIndicator, Text } from 'react-native-paper';

import surveyingUserFailsafe from '../../../../../domains/DataCollection/Forms/utils';
import { getData } from '../../../../../modules/async-storage';
import I18n from '../../../../../modules/i18n';
import { updateObject } from '../../../../../services/parse/crud';
import PaperButton from '../../../../Button';
import PaperInputPicker from '../../../../FormikFields/PaperInputPicker';
import configArray from './config/config';

const Demographics = ({
  surveyingOrganization, dob, city, community, province,
  scrollViewScroll, setScrollViewScroll, age, fname, lname,
  nickname, sex, telephonenumber, marriagestatus, occupation,
  educationLevel, subcounty, region, country, location,
  photo, householdId, surveyingUser, setSelectedPerson,
  formId, edit, setEdit
}) => {
  const [inputs, setInputs] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setInputs(configArray.fields);
  }, [setInputs, configArray, setEdit]);

  return (
    <View style={styles.container}>

      { edit && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Formik
            initialValues={{
              communityname: community,
              city,
              province,
              dob,
              age,
              fname,
              lname,
              nickname,
              sex,
              subcounty,
              region,
              country,
              location,
              photoFile: photo,
              householdId,
              telephoneNumber: telephonenumber,
              marriageStatus: marriagestatus,
              occupation,
              educationLevel
            }}
            onSubmit={async (values,) => {
              setSubmitting(true);
              const formObject = values;
              const user = await getData('currentUser');
              formObject.surveyingOrganization = surveyingOrganization || user.organization;
              formObject.surveyingUser = await surveyingUserFailsafe(user, surveyingUser, isEmpty);
              formObject.appVersion = await getData('appVersion') || '';
              // formObject.phoneOS = Platform.OS || '';

              formObject.latitude = values.location?.latitude || 0;
              formObject.longitude = values.location?.longitude || 0;
              formObject.altitude = values.location?.altitude || 0;

              formObject.dob = values.dob;

              formObject.searchIndex = [
                values.fname,
                values.lname,
                values.nickname,
                values.communityname
              ]
                .filter((result) => result)
                .map((result) => result.toLowerCase().trim());

              formObject.fullTextSearchIndex = formObject.searchIndex.join(' ');

              // const valuesToPrune = ['Month', 'Day', 'Year'];
              // valuesToPrune.forEach((value) => {
              //   delete formObject[value];
              // });

              const submitAction = () => {
                setTimeout(() => {
                  // setSelectedForm('');
                  setSubmitting(false);
                }, 1000);
              };
              const postParams = {
                parseClass: 'SurveyData',
                parseClassID: formId,
                localObject: formObject
              };
              updateObject(postParams).then((result) => {
                setSelectedPerson(result);
                // console.log(result);
                submitAction();
              }, () => {
                setSubmitting(false);
              });
              // setSelectPerson(null);
              // setView('Find Records')
              setEdit(false);
            }}
            // only validate on submit, errors persist after fixing
            validateOnBlur={false}
            validateOnChange={false}
          >

            {(formikProps) => (
              <View>
                {inputs.length !== 0 && inputs.map((result) => (
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
                ))}
                {submitting ? (
                  <ActivityIndicator />
                ) : (
                  <PaperButton
                    onPressEvent={formikProps.handleSubmit}
                    buttonText={_.isEmpty(formikProps.values) ? I18n.t('global.emptyForm') : I18n.t('demographics.updateForm')}
                    icon={_.isEmpty(formikProps.values) ? 'alert-octagon' : 'plus'}
                    style={{ backgroundColor: _.isEmpty(formikProps.values) ? 'red' : 'green' }}
                  />
                )}
              </View>
            )}

          </Formik>
        </TouchableWithoutFeedback>
      )}
      { !edit && (
        <View style={styles.container}>
          <Text style={styles.topLabel}>
            {I18n.t('findResident.residentPage.demographics.dob')}
            {` ${dob}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.age')}
            {` ${age}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.sex')}
            {` ${sex}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.telephone')}
            {` ${telephonenumber}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.marriageStatus')}
            {` ${marriagestatus}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.occupation')}
            {` ${occupation}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.educationLevel')}
            {` ${educationLevel}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.community')}
            {` ${community}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.subcounty')}
            {` ${subcounty}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.city')}
            {` ${city}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.province')}
            {` ${province}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.region')}
            {` ${region}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.country')}
            {` ${country}`}
          </Text>
          <Text style={styles.labels}>
            {I18n.t('findResident.residentPage.demographics.location')}
            {` ${location.latitude}, ${location.longitude}`}
          </Text>
        </View>
      )}
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
