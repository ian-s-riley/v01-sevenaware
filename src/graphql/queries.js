/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getForm = /* GraphQL */ `
  query GetForm($id: ID!) {
    getForm(id: $id) {
      id
      name
      code
      order
      description
      helpCategory
      helpTitle
      helpDescription
      legal
      parentFormId
      isArray
      isComplete
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
        order
        description
        helpCategory
        helpTitle
        helpDescription
        legal
        parentFormId
        isArray
        isComplete
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchForms = /* GraphQL */ `
  query SearchForms(
    $filter: SearchableFormFilterInput
    $sort: SearchableFormSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchForms(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        name
        code
        order
        description
        helpCategory
        helpTitle
        helpDescription
        legal
        parentFormId
        isArray
        isComplete
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchFields = /* GraphQL */ `
  query SearchFields(
    $filter: SearchableFieldFilterInput
    $sort: SearchableFieldSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchFields(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
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
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
