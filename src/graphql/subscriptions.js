/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateForm = /* GraphQL */ `
  subscription OnCreateForm {
    onCreateForm {
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
export const onUpdateForm = /* GraphQL */ `
  subscription OnUpdateForm {
    onUpdateForm {
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
export const onDeleteForm = /* GraphQL */ `
  subscription OnDeleteForm {
    onDeleteForm {
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
export const onCreateField = /* GraphQL */ `
  subscription OnCreateField {
    onCreateField {
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
export const onUpdateField = /* GraphQL */ `
  subscription OnUpdateField {
    onUpdateField {
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
export const onDeleteField = /* GraphQL */ `
  subscription OnDeleteField {
    onDeleteField {
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
export const onCreateFieldFormJoin = /* GraphQL */ `
  subscription OnCreateFieldFormJoin {
    onCreateFieldFormJoin {
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
export const onUpdateFieldFormJoin = /* GraphQL */ `
  subscription OnUpdateFieldFormJoin {
    onUpdateFieldFormJoin {
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
export const onDeleteFieldFormJoin = /* GraphQL */ `
  subscription OnDeleteFieldFormJoin {
    onDeleteFieldFormJoin {
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
export const onCreateSubformFormJoin = /* GraphQL */ `
  subscription OnCreateSubformFormJoin {
    onCreateSubformFormJoin {
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
export const onUpdateSubformFormJoin = /* GraphQL */ `
  subscription OnUpdateSubformFormJoin {
    onUpdateSubformFormJoin {
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
export const onDeleteSubformFormJoin = /* GraphQL */ `
  subscription OnDeleteSubformFormJoin {
    onDeleteSubformFormJoin {
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
