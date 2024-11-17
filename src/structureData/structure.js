const folderStructureData = {
    id: '1',
    name: 'root',
    isFolder: true,
    items: [
        {
            id: '2',
            name: 'core_features.html',
            isFolder: false,
            content: '<p>This is core features: </p>\n' +
                '                            <ul>\n' +
                '                                <li>- Add new folder and files.</li>\n' +
                '                                <li>- Add subfolder.</li>\n' +
                '                                <li>- Cant add folder or file with the same name in the same folder.</li>\n' +
                '                                <li>- Dialog for Alert and Form add folder file.</li>\n' +
                '                                <li>- Buttons in the top of folder tree effect on root folder.</li>\n' +
                '                                <li>- Display the content and name of the file.</li>\n' +
                '                                <li>- Highlight file selected.</li>\n' +
                '                                <li>- Responsive layout.</li>\n' +
                '                            </ul>'
        },
        {
            id: '3',
            name: 'app',
            isFolder: true,
            items: [
                {
                    id: '4',
                    name: 'app.js',
                    isFolder: false,
                    content: 'item 4'
                },
                {
                    id: '5',
                    name: 'src',
                    isFolder: true,
                    items: [
                        {
                            id: '6',
                            name: 'main.jsx',
                            isFolder: false,
                            content: 'item 6'
                        },
                        {
                            id: '7',
                            name: 'utils.js',
                            isFolder: false,
                            content: 'item 7'
                        },
                    ],
                },
                {
                    id: '8',
                    name: 'app.css',
                    isFolder: false,
                    content: 'item 8'
                },
            ],
        },
    ],
};


export const findById = (data, id) => {
      if(data.id === id) {
           return data
      }

      if(!data.items) {
          return undefined
      }

      for(const item of data.items) {
          const res = findById(item, id)
          if(res) {
              return res
          }
      }

      return undefined
}

export const deleteById = (data, id) => {
    if(data.items) {
        data.items = data.items.filter(item => item.id !== id)
        for(const item of data.items) {
            deleteById(item, id)
        }
    }
}

export default folderStructureData;
