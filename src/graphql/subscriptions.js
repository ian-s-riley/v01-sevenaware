/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateForm = /* GraphQL */ `
  subscription OnCreateForm {
    onCreateForm {
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
export const onUpdateForm = /* GraphQL */ `
  subscription OnUpdateForm {
    onUpdateForm {
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
export const onDeleteForm = /* GraphQL */ `
  subscription OnDeleteForm {
    onDeleteForm {
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
export const onCreateField = /* GraphQL */ `
  subscription OnCreateField {
    onCreateField {
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
export const onUpdateField = /* GraphQL */ `
  subscription OnUpdateField {
    onUpdateField {
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
export const onDeleteField = /* GraphQL */ `
  subscription OnDeleteField {
    onDeleteField {
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
export const onCreateArrayFormJoin = /* GraphQL */ `
  subscription OnCreateArrayFormJoin {
    onCreateArrayFormJoin {
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
export const onUpdateArrayFormJoin = /* GraphQL */ `
  subscription OnUpdateArrayFormJoin {
    onUpdateArrayFormJoin {
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
export const onDeleteArrayFormJoin = /* GraphQL */ `
  subscription OnDeleteArrayFormJoin {
    onDeleteArrayFormJoin {
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
