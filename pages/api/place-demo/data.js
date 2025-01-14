const categories = [
  { name: "Dining & Cuisine", key: "restaurant" },
  { name: "Accommodation & Lodging", key: "stay" },
  { name: "Activities & Adventures", key: "things_to_do" },
  { name: "Insider Tips & Guides", key: "local_guides" },
];

const placesData = [
  {
    id: "place_1321",
    type: categories[0].key,
    name: "Delicious Spot",
    overview: "A small but cozy restaurant with great local cuisine.",
    images: ["https://example.com/images/dining1.jpg"],
    location: {
      address: {
        road: "1 Ppx Road",
        city: "Ella",
        postalCode: "90100",
      },
      landmark: "Near the big board",
      googleBusiness: "https://g.page/delicious-spot",
    },
    contact: {
      phone: 1283943,
      email: "contact@deliciousspot.com",
      website: "https://deliciousspot.com",
    },
    reviewRating: 4.5,
  },
  {
    id: "place_1322",
    type: categories[1].key,
    name: "Mountain View Hotel",
    overview: "Luxurious hotel with stunning mountain views.",
    images: ["https://example.com/images/stay1.jpg"],
    location: {
      address: {
        road: "Highland Avenue",
        city: "Nuwara Eliya",
        postalCode: "22200",
      },
      landmark: "Next to Tea Plantation",
      googleBusiness: "https://g.page/mountain-view-hotel",
    },
    contact: {
      phone: 1234567,
      email: "info@mountainview.com",
      website: "https://mountainview.com",
    },
    reviewRating: 4.8,
  },
  {
    id: "place_1323",
    type: categories[2].key,
    name: "Waterfall Trekking",
    overview: "Adventure-filled trekking experience to hidden waterfalls.",
    images: ["https://example.com/images/adventure1.jpg"],
    location: {
      address: {
        road: "Forest Trail",
        city: "Kandy",
        postalCode: "20000",
      },
      landmark: "Near Forest Reserve",
      googleBusiness: "https://g.page/waterfall-trek",
    },
    contact: {
      phone: 9876543,
      email: "adventures@trekking.com",
      website: "https://trekkingadventures.com",
    },
    reviewRating: 4.7,
  },
  {
    id: "place_1324",
    type: categories[3].key,
    name: "Ella Local Guide Tours",
    overview: "Expert-guided tours to explore hidden gems of Ella.",
    images: ["https://example.com/images/guide1.jpg"],
    location: {
      address: {
        road: "Main Street",
        city: "Ella",
        postalCode: "90100",
      },
      landmark: "Next to Ella Railway",
      googleBusiness: "https://g.page/ella-guide-tours",
    },
    contact: {
      phone: 5550000,
      email: "guides@ellaexplore.com",
      website: "https://ellaexplore.com",
    },
    reviewRating: 4.9,
  },
  {
    id: "place_1325",
    type: categories[0].key,
    name: "Seaside Diner",
    overview: "Fresh seafood by the beach with stunning sunset views.",
    images: ["https://example.com/images/dining2.jpg"],
    location: {
      address: {
        road: "Beachfront Lane",
        city: "Galle",
        postalCode: "80000",
      },
      landmark: "Close to Lighthouse",
      googleBusiness: "https://g.page/seaside-diner",
    },
    contact: {
      phone: 3344556,
      email: "reservations@seasidediner.com",
      website: "https://seasidediner.com",
    },
    reviewRating: 4.6,
  },
  {
    id: "place_1326",
    type: categories[1].key,
    name: "Jungle Retreat",
    overview: "Eco-friendly lodging in the heart of the rainforest.",
    images: ["https://example.com/images/stay2.jpg"],
    location: {
      address: {
        road: "Rainforest Path",
        city: "Sinharaja",
        postalCode: "81300",
      },
      landmark: "Near Rainforest Entrance",
      googleBusiness: "https://g.page/jungle-retreat",
    },
    contact: {
      phone: 7891234,
      email: "stay@jungleretreat.com",
      website: "https://jungleretreat.com",
    },
    reviewRating: 4.4,
  },
  {
    id: "place_1327",
    type: categories[2].key,
    name: "Surfing Paradise",
    overview: "Learn to surf or ride the waves at this popular beach.",
    images: ["https://example.com/images/adventure2.jpg"],
    location: {
      address: {
        road: "Ocean Drive",
        city: "Arugam Bay",
        postalCode: "32500",
      },
      landmark: "Near Surf Point",
      googleBusiness: "https://g.page/surfing-paradise",
    },
    contact: {
      phone: 2345678,
      email: "surf@paradisebay.com",
      website: "https://surfthebay.com",
    },
    reviewRating: 4.8,
  },
  {
    id: "place_1328",
    type: categories[3].key,
    name: "Cultural Heritage Tours",
    overview: "Dive into local culture with expert-led heritage tours.",
    images: ["https://example.com/images/guide2.jpg"],
    location: {
      address: {
        road: "Heritage Street",
        city: "Anuradhapura",
        postalCode: "50000",
      },
      landmark: "Close to Sacred City",
      googleBusiness: "https://g.page/cultural-heritage-tours",
    },
    contact: {
      phone: 1112233,
      email: "culture@heritagetours.com",
      website: "https://heritagetours.com",
    },
    reviewRating: 4.7,
  },
  {
    id: "place_1329",
    type: categories[1].key,
    name: "Skyline Suites",
    overview: "Modern suites with panoramic city views.",
    images: ["https://example.com/images/stay3.jpg"],
    location: {
      address: {
        road: "Downtown Avenue",
        city: "Colombo",
        postalCode: "00100",
      },
      landmark: "Near Business District",
      googleBusiness: "https://g.page/skyline-suites",
    },
    contact: {
      phone: 9998877,
      email: "booking@skyline.com",
      website: "https://skylinesuites.com",
    },
    reviewRating: 4.9,
  },
  {
    id: "place_1330",
    type: categories[0].key,
    name: "Hilltop Café",
    overview: "Charming café overlooking the valley.",
    images: ["https://example.com/images/dining3.jpg"],
    location: {
      address: {
        road: "Hilltop Lane",
        city: "Hatton",
        postalCode: "22000",
      },
      landmark: "Near Tea Factory",
      googleBusiness: "https://g.page/hilltop-cafe",
    },
    contact: {
      phone: 6677889,
      email: "info@hilltopcafe.com",
      website: "https://hilltopcafe.com",
    },
    reviewRating: 4.6,
  },
];

export function places() {
  return placesData;
}

export function place(id) {
  for (let index = 0; index < placesData.length; index++) {
    if (placesData[index].id === id) {
      return placesData[index];
    } else {
      return `didnt have id ${id}`;
    }
  }
}
