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
      _id
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
        avatarName
        avatarSize
        city
        roles
        gender
        materials {
          paginationInfo {
            totalCount
          }
          collection {
            _id
            name
          }
        }
        circles {
          edges {
            node {
              _id
              name
              description
              logoName
              logoSize
              city
            }
          }
        }
        averageRatingScore
        ratings {
          totalCount
        }
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
      pricings {
        paginationInfo {
          totalCount
        }
        collection {
          _id
          value
          period
          circles {
            edges {
              node {
                _id
                name
                logoName
              }
            }
          }
        }
      }
      bookings {
        edges {
          node {
            _id
            startDate
            endDate
            status
          }
        }
      }
    }
  }
`