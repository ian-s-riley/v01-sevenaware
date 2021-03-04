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
            }
            id
        }
        }
      Subform {
        items {
            Subform {
            id
            name
            code
            isComplete
            order
            }
            id
        }
        }
      createdAt
      updatedAt
    }
  }
`;