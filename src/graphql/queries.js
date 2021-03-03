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
      isTopLevel
      Field {
        items {
          id
          FormID
          FieldID
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
        isTopLevel
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
      Form {
        items {
          id
          FormID
          FieldID
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
        isTopLevel
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
          isTopLevel
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
        isTopLevel
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
        isTopLevel
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
          isTopLevel
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
          isTopLevel
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
export const sortFormsByName = /* GraphQL */ `
  query SortFormsByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    SortFormsByName(
      name: $name
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
        isTopLevel
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
export const sortFormsByOrder = /* GraphQL */ `
  query SortFormsByOrder(
    $order: Int
    $sortDirection: ModelSortDirection
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    SortFormsByOrder(
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
        isTopLevel
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
export const sortFielsByOrder = /* GraphQL */ `
  query SortFielsByOrder(
    $order: Int
    $sortDirection: ModelSortDirection
    $filter: ModelFieldFilterInput
    $limit: Int
    $nextToken: String
  ) {
    SortFielsByOrder(
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
