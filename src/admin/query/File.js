import { gql } from "react-apollo";

let createFile = gql`
  mutation createFile($input: CreateFileInput!) {
    createFile(input: $input) {
      changedFile {
        id
        name
        blobUrl
      }
    }
  }
`;

const updateFile = gql`
  mutation updateFile($input: UpdateFileInput!) {
    updateFile(input: $input) {
      changedFile {
        id
        name
        blobUrl
      }
    }
  }
`;

export default {
  createFile: createFile,
  updateFile: updateFile
};
