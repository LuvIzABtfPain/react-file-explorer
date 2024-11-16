const folderStructureData = {
    id: '1',
    name: 'root',
    isFolder: true,
    items: [
        {
            id: '2',
            name: 'index.html',
            isFolder: false,
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
                        },
                        {
                            id: '7',
                            name: 'utils.js',
                            isFolder: false,
                        },
                    ],
                },
                {
                    id: '8',
                    name: 'app.css',
                    isFolder: false,
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
