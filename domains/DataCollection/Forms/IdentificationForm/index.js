import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { Formik } from 'formik';

import { postIdentificationForm } from '../../../../modules/cached-resources';
import { isEmpty } from '../../../../modules/utils';
import { layout, theme } from '../../../../modules/theme';
import I18n from '../../../../modules/i18n';

import PaperButton from '../../../../components/Button';
import PaperInputPicker from '../../../../components/FormikFields/PaperInputPicker';
import yupValidationPicker from '../../../../components/FormikFields/YupValidation';
import ErrorPicker from '../../../../components/FormikFields/ErrorPicker';
import backgroundPostPatient from './utils';
import surveyingUserFailsafe from '../utils';

import configArray from './config/config';

const IdentificationForm = ({
  scrollViewScroll, setScrollViewScroll,
  setSelectedForm, setSurveyee, surveyingUser, surveyingOrganization
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      backgroundPostPatient();
    }, 10000);

    setValidationSchema(yupValidationPicker(configArray));

    return () => {
      clearInterval(interval);
    };
  }, [clearInterval]);

  const [inputs, setInputs] = useState({});
  const [photoFile, setPhotoFile] = useState('State Photo String');
  const [validationSchema, setValidationSchema] = useState();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setInputs(configArray);
  }, [setInputs, configArray]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()} accessible={false}>
        <Formik
          initialValues={{}}
          onSubmit={async (values) => {
            setSubmitting(true);
            setPhotoFile('Submitted Photo String');

            const formObject = values;
            formObject.surveyingOrganization = surveyingOrganization;
            formObject.surveyingUser = await surveyingUserFailsafe(surveyingUser, isEmpty);

            formObject.latitude = values.location?.latitude || 0;
            formObject.longitude = values.location?.longitude || 0;
            formObject.altitude = values.location?.altitude || 0;

            formObject.dob = `${values.Month || '00'}/${values.Day || '00'}/${values.Year || '0000'}`;

            let photo = values.picture

            const valuesToPrune = ['Month', 'Day', 'Year', 'location', 'photo'];
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
              signature: 'Sample Signature',
              photoFile: photo,
              localObject: formObject
            };

            postIdentificationForm(postParams).then((surveyee) => {
              setSurveyee(surveyee);
              submitAction();
            }, () => {
              // perhaps an alert to let the user know there was an error
              setSubmitting(false);
            });
          }}
          validationSchema={validationSchema}
          // only validate on submit, errors persist after fixing
          validateOnBlur={false}
          validateOnChange={false}
        >
          {(formikProps) => (
            <View style={layout.formContainer}>
              {inputs.length && inputs.map((result) => (
                <View key={result.formikKey}>
                  <PaperInputPicker
                    data={result}
                    formikProps={formikProps}
                    surveyingOrganization={surveyingOrganization}
                    scrollViewScroll={scrollViewScroll}
                    setScrollViewScroll={setScrollViewScroll}
                    customForm={false}
                  // placeholder="Ana"
                  />
                </View>
              ))}
              <ErrorPicker
                // data={result}
                formikProps={formikProps}
                inputs={inputs}
              />
              {submitting ? (
                <ActivityIndicator
                  size="large"
                  color={theme.colors.primary}
                />
              ) : (
                  <PaperButton
                    onPressEvent={formikProps.handleSubmit}
                    buttonText={I18n.t('global.submit')}
                  />
                  // <Button icon="human" onPress={formikProps.handleSubmit}>
                  //   <Text>Submit</Text>
                  // </Button>
                )}
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </View >
  );
};

export default IdentificationForm;
