const configArray = {
  fields: [
    {
      label: 'identificationForm.dob.label',
      formikKey: 'dob',
      value: '',
      fieldType: 'multiInputRowNum',
      options: [
        {
          label: 'identificationForm.dob.day',
          value: 'Day',
          maxLength: 2
        },
        {
          label: 'identificationForm.dob.month',
          value: 'Month',
          maxLength: 2
        },
        {
          label: 'identificationForm.dob.year',
          value: 'Year',
          maxLength: 4
        }
      ],
      validation: false
    },
    // {
    //   label: 'identificationForm.age',
    //   formikKey: 'age',
    //   value: '',
    //   fieldType: 'numberInput',
    //   validation: false
    // },
    // {
    //   label: 'identificationForm.location',
    //   fieldType: 'header',
    //   formikKey: 'none_location',
    //   validation: false
    // },
    {
      label: 'global.city',
      formikKey: 'city',
      value: '',
      fieldType: 'autofill',
      parameter: 'City',
      validation: false
    },
    {
      label: 'global.commName',
      formikKey: 'communityname',
      value: '',
      fieldType: 'autofill',
      parameter: 'Communities',
      validation: false
    },
    {
      label: 'identificationForm.province',
      formikKey: 'province',
      value: '',
      fieldType: 'autofill',
      parameter: 'Province',
      validation: false
    }
  ]
};

export default configArray;
