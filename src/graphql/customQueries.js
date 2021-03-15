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



export const listArrayFormsAndFields = /* GraphQL */ `
  query ListArrayFormJoins(
    $filter: ModelArrayFormJoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArrayFormJoins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        ArrayFormID
        id
        order
        FormID
        ArrayForm {
          Field {
            items {
              Field {
                id
                name
                fieldType
                defaultValue
                description
                helpText
                dox
                code
                image
                label
                lenderId
                options
                ref
                size
                userId
                value
              }
              order
              id
            }
          }
        }
      }
      nextToken
    }
  }
`;