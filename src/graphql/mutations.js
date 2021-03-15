/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createForm = /* GraphQL */ `
  mutation CreateForm(
    $input: CreateFormInput!
    $condition: ModelFormConditionInput
  ) {
    createForm(input: $input, condition: $condition) {
      id
      name
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
      isTopLevel
      isArray
      businessIntelligence
      userId
      lenderId
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
      ArrayForm {
        items {
          id
          FormID
          ArrayFormID
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
      isTopLevel
      isArray
      businessIntelligence
      userId
      lenderId
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
      ArrayForm {
        items {
          id
          FormID
          ArrayFormID
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
      isTopLevel
      isArray
      businessIntelligence
      userId
      lenderId
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
      ArrayForm {
        items {
          id
          FormID
          ArrayFormID
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
      businessIntelligence
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
      businessIntelligence
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
      businessIntelligence
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
          nextToken
        }
        createdAt
        updatedAt
      }
      Field {
        id
        name
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
        businessIntelligence
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
          nextToken
        }
        createdAt
        updatedAt
      }
      Field {
        id
        name
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
        businessIntelligence
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
          nextToken
        }
        createdAt
        updatedAt
      }
      Field {
        id
        name
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
        businessIntelligence
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
          nextToken
        }
        createdAt
        updatedAt
      }
      Subform {
        id
        name
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
          nextToken
        }
        createdAt
        updatedAt
      }
      Subform {
        id
        name
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
          nextToken
        }
        createdAt
        updatedAt
      }
      Subform {
        id
        name
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
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
export const createArrayFormJoin = /* GraphQL */ `
  mutation CreateArrayFormJoin(
    $input: CreateArrayFormJoinInput!
    $condition: ModelArrayFormJoinConditionInput
  ) {
    createArrayFormJoin(input: $input, condition: $condition) {
      id
      FormID
      ArrayFormID
      order
      Form {
        id
        name
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
          nextToken
        }
        createdAt
        updatedAt
      }
      ArrayForm {
        id
        name
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
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
export const updateArrayFormJoin = /* GraphQL */ `
  mutation UpdateArrayFormJoin(
    $input: UpdateArrayFormJoinInput!
    $condition: ModelArrayFormJoinConditionInput
  ) {
    updateArrayFormJoin(input: $input, condition: $condition) {
      id
      FormID
      ArrayFormID
      order
      Form {
        id
        name
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
          nextToken
        }
        createdAt
        updatedAt
      }
      ArrayForm {
        id
        name
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
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
export const deleteArrayFormJoin = /* GraphQL */ `
  mutation DeleteArrayFormJoin(
    $input: DeleteArrayFormJoinInput!
    $condition: ModelArrayFormJoinConditionInput
  ) {
    deleteArrayFormJoin(input: $input, condition: $condition) {
      id
      FormID
      ArrayFormID
      order
      Form {
        id
        name
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
          nextToken
        }
        createdAt
        updatedAt
      }
      ArrayForm {
        id
        name
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
        isTopLevel
        isArray
        businessIntelligence
        userId
        lenderId
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        ArrayForm {
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
