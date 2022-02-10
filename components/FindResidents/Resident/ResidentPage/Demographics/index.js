import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  View
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PaperInputPicker from '../../../../FormikFields/PaperInputPicker';
import configArray from './config/config';

const Demographics = ({
  surveyingOrganization, dob, city, community, province,
  scrollViewScroll, setScrollViewScroll
}) => {
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    setInputs(configArray.fields);
  }, [inputs]);

  return (
    <View style={styles.container}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          initialValues={{  }}
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
              ))}
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
