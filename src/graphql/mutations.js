/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createForm = /* GraphQL */ `
  mutation CreateForm(
    $input: CreateFormInput!
    $condition: ModelFormConditionInput
  ) {
    createForm(input: $input, condition: $condition) {
      id
      name
      order
      code
      ref
      image
      description
      helpImage
      helpCategory
      helpTitle
      helpDescription
      legalImage
      legalCategory
      legalTitle
      legalDescription
      dox
      isComplete
      parentFormId
      Field {
        items {
          id
          FormID
          FieldID
          order
          createdAt
          updatedAt
        }
        nextToken
      }
      Subform {
        items {
          id
          FormID
          SubformID
          order
          createdAt
          updatedAt
        }
        nextToken
      }
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
      name
      order
      code
      ref
      image
      description
      helpImage
      helpCategory
      helpTitle
      helpDescription
      legalImage
      legalCategory
      legalTitle
      legalDescription
      dox
      isComplete
      parentFormId
      Field {
        items {
          id
          FormID
          FieldID
          order
          createdAt
          updatedAt
        }
        nextToken
      }
      Subform {
        items {
          id
          FormID
          SubformID
          order
          createdAt
          updatedAt
        }
        nextToken
      }
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
      name
      order
      code
      ref
      image
      description
      helpImage
      helpCategory
      helpTitle
      helpDescription
      legalImage
      legalCategory
      legalTitle
      legalDescription
      dox
      isComplete
      parentFormId
      Field {
        items {
          id
          FormID
          FieldID
          order
          createdAt
          updatedAt
        }
        nextToken
      }
      Subform {
        items {
          id
          FormID
          SubformID
          order
          createdAt
          updatedAt
        }
        nextToken
      }
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
      name
      order
      code
      ref
      description
      fieldType
      value
      defaultValue
      options
      userId
      lenderId
      label
      helpText
      image
      dox
      size
      parentFormId
      Form {
        items {
          id
          FormID
          FieldID
          order
          createdAt
          updatedAt
        }
        nextToken
      }
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
      name
      order
      code
      ref
      description
      fieldType
      value
      defaultValue
      options
      userId
      lenderId
      label
      helpText
      image
      dox
      size
      parentFormId
      Form {
        items {
          id
          FormID
          FieldID
          order
          createdAt
          updatedAt
        }
        nextToken
      }
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
      name
      order
      code
      ref
      description
      fieldType
      value
      defaultValue
      options
      userId
      lenderId
      label
      helpText
      image
      dox
      size
      parentFormId
      Form {
        items {
          id
          FormID
          FieldID
          order
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFieldFormJoin = /* GraphQL */ `
  mutation CreateFieldFormJoin(
    $input: CreateFieldFormJoinInput!
    $condition: ModelFieldFormJoinConditionInput
  ) {
    createFieldFormJoin(input: $input, condition: $condition) {
      id
      FormID
      FieldID
      order
      Form {
        id
        name
        order
        code
        ref
        image
        description
        helpImage
        helpCategory
        helpTitle
        helpDescription
        legalImage
        legalCategory
        legalTitle
        legalDescription
        dox
        isComplete
        parentFormId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        createdAt
        updatedAt
      }
      Field {
        id
        name
        order
        code
        ref
        description
        fieldType
        value
        defaultValue
        options
        userId
        lenderId
        label
        helpText
        image
        dox
        size
        parentFormId
        Form {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateFieldFormJoin = /* GraphQL */ `
  mutation UpdateFieldFormJoin(
    $input: UpdateFieldFormJoinInput!
    $condition: ModelFieldFormJoinConditionInput
  ) {
    updateFieldFormJoin(input: $input, condition: $condition) {
      id
      FormID
      FieldID
      order
      Form {
        id
        name
        order
        code
        ref
        image
        description
        helpImage
        helpCategory
        helpTitle
        helpDescription
        legalImage
        legalCategory
        legalTitle
        legalDescription
        dox
        isComplete
        parentFormId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        createdAt
        updatedAt
      }
      Field {
        id
        name
        order
        code
        ref
        description
        fieldType
        value
        defaultValue
        options
        userId
        lenderId
        label
        helpText
        image
        dox
        size
        parentFormId
        Form {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteFieldFormJoin = /* GraphQL */ `
  mutation DeleteFieldFormJoin(
    $input: DeleteFieldFormJoinInput!
    $condition: ModelFieldFormJoinConditionInput
  ) {
    deleteFieldFormJoin(input: $input, condition: $condition) {
      id
      FormID
      FieldID
      order
      Form {
        id
        name
        order
        code
        ref
        image
        description
        helpImage
        helpCategory
        helpTitle
        helpDescription
        legalImage
        legalCategory
        legalTitle
        legalDescription
        dox
        isComplete
        parentFormId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        createdAt
        updatedAt
      }
      Field {
        id
        name
        order
        code
        ref
        description
        fieldType
        value
        defaultValue
        options
        userId
        lenderId
        label
        helpText
        image
        dox
        size
        parentFormId
        Form {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createSubformFormJoin = /* GraphQL */ `
  mutation CreateSubformFormJoin(
    $input: CreateSubformFormJoinInput!
    $condition: ModelSubformFormJoinConditionInput
  ) {
    createSubformFormJoin(input: $input, condition: $condition) {
      id
      FormID
      SubformID
      order
      Form {
        id
        name
        order
        code
        ref
        image
        description
        helpImage
        helpCategory
        helpTitle
        helpDescription
        legalImage
        legalCategory
        legalTitle
        legalDescription
        dox
        isComplete
        parentFormId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        createdAt
        updatedAt
      }
      Subform {
        id
        name
        order
        code
        ref
        image
        description
        helpImage
        helpCategory
        helpTitle
        helpDescription
        legalImage
        legalCategory
        legalTitle
        legalDescription
        dox
        isComplete
        parentFormId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateSubformFormJoin = /* GraphQL */ `
  mutation UpdateSubformFormJoin(
    $input: UpdateSubformFormJoinInput!
    $condition: ModelSubformFormJoinConditionInput
  ) {
    updateSubformFormJoin(input: $input, condition: $condition) {
      id
      FormID
      SubformID
      order
      Form {
        id
        name
        order
        code
        ref
        image
        description
        helpImage
        helpCategory
        helpTitle
        helpDescription
        legalImage
        legalCategory
        legalTitle
        legalDescription
        dox
        isComplete
        parentFormId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        createdAt
        updatedAt
      }
      Subform {
        id
        name
        order
        code
        ref
        image
        description
        helpImage
        helpCategory
        helpTitle
        helpDescription
        legalImage
        legalCategory
        legalTitle
        legalDescription
        dox
        isComplete
        parentFormId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteSubformFormJoin = /* GraphQL */ `
  mutation DeleteSubformFormJoin(
    $input: DeleteSubformFormJoinInput!
    $condition: ModelSubformFormJoinConditionInput
  ) {
    deleteSubformFormJoin(input: $input, condition: $condition) {
      id
      FormID
      SubformID
      order
      Form {
        id
        name
        order
        code
        ref
        image
        description
        helpImage
        helpCategory
        helpTitle
        helpDescription
        legalImage
        legalCategory
        legalTitle
        legalDescription
        dox
        isComplete
        parentFormId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        createdAt
        updatedAt
      }
      Subform {
        id
        name
        order
        code
        ref
        image
        description
        helpImage
        helpCategory
        helpTitle
        helpDescription
        legalImage
        legalCategory
        legalTitle
        legalDescription
        dox
        isComplete
        parentFormId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
