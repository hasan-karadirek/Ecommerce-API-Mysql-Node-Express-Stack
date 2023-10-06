const fs = require('fs');
const path = require('path');

const products = [
  {
    images: [
      '/public/ff/P000048_FLAT.png',
      '/public/ff/P000048_2_M_C.png',
      '/public/ff/P000048_M_C.png',
    ],
    name: 'Flower Sock',
    description:
      'Gewoon wat mooie bloemen voor een fleurige stijl - ook verkrijgbaar in een bijpassende print voor kinderen.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000062_FLAT.png',
      '/public/ff/P000062_2_M_C.png',
      '/public/ff/P000062_M_C.png',
    ],
    name: 'Frog Sock',
    description:
      'Met dit paar sokken aan je voeten voel je je zoals de prinses of prins van de hele kikkervijver. Geen kusjes nodig! Verkrijgbaar in bijpassende prints voor kinderen.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000040_FLAT.png',
      '/public/ff/P000040_2_M_C.png',
      '/public/ff/P000040_M_C.png',
    ],
    name: 'Mushroom Sock ',
    description:
      'Wees voorzichtig, stap niet op rode paddenstoelen! Of eigenlijk, maak je geen zorgen, deze paddenstoelen zijn volledig goedgekeurd om op te lopen. Verkrijgbaar in een bijpassende print voor kinderen in de Kids 2-Pack Happy Mushroom.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000515_FLAT.png',
      '/public/ff/P000515_2_M_C.png',
      '/public/ff/P000515_M_C.png',
    ],
    name: 'Gradient Sock',
    description:
      'Deze heerlijk zachte, fluffy en kleurrijke sok houdt je voeten lekker comfy in de koudere maanden en het gelaagde garen maakt elk paar uniek.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000048_FLAT.png',
      '/public/ff/P000048_2_M_C.png',
      '/public/ff/P000048_M_C.png',
    ],
    name: 'Flower Sock',
    description:
      'Gewoon wat mooie bloemen voor een fleurige stijl - ook verkrijgbaar in een bijpassende print voor kinderen.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000062_FLAT.png',
      '/public/ff/P000062_2_M_C.png',
      '/public/ff/P000062_M_C.png',
    ],
    name: 'Frog Sock',
    description:
      'Met dit paar sokken aan je voeten voel je je zoals de prinses of prins van de hele kikkervijver. Geen kusjes nodig! Verkrijgbaar in bijpassende prints voor kinderen.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000040_FLAT.png',
      '/public/ff/P000040_2_M_C.png',
      '/public/ff/P000040_M_C.png',
    ],
    name: 'Mushroom Sock ',
    description:
      'Wees voorzichtig, stap niet op rode paddenstoelen! Of eigenlijk, maak je geen zorgen, deze paddenstoelen zijn volledig goedgekeurd om op te lopen. Verkrijgbaar in een bijpassende print voor kinderen in de Kids 2-Pack Happy Mushroom.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000515_FLAT.png',
      '/public/ff/P000515_2_M_C.png',
      '/public/ff/P000515_M_C.png',
    ],
    name: 'Gradient Sock',
    description:
      'Deze heerlijk zachte, fluffy en kleurrijke sok houdt je voeten lekker comfy in de koudere maanden en het gelaagde garen maakt elk paar uniek.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000048_FLAT.png',
      '/public/ff/P000048_2_M_C.png',
      '/public/ff/P000048_M_C.png',
    ],
    name: 'Flower Sock',
    description:
      'Gewoon wat mooie bloemen voor een fleurige stijl - ook verkrijgbaar in een bijpassende print voor kinderen.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000062_FLAT.png',
      '/public/ff/P000062_2_M_C.png',
      '/public/ff/P000062_M_C.png',
    ],
    name: 'Frog Sock',
    description:
      'Met dit paar sokken aan je voeten voel je je zoals de prinses of prins van de hele kikkervijver. Geen kusjes nodig! Verkrijgbaar in bijpassende prints voor kinderen.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000040_FLAT.png',
      '/public/ff/P000040_2_M_C.png',
      '/public/ff/P000040_M_C.png',
    ],
    name: 'Mushroom Sock ',
    description:
      'Wees voorzichtig, stap niet op rode paddenstoelen! Of eigenlijk, maak je geen zorgen, deze paddenstoelen zijn volledig goedgekeurd om op te lopen. Verkrijgbaar in een bijpassende print voor kinderen in de Kids 2-Pack Happy Mushroom.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000515_FLAT.png',
      '/public/ff/P000515_2_M_C.png',
      '/public/ff/P000515_M_C.png',
    ],
    name: 'Gradient Sock',
    description:
      'Deze heerlijk zachte, fluffy en kleurrijke sok houdt je voeten lekker comfy in de koudere maanden en het gelaagde garen maakt elk paar uniek.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000048_FLAT.png',
      '/public/ff/P000048_2_M_C.png',
      '/public/ff/P000048_M_C.png',
    ],
    name: 'Flower Sock',
    description:
      'Gewoon wat mooie bloemen voor een fleurige stijl - ook verkrijgbaar in een bijpassende print voor kinderen.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000062_FLAT.png',
      '/public/ff/P000062_2_M_C.png',
      '/public/ff/P000062_M_C.png',
    ],
    name: 'Frog Sock',
    description:
      'Met dit paar sokken aan je voeten voel je je zoals de prinses of prins van de hele kikkervijver. Geen kusjes nodig! Verkrijgbaar in bijpassende prints voor kinderen.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000040_FLAT.png',
      '/public/ff/P000040_2_M_C.png',
      '/public/ff/P000040_M_C.png',
    ],
    name: 'Mushroom Sock ',
    description:
      'Wees voorzichtig, stap niet op rode paddenstoelen! Of eigenlijk, maak je geen zorgen, deze paddenstoelen zijn volledig goedgekeurd om op te lopen. Verkrijgbaar in een bijpassende print voor kinderen in de Kids 2-Pack Happy Mushroom.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000515_FLAT.png',
      '/public/ff/P000515_2_M_C.png',
      '/public/ff/P000515_M_C.png',
    ],
    name: 'Gradient Sock',
    description:
      'Deze heerlijk zachte, fluffy en kleurrijke sok houdt je voeten lekker comfy in de koudere maanden en het gelaagde garen maakt elk paar uniek.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000048_FLAT.png',
      '/public/ff/P000048_2_M_C.png',
      '/public/ff/P000048_M_C.png',
    ],
    name: 'Flower Sock',
    description:
      'Gewoon wat mooie bloemen voor een fleurige stijl - ook verkrijgbaar in een bijpassende print voor kinderen.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000062_FLAT.png',
      '/public/ff/P000062_2_M_C.png',
      '/public/ff/P000062_M_C.png',
    ],
    name: 'Frog Sock',
    description:
      'Met dit paar sokken aan je voeten voel je je zoals de prinses of prins van de hele kikkervijver. Geen kusjes nodig! Verkrijgbaar in bijpassende prints voor kinderen.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000040_FLAT.png',
      '/public/ff/P000040_2_M_C.png',
      '/public/ff/P000040_M_C.png',
    ],
    name: 'Mushroom Sock ',
    description:
      'Wees voorzichtig, stap niet op rode paddenstoelen! Of eigenlijk, maak je geen zorgen, deze paddenstoelen zijn volledig goedgekeurd om op te lopen. Verkrijgbaar in een bijpassende print voor kinderen in de Kids 2-Pack Happy Mushroom.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000515_FLAT.png',
      '/public/ff/P000515_2_M_C.png',
      '/public/ff/P000515_M_C.png',
    ],
    name: 'Gradient Sock',
    description:
      'Deze heerlijk zachte, fluffy en kleurrijke sok houdt je voeten lekker comfy in de koudere maanden en het gelaagde garen maakt elk paar uniek.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000048_FLAT.png',
      '/public/ff/P000048_2_M_C.png',
      '/public/ff/P000048_M_C.png',
    ],
    name: 'Flower Sock',
    description:
      'Gewoon wat mooie bloemen voor een fleurige stijl - ook verkrijgbaar in een bijpassende print voor kinderen.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000062_FLAT.png',
      '/public/ff/P000062_2_M_C.png',
      '/public/ff/P000062_M_C.png',
    ],
    name: 'Frog Sock',
    description:
      'Met dit paar sokken aan je voeten voel je je zoals de prinses of prins van de hele kikkervijver. Geen kusjes nodig! Verkrijgbaar in bijpassende prints voor kinderen.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000040_FLAT.png',
      '/public/ff/P000040_2_M_C.png',
      '/public/ff/P000040_M_C.png',
    ],
    name: 'Mushroom Sock ',
    description:
      'Wees voorzichtig, stap niet op rode paddenstoelen! Of eigenlijk, maak je geen zorgen, deze paddenstoelen zijn volledig goedgekeurd om op te lopen. Verkrijgbaar in een bijpassende print voor kinderen in de Kids 2-Pack Happy Mushroom.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
  {
    images: [
      '/public/ff/P000515_FLAT.png',
      '/public/ff/P000515_2_M_C.png',
      '/public/ff/P000515_M_C.png',
    ],
    name: 'Gradient Sock',
    description:
      'Deze heerlijk zachte, fluffy en kleurrijke sok houdt je voeten lekker comfy in de koudere maanden en het gelaagde garen maakt elk paar uniek.',
    price: 12,
    categoryArr: [1, 2, 3, 4, 5],
  },
];

const uploadBulkProducts = async (products) => {
  for (let product of products) {
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);

    for (let category of product.categoryArr) {
      formData.append(
        `categoryArr[${product.categoryArr.indexOf(category)}]`,
        category
      );
    }
    // let imgArr = [];
    for (let image of product.images) {
      const imagePath = path.join(__dirname, image);

      const imageStream = fs.createReadStream(imagePath);
      //   console.log(imageStream);
      formData.append(
        `productImages[${product.images.indexOf(image)}]`,
        imageStream
      );
    }
    const headers = {
      Cookie: `admin_access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Imhhc2Fua2FyYWRpcmVrM0BnbWFpbC5jb20iLCJpYXQiOjE2OTY2MDcxNDAsImV4cCI6MTY5NjY2NzE0MH0.gOlp7dFmZxAG2hHS9cfuoTspdfxgkA_zlJEaFDtSMfY`, // Replace yourCookieName with the actual cookie name
    };
    const boundary = `--------------------------${Math.random()
      .toString(16)
      .substr(2)}`;

    headers['Content-Type'] = 'multipart/form-data; boundary=' + boundary;
    console.log(formData);
    const res = await fetch('http://localhost:5000/api/products/add', {
      method: 'POST',
      body: formData,
      headers: headers,
    });
    console.log(res.status, res.body);
  }
};

uploadBulkProducts(products)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
