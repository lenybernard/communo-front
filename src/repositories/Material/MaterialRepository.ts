import {gql} from "@apollo/client";

export const findMaterials = gql`
query GetMaterials($page: Int) {
    materials(page: $page) {
        collection {
            _id
            name
            model
            brand
            reference
            images {
                edges {
                    node {
                        _id
                        imageName
                        imageSize
                    }
                }
            }
        }
        paginationInfo {
            itemsPerPage
            lastPage
            totalCount
        }
    }
}
`;

export const findMaterialById = gql`
  query GetMaterial($id: ID!) {
    material(id: $id) {
      id
      name
      model
      brand
      reference
      owner {
        _id
        firstname
        lastname
        email
        phoneNumber
      }
      category {
        id
        name
      }
      images {
        edges {
          node {
            id
            imageName
            imageSize
          }
        }
      }
    }
  }
`