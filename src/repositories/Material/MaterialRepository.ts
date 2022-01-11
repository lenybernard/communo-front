import {gql} from "@apollo/client";

export const findMaterials = gql`
query GetMaterials($page: Int, $searchTerms: String) {
    materials(page: $page, name: $searchTerms, order: [{createdAt: "DESC"}, {name: "ASC"}]) {
        collection {
            _id
            name
            model
            brand
            reference
            createdAt
            updatedAt
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