export default {
    namespaced: true,
    state: {
        boutiques: [],
        // boutiques: [{
        //         id: 'buena-vista',
        //         nombre: 'Buena Vista',
        //         logo: require('@/assets/boutiques/boutique3.png'),
        //         categorias: [{

        //                 id: 'camisa',
        //                 nombre: 'Camisas',
        //                 tallas: ['CH', 'MD', 'GR', 'XL'],

        //             },
        //             {

        //                 id: 'pantalon',
        //                 nombre: 'Pantalones',
        //                 tallas: ['CH', 'MD', 'GR', 'XL'],

        //             }
        //         ]
        //     },
        //     {
        //         id: 'lucero',
        //         nombre: 'Lucero',
        //         logo: require('@/assets/boutiques/boutique4.jpg'),
        //         categorias: [{

        //                 id: 'camisa',
        //                 nombre: 'Camisas',
        //                 tallas: ['CH', 'MD', 'GR', 'XL'],

        //             },
        //             {

        //                 id: 'pantalon',
        //                 nombre: 'Pantalones',
        //                 tallas: ['CH', 'MD', 'GR', 'XL'],

        //             }
        //         ]
        //     },
        //     {
        //         id: 'gran-muralla',
        //         nombre: 'Gran Muralla',
        //         logo: require('@/assets/boutiques/boutique5.jpg'),
        //         categorias: [{

        //                 id: 'camisa',
        //                 nombre: 'Camisas',
        //                 tallas: ['CH', 'MD', 'GR', 'XL'],
        //             },
        //             {

        //                 id: 'pantalon',
        //                 nombre: 'Pantalones',
        //                 tallas: ['CH', 'MD', 'GR', 'XL'],

        //             }
        //         ]
        //     },
        //     {
        //         id: 'karolina-gm',
        //         nombre: 'Karolina GM',
        //         logo: require('@/assets/boutiques/boutique6.jpg'),
        //         categorias: [{

        //                 id: 'camisa',
        //                 nombre: 'Camisas',
        //                 tallas: ['CH', 'MD', 'GR', 'XL'],

        //             },
        //             {

        //                 id: 'pantalon',
        //                 nombre: 'Pantalones',
        //                 tallas: ['CH', 'MD', 'GR', 'XL'],

        //             }
        //         ]
        //     },
        // ]
    },
    mutations: {
        rellenarBoutiques(state, payload) {
            state.boutiques = payload
        }
    }
}