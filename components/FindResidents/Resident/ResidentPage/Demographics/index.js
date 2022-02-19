import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import I18n from '../../../../../modules/i18n';
import {
  Keyboard,
  StyleSheet,
  View
} from 'react-native';
import PaperButton from '../../../../../components/Button';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PaperInputPicker from '../../../../FormikFields/PaperInputPicker';
import configArray from './config/config';

const Demographics = ({
  surveyingOrganization, dob, city, community, province,
  scrollViewScroll, setScrollViewScroll
}) => {
  const [inputs, setInputs] = useState([]);
  const dateOfBirth = _.isEmpty(dob)? '': dob.split('/', 3); 
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setInputs(configArray.fields);
    // console.log(inputs)
  }, []);

  return (
    <View style={styles.container}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          initialValues={{communityname: community, 
                          city: city,
                          province: province,
                          dob: dateOfBirth
                        }}
          onSubmit={() => {
            console.log('submitting');
          }}
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