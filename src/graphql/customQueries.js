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
            code
            id
            name
            order
            fieldType
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