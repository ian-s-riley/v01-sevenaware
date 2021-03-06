/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getForm = /* GraphQL */ `
  query GetForm($id: ID!) {
    getForm(id: $id) {
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
      businessIntelligence
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
        businessIntelligence
        Field {
          nextToken
        }
        Subform {
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
        businessIntelligence
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
          businessIntelligence
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
        businessIntelligence
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
        businessIntelligence
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
          businessIntelligence
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
export const byParentFormId = /* GraphQL */ `
  query ByParentFormId(
    $parentFormId: String
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byParentFormId(
      parentFormId: $parentFormId
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        businessIntelligence
        Field {
          nextToken
        }
        Subform {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byFormId = /* GraphQL */ `
  query ByFormId(
    $parentFormId: String
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFieldFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byFormId(
      parentFormId: $parentFormId
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
