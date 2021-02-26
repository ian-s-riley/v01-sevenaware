/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createForm = /* GraphQL */ `
  mutation CreateForm(
    $input: CreateFormInput!
    $condition: ModelFormConditionInput
  ) {
    createForm(input: $input, condition: $condition) {
      id
      form
      name
      code
      order
      description
      helpCategory
      helpTitle
      helpDescription
      legal
      parentFormId
      parentForm
      isArray
      isComplete
      createdAt
      updatedAt
    }
  }
`;
export const updateForm = /* GraphQL */ `
  mutation UpdateForm(
    $input: UpdateFormInput!
    $condition: ModelFormConditionInput
  ) {
    updateForm(input: $input, condition: $condition) {
      id
      form
      name
      code
      order
      description
      helpCategory
      helpTitle
      helpDescription
      legal
      parentFormId
      parentForm
      isArray
      isComplete
      createdAt
      updatedAt
    }
  }
`;
export const deleteForm = /* GraphQL */ `
  mutation DeleteForm(
    $input: DeleteFormInput!
    $condition: ModelFormConditionInput
  ) {
    deleteForm(input: $input, condition: $condition) {
      id
      form
      name
      code
      order
      description
      helpCategory
      helpTitle
      helpDescription
      legal
      parentFormId
      parentForm
      isArray
      isComplete
      createdAt
      updatedAt
    }
  }
`;
export const createField = /* GraphQL */ `
  mutation CreateField(
    $input: CreateFieldInput!
    $condition: ModelFieldConditionInput
  ) {
    createField(input: $input, condition: $condition) {
      id
      field
      name
      code
      description
      fieldType
      order
      value
      defaultValue
      options
      userId
      lenderId
      label
      helpText
      image
      formId
      form
      size
      createdAt
      updatedAt
    }
  }
`;
export const updateField = /* GraphQL */ `
  mutation UpdateField(
    $input: UpdateFieldInput!
    $condition: ModelFieldConditionInput
  ) {
    updateField(input: $input, condition: $condition) {
      id
      field
      name
      code
      description
      fieldType
      order
      value
      defaultValue
      options
      userId
      lenderId
      label
      helpText
      image
      formId
      form
      size
      createdAt
      updatedAt
    }
  }
`;
export const deleteField = /* GraphQL */ `
  mutation DeleteField(
    $input: DeleteFieldInput!
    $condition: ModelFieldConditionInput
  ) {
    deleteField(input: $input, condition: $condition) {
      id
      field
      name
      code
      description
      fieldType
      order
      value
      defaultValue
      options
      userId
      lenderId
      label
      helpText
      image
      formId
      form
      size
      createdAt
      updatedAt
    }
  }
`;
