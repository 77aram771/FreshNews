export const imagesPaths = {
  backgroundListImage: require('../../assets/images/vegetablesImage.png'),
  appStoreImage: require('../../assets/images/appStore.png'),
  googlePlayImage: require('../../assets/images/googlePlay.png'),
  scriptaItImage: require('../../assets/images/ScriptaIT.png'),
  exitIconImage: require('../../assets/images/Exit.png'),
  shopPageImageHeader: require('../../assets/images/shopPageImageHeader.png'),
  shopPageIcon: require('../../assets/iconImages/shopPageIcon.png'),
  tomatoes: require('../../assets/images/tomatoes.png'),
  cucumber: require('../../assets/images/cucumber.png'),
  onion: require('../../assets/images/onion.png'),
  logo: require('../../assets/images/logo.png'),
  grayLogo: require('../../assets/images/grayLogo.png'),
};

export const categories = [
  {id: 1, title: 'Все'},
  {id: 2, title: 'Овощи'},
  {id: 3, title: 'Фрукты'},
  {id: 4, title: 'Яблоки'},
];

export const data = [
  {
    id: 1,
    logo: 'Лого',
    time: '25',
    name: 'Василий Теркин',
    category: 'Фрукты. овощи. ягоды',
    rating: '5.0',
    reviews: '23,467 отзыва',
  },
  {
    id: 2,
    logo: 'Лого',
    time: '25',
    name: 'Василий Теркин',
    category: 'Фрукты. овощи. ягоды',
    rating: '5.0',
    reviews: '23,467 отзыва',
  },
  {
    id: 3,
    logo: 'Лого',
    time: '25',
    name: 'Василий Теркин',
    category: 'Фрукты. овощи. ягоды',
    rating: '5.0',
    reviews: '23,467 отзыва',
  },
  {
    id: 4,
    logo: 'Лого',
    time: '25',
    name: 'Василий Теркин',
    category: 'Фрукты. овощи. ягоды',
    rating: '5.0',
    reviews: '23,467 отзыва',
  },
  {
    id: 5,
    logo: 'Лого',
    time: '25',
    name: 'Василий Теркин',
    category: 'Фрукты. овощи. ягоды',
    rating: '5.0',
    reviews: '23,467 отзыва',
  },
];

export const shopItems = [
  {
    title: 'Последний заказ',
    data: [
      {name: 'Помидоры «Бакинские»', image: imagesPaths.tomatoes},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.tomatoes},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.tomatoes},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.tomatoes},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.tomatoes},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.tomatoes},
    ],
  },
  {
    title: 'Популярные товары',
    data: [
      {name: 'Помидоры «Бакинские»', image: imagesPaths.cucumber},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.cucumber},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.cucumber},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.cucumber},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.cucumber},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.cucumber},
    ],
  },
  {
    title: 'Овощи',
    data: [
      {name: 'Помидоры «Бакинские»', image: imagesPaths.onion},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.onion},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.onion},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.onion},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.onion},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.onion},
    ],
  },
  {
    title: 'Фрукты',
    data: [
      {name: 'Помидоры «Бакинские»', image: imagesPaths.tomatoes},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.tomatoes},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.tomatoes},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.tomatoes},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.tomatoes},
      {name: 'Помидоры «Бакинские»', image: imagesPaths.tomatoes},
    ],
  },
];

export const basketItems = [
  {id: 1, name: 'Помидоры «Чери»', price: '1560'},
  {id: 2, name: 'Помидоры «Чери» с очень длинными азванием', price: '240'},
  {id: 3, name: 'Помидоры «Чери»', price: '565'},
];

export const assemblyItems = [
  {id: 1, name: 'Помидоры «Чери»', quantity: 14, gram: '856', price: '1560'},
  {id: 2, name: 'Помидоры «Чери» с очень длинными азванием', gram: '1242', quantity: 1, price: '240'},
  {id: 3, name: 'Помидоры «Чери»', quantity: 5, gram: '586', price: '565'},
];

export const orders = [
  {
    title: 'Активный заказ',
    data: [
      {
        shopName: 'Supermango',
        shopAddress: 'Г. Москва, ул. Проспект Вернадского, 14А',
        address: 'Г. Москва, ул. Проспект Вернадского, 13А',
        phone: '+7 495 000 00 01',
        time: '4',
        porch: '9',
        floor: '4',
        apartment: '560',
        intercom: '234',
        comment:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo',
      },
      {
        shopName: 'Supermango',
        shopAddress: 'Г. Москва, ул. Проспект Вернадского, 14А',
        address: 'Г. Москва, ул. Проспект Вернадского, 13А',
        phone: '+7 495 000 00 01',
        time: '4',
        porch: '9',
        floor: '4',
        apartment: '560',
        intercom: '234',
        comment:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo',
      },
    ],
  },
  {
    title: 'Следующий заказ',
    data: [
      {
        shopName: 'Supermango',
        shopAddress: 'Г. Москва, ул. Проспект Вернадского, 14А',
        address: 'Г. Москва, ул. Проспект Вернадского, 13А',
        phone: '+7 495 000 00 01',
        time: '45',
        porch: '9',
        floor: '4',
        apartment: '560',
        intercom: '234',
        comment:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo',
      },
    ],
  },
];

export const takeOrders = [
  {
    title: 'Вы можете взять заказ',
    data: [
      {
        shopName: 'Supermango',
        shopAddress: 'Г. Москва, ул. Проспект Вернадского, 14А',
        address: 'Г. Москва, ул. Проспект Вернадского, 13А',
        phone: '+7 495 000 00 01',
        time: '4',
        porch: '9',
        floor: '4',
        apartment: '560',
        intercom: '234',
        comment:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo',
      },
    ],
  }
];
