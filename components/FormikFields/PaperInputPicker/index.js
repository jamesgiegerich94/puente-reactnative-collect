import * as React from 'react';
import {
  View, Text
} from 'react-native';
import {
  TextInput, Button, Title
} from 'react-native-paper';

import AutoFill from './AutoFill';
import HouseholdManager from './HouseholdManager';

import getLocation from '../../../modules/geolocation';
import { theme, layout } from '../../../modules/theme';

const PaperInputPicker = ({
  data, formikProps, scrollViewScroll, setScrollViewScroll, ...rest
}) => {
  const { label, formikKey, fieldType } = data;
  const {
    handleChange, handleBlur, touched, errors, setFieldValue
  } = formikProps;

  const [location, setLocation] = React.useState();

  const handleLocation = async () => {
    const currentLocation = await getLocation();
    const { latitude, longitude, altitude } = currentLocation.coords;

    setFieldValue('altitude', altitude);

    if (formikKey === 'longitude') {
      setLocation(longitude);
      setFieldValue(formikKey, longitude);
      return longitude;
    }

    if (formikKey === 'latitude') {
      setLocation(latitude);
      setFieldValue(formikKey, latitude);
      return latitude;
    }

    return null;
  };

  return (
    <>
      {fieldType === 'input' && (
        <View>
          <TextInput
            label={label}
            onChangeText={handleChange(formikKey)}
            onBlur={handleBlur(formikKey)}
            {...rest} //eslint-disable-line
            mode="outlined"
            theme={{ colors: { placeholder: theme.colors.accent }, text: 'black' }}
          />
          <Text style={{ color: 'red' }}>
            {touched[formikKey] && errors[formikKey]}
          </Text>
        </View>
      )}
      {fieldType === 'select' && (
        <View>
          <Title>{label}</Title>
          <View style={layout.buttonGroupContainer}>
            {data.options.map((result) => (
              <Button
                style={layout.buttonGroupButtonStyle}
                key={result}
                mode="outlined"
                onPress={() => setFieldValue(formikKey, result)}
              >
                <Text style={{ color: theme.colors.accent }}>{result}</Text>
              </Button>
            ))}
          </View>
        </View>
      )}
      {fieldType === 'autofill' && (
        <View>
          <AutoFill
            parameter={data.parameter}
            formikProps={formikProps}
            formikKey={formikKey}
            scrollViewScroll={scrollViewScroll}
            setScrollViewScroll={setScrollViewScroll}
          />
        </View>
      )}
      {fieldType === 'geolocation' && (
        <View>
          <Button mode="contained" onPress={() => handleLocation()}>
            <Text>{location}</Text>
          </Button>
        </View>
      )}
      {fieldType === 'household' && (
        <View>
          <HouseholdManager
            formikProps={formikProps}
            formikKey={formikKey}
          />
        </View>
      )}
    </>
  );
};

export default PaperInputPicker;
