interface FileInfo {
  type: string;
  tag: string;
}

interface FileType {
  [name: string]: FileInfo;
}

const fileTypes: FileType = {
  jpg: {
    type: 'image/jpg',
    tag: 'img'
  },
  jpeg: {
    type: 'image/jpeg',
    tag: 'img'
  },
  png: {
    type: 'image/png',
    tag: 'img'
  },
  pdf: {
    type: 'pdf',
    tag: 'pdf'
  }
};

export { fileTypes, FileInfo };
