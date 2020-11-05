const configArray = {
  class: 'EvaluationMedical',
  name: 'evaluationMedical.name',
  customForm: false,
  fields: [
    {
      label: 'evaluationMedical.chronicHypertension',
      formikKey: 'chronic_condition_hypertension',
      value: '',
      fieldType: 'select',
      options: [
        {
          label: 'global.yes',
          value: 'Yes'
        },
        {
          label: 'global.no',
          value: 'No'
        }
      ],
      validation: true
    },
    {
      label: 'evaluationMedical.chronicDiabetes',
      formikKey: 'chronic_condition_diabetes',
      value: '',
      fieldType: 'select',
      options: [
        {
          label: 'global.yes',
          value: 'Yes'
        },
        {
          label: 'global.no',
          value: 'No'
        }
      ],
      validation: true
    },
    {
      label: 'evaluationMedical.chronicOther',
      formikKey: 'chronic_condition_other',
      value: '',
      fieldType: 'select',
      options: [
        {
          label: 'global.yes',
          value: 'Yes'
        },
        {
          label: 'global.no',
          value: 'No'
        }
      ],
      validation: true
    },
    {
      label: 'evaluationMedical.doctor',
      formikKey: 'seen_doctor',
      value: '',
      fieldType: 'select',
      options: [
        {
          label: 'global.yes',
          value: 'Yes'
        },
        {
          label: 'global.no',
          value: 'No'
        }
      ],
      validation: true
    },
    {
      label: 'global.notes',
      formikKey: 'received_treatment_notes',
      value: '',
      fieldType: 'input',
      validation: true
    },
    {
      label: 'evaluationMedical.statusOfHealth.label',
      formikKey: 'received_treatment_description',
      value: '',
      fieldType: 'select',
      options: [
        {
          label: 'evaluationMedical.statusOfHealth.receivingNoSupport',
          value: 'receiving_treatment_no_support_required'
        },
        {
          label: 'evaluationMedical.statusOfHealth.receivingSupport',
          value: 'receiving_treatment_support_required'
        },
        {
          label: 'evaluationMedical.statusOfHealth.awaitingNoSupport',
          value: 'awaiting_treatment_support_required'
        },
        {
          label: 'evaluationMedical.statusOfHealth.noTreatmentSupport',
          value: 'no_treatment_support_required'
        },
        {
          label: 'global.other',
          value: 'other'
        }
      ],
      validation: true
    },
    {
      label: 'evaluationMedical.partOfBody.label',
      formikKey: 'part_of_body',
      value: '',
      fieldType: 'select',
      options: [
        {
          label: 'evaluationMedical.partOfBody.bonesJoints',
          value: 'bones_or_joints'
        },
        {
          label: 'evaluationMedical.partOfBody.eyes',
          value: 'eyes'
        },
        {
          label: 'evaluationMedical.partOfBody.earsNoseThroat',
          value: 'ear_nose_throat'
        },
        {
          label: 'evaluationMedical.partOfBody.skin',
          value: 'skin'
        },
        {
          label: 'evaluationMedical.partOfBody.headMental',
          value: 'head_mental_issue'
        },
        {
          label: 'evaluationMedical.partOfBody.stomachIntestines',
          value: 'stomach_intestines'
        },
        {
          label: 'evaluationMedical.partOfBody.bladderUrinary',
          value: 'bladder_urinary'
        },
        {
          label: 'evaluationMedical.partOfBody.reproductiveOrgans',
          value: 'reproductive_organs'
        },
        {
          label: 'evaluationMedical.partOfBody.nutritionIssues',
          value: 'nutrition'
        },
        {
          label: 'evaluationMedical.partOfBody.---',
          value: ''
        }
      ],
      validation: true
    },
    {
      label: 'evaluationMedical.partOfBodyDescription',
      formikKey: 'part_of_body_description',
      value: '',
      fieldType: 'input',
      validation: true
    },
    {
      label: 'evaluationMedical.duration.label',
      formikKey: 'duration',
      value: '',
      fieldType: 'select',
      options: [
        {
          label: 'evaluationMedical.duration.lastMonth',
          value: 'within_last_month'
        },
        {
          label: 'evaluationMedical.duration.lastYear',
          value: 'within_last_year'
        },
        {
          label: 'evaluationMedical.duration.last5Years',
          value: 'within_last_5_years'
        },
        {
          label: 'evaluationMedical.duration.past5Years',
          value: 'after_5_years'
        }
      ],
      validation: true
    },
    {
      label: 'evaluationMedical.problemSuddenness.label',
      formikKey: 'trauma_induced',
      value: '',
      fieldType: 'select',
      options: [
        {
          label: 'evaluationMedical.problemSuddenness.suddenTrauma',
          value: 'suddenly_due_to_trauma'
        },
        {
          label: 'evaluationMedical.problemSuddenness.suddenNoTrauma',
          value: 'suddenly_but_not_due_to_trauma'
        },
        {
          label: 'evaluationMedical.problemSuddenness.gradually',
          value: 'gradually'
        }
      ],
      validation: true
    },
    {
      label: 'evaluationMedical.progressionOfCondition.label',
      formikKey: 'condition_progression',
      value: '',
      fieldType: 'select',
      options: [
        {
          label: 'evaluationMedical.progressionOfCondition.improving',
          value: 'improve'
        },
        {
          label: 'evaluationMedical.progressionOfCondition.worsening',
          value: 'worsen'
        },
        {
          label: 'evaluationMedical.progressionOfCondition.constant',
          value: 'constant'
        }
      ],
      validation: true
    },
    {
      label: 'global.notes',
      formikKey: 'notes',
      value: '',
      fieldType: 'input',
      validation: true
    },
    {
      label: 'evaluationMedical.generalHealthConsult',
      formikKey: 'AssessmentandEvaluation',
      value: '',
      fieldType: 'select',
      options: [
        {
          label: 'global.yes',
          value: 'Yes'
        },
        {
          label: 'global.no',
          value: 'No'
        }
      ],
      validation: true
    },
    {
      label: 'evaluationMedical.surgicalRequired',
      formikKey: 'AssessmentandEvaluation_Surgical',
      value: '',
      fieldType: 'select',
      options: [
        {
          label: 'global.yes',
          value: 'Yes'
        },
        {
          label: 'global.no',
          value: 'No'
        }
      ],
      validation: true
    },
    {
      label: 'evaluationMedical.yourGuess',
      formikKey: 'AssessmentandEvaluation_Surgical_Guess',
      value: '',
      fieldType: 'input',
      validation: true
    },
    {
      label: 'evaluationMedical.immediateFollowupRequired',
      formikKey: 'immediate_follow_up',
      value: '',
      fieldType: 'select',
      options: [
        {
          label: 'global.yes',
          value: 'Yes'
        },
        {
          label: 'global.no',
          value: 'No'
        }
      ],
      validation: true
    },
    {
      label: 'evaluationMedical.plan',
      formikKey: 'planOfAction',
      value: '',
      fieldType: 'input',
      validation: true
    },
  ]
};

export default configArray;
