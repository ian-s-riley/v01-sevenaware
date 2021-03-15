/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getForm = /* GraphQL */ `
  query GetForm($id: ID!) {
    getForm(id: $id) {
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
export const listForms = /* GraphQL */ `
  query ListForms(
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getField = /* GraphQL */ `
  query GetField($id: ID!) {
    getField(id: $id) {
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
export const listFields = /* GraphQL */ `
  query ListFields(
    $filter: ModelFieldFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFields(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getFieldFormJoin = /* GraphQL */ `
  query GetFieldFormJoin($id: ID!) {
    getFieldFormJoin(id: $id) {
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
export const listFieldFormJoins = /* GraphQL */ `
  query ListFieldFormJoins(
    $filter: ModelFieldFormJoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFieldFormJoins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSubformFormJoin = /* GraphQL */ `
  query GetSubformFormJoin($id: ID!) {
    getSubformFormJoin(id: $id) {
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
export const listSubformFormJoins = /* GraphQL */ `
  query ListSubformFormJoins(
    $filter: ModelSubformFormJoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubformFormJoins(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getArrayFormJoin = /* GraphQL */ `
  query GetArrayFormJoin($id: ID!) {
    getArrayFormJoin(id: $id) {
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
export const listArrayFormJoins = /* GraphQL */ `
  query ListArrayFormJoins(
    $filter: ModelArrayFormJoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArrayFormJoins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const formsByLenderId = /* GraphQL */ `
  query FormsByLenderId(
    $lenderId: String
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    formsByLenderId(
      lenderId: $lenderId
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const fieldsByLenderId = /* GraphQL */ `
  query FieldsByLenderId(
    $lenderId: String
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFieldFilterInput
    $limit: Int
    $nextToken: String
  ) {
    fieldsByLenderId(
      lenderId: $lenderId
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const fieldsByForm = /* GraphQL */ `
  query FieldsByForm(
    $FormID: ID
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFieldFormJoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    fieldsByForm(
      FormID: $FormID
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const formsByForm = /* GraphQL */ `
  query FormsByForm(
    $FormID: ID
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubformFormJoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    formsByForm(
      FormID: $FormID
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
