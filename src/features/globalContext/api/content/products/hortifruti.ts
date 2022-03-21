import { Products } from '../../../../globalContext/types';

import hortifruti_01_img_01 from '../../../../../assets/images/products/hortifruti/01/01.jpg';
import hortifruti_01_img_02 from '../../../../../assets/images/products/hortifruti/01/02.jpg';
import hortifruti_01_img_03 from '../../../../../assets/images/products/hortifruti/01/03.jpg';

import hortifruti_02_img_01 from '../../../../../assets/images/products/hortifruti/02/01.jpg';
import hortifruti_02_img_02 from '../../../../../assets/images/products/hortifruti/02/02.jpg';
import hortifruti_02_img_03 from '../../../../../assets/images/products/hortifruti/02/03.png';

import hortifruti_03_img_01 from '../../../../../assets/images/products/hortifruti/03/01.jpg';
import hortifruti_03_img_02 from '../../../../../assets/images/products/hortifruti/03/02.jpg';
import hortifruti_03_img_03 from '../../../../../assets/images/products/hortifruti/03/03.jpg';

import hortifruti_04_img_01 from '../../../../../assets/images/products/hortifruti/04/01.jpg';
import hortifruti_04_img_02 from '../../../../../assets/images/products/hortifruti/04/02.jpg';
import hortifruti_04_img_03 from '../../../../../assets/images/products/hortifruti/04/03.jpg';

import hortifruti_05_img_01 from '../../../../../assets/images/products/hortifruti/05/01.jpg';
import hortifruti_05_img_02 from '../../../../../assets/images/products/hortifruti/05/02.jpg';
import hortifruti_05_img_03 from '../../../../../assets/images/products/hortifruti/05/03.png';

export const products_hortifruti: Products = [
  {
    id: 'hortifruti-01',
    name: 'Antepasto de cogumelo Shimeji Preto Natural',
    producer: 'Urakami',
    measure: '155 g',
    description: `O Antepasto de Cogumelo Shimeji Preto Natural Urakami é feito com cogumelos selecionados de 1ª linha, 
    conservados naturalmente em óleo e diversas especiarias. Feitos artesanalmente, os antepastos oferecem o verdadeiro 
    sabor dos cogumelos graças ao seu umami natural, 5º sabor dos alimentos.

    O Grupo Urakami® é referência nacional no cultivo de cogumelos in natura, com métodos 100% naturais, totalmente 
    livre de agrotóxicos e agentes externos, como insetos e poluição. Todos os cogumelos são cultivados em câmaras com 
    monitoramento eletrônico de temperatura, umidade e CO², além de serem realizadas análises microbiológicas periodicamente.
    
    A empresa possui os selos de 'Certificação de Produto Orgânico do Brasil e 'eureciclo', homologando o compromisso de 
    excelência dos produtos com o mínimo de impacto ao meio ambiente.`,
    ingredients: `Cogumelo Shimeji, óleo de soja, azeite, vinagre de alcool, limão, sal, alho, louro e pimenta calabreza. 
    Não contém glúten. Alérgicos: contém derivados de soja.`,
    validate: '1 ano',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'urakami',
      categories: 'hortifruti',
    },
    price: 45.0,
    images: [hortifruti_01_img_01, hortifruti_01_img_02, hortifruti_01_img_03],
  },

  {
    id: 'hortifruti-02',
    name: 'Ovo Caipira Grande',
    producer: 'Naturegg',
    measure: '10 unidades',
    description: `A filosofia da Granja São Marcos, de onde vêm os ovos Naturegg, e o programa Certified Humane® caminham 
    na mesma direção, já que o negócio foi criado com o objetivo específico de fornecer produtos conscientes em termos 
    de saúde da família e bem-estar animal.

    Os cuidados na criação dos animais estão em primeiro lugar: a produção é livre de antibióticos preventivos, 
    promotores de crescimento e de ingredientes de origem animal.
    
    Os Ovos Caipiras são provenientes de galinhas criadas soltas, em sistema cage free, com área externa ao galpão 
    para pastoreio.`,
    ingredients: `Ovos caipiras`,
    validate: '30 dias',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'naturegg',
      categories: 'hortifruti',
    },
    price: 13.10,
    images: [hortifruti_02_img_01, hortifruti_02_img_02, hortifruti_02_img_03],
  },

  {
    id: 'hortifruti-03',
    name: 'Tomate Cocktaill',
    producer: 'Fazenda do Bem',
    measure: '250 g',
    description: `Os tomates são produzidos pela Fazenda do Bem.

    Os Tomates Coquetel da Fazenda do Bem são produzidos em cultivo protegido e chegam fresquinhos na sua casa para 
    aproveitar na sua salada ou como ingrediente culinário.`,
    ingredients: `Tomates.`,
    validate: '15 dias',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'fazenda-do-bem',
      categories: 'hortifruti',
    },
    price: 7.7,
    images: [hortifruti_03_img_01, hortifruti_03_img_02, hortifruti_03_img_03],
  },

  {
    id: 'hortifruti-04',
    name: 'Avocado Baby',
    producer: 'Jaguacy',
    measure: '800 g',
    description: `A Jaguacy Brasil é especialista na produção e comercialização do Avocado Hass no Brasil e possui 
    o selo Global G.A.P. (referencial global para as boas práticas agrícolas). O Avocado Hass surgiu na Califórnia, 
    e destaca-se pela sua alta concentração de vitaminas, minerais, proteínas e fibras. Além disso, com seu sabor, 
    textura, valor nutricional e versatilidade na culinária, o Avocado é um poderoso aliado para a saúde. Seu consumo 
    é benéfico para o coração, envelhecimento, cãibras, impotência, equilibra o colesterol e combate os radicais livres.

    O Avocado Baby é a embalagem mais fofa que a Jaguacy produz. Os Avocadinhos vem em formatos menores (de até 120 
      gramas) e são ideais para consumo individual e diário.`,
    ingredients: `Abacates`,
    validate: '15 dias',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'jaguacy',
      categories: 'hortifruti',
    },
    price: 29.99,
    images: [hortifruti_04_img_01, hortifruti_04_img_02, hortifruti_04_img_03],
  },

  {
    id: 'hortifruti-05',
    name: 'Cogumelo Shimeji Orgânico',
    producer: 'Urakami',
    measure: '200 g',
    description: `O Grupo Urakami® é referência nacional no cultivo de cogumelos in natura, com métodos 100% naturais, 
    totalmente livre de agrotóxicos e agentes externos, como insetos e poluição. Todos os cogumelos são cultivados em 
    câmaras com monitoramento eletrônico de temperatura, umidade e CO², além de serem realizadas análises microbiológicas 
    periodicamente.

    A empresa possui os selos de 'Certificação de Produto Orgânico do Brasil e 'eureciclo', homologando o compromisso de 
    excelência dos produtos com o mínimo de impacto ao meio ambiente.
    
    O Shimeji® é uma boa fonte de lisina e vitamina B1. Também possui níveis nutricionais elevados e baixo índice de 
    calorias, o que torna ideal para as dietas. Estudos mostram que o Shimeji® possui a capacidade de modular o sistema 
    imunológico, possui atividade hipoglicêmica e antitrombótica, diminui a pressão arterial e o colesterol ruim, além da 
    ação antitumoral, antinflamatória e antimicrobiana.
    
    Sugestão de Consumo: O Shimeji® possui sabor delicado e aroma aprofundado, que o torna excelente para sopas, refogados 
    e pratos de arroz. Os preparos mais comuns são: refogados na manteiga, enrolados com bacon no espeto, sushis, temakis, 
    recheios, sopas e caldos.`,
    ingredients: `Shimeji® in natura.`,
    validate: '7 dias',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'urakami',
      categories: 'hortifruti',
    },
    price: 13.5,
    images: [hortifruti_05_img_01, hortifruti_05_img_02, hortifruti_05_img_03],
  },





  {
    id: 'hortifruti-06',
    name: 'Antepasto de cogumelo Shimeji Preto Natural',
    producer: 'Urakami',
    measure: '155 g',
    description: `O Antepasto de Cogumelo Shimeji Preto Natural Urakami é feito com cogumelos selecionados de 1ª linha, 
    conservados naturalmente em óleo e diversas especiarias. Feitos artesanalmente, os antepastos oferecem o verdadeiro 
    sabor dos cogumelos graças ao seu umami natural, 5º sabor dos alimentos.

    O Grupo Urakami® é referência nacional no cultivo de cogumelos in natura, com métodos 100% naturais, totalmente 
    livre de agrotóxicos e agentes externos, como insetos e poluição. Todos os cogumelos são cultivados em câmaras com 
    monitoramento eletrônico de temperatura, umidade e CO², além de serem realizadas análises microbiológicas periodicamente.
    
    A empresa possui os selos de 'Certificação de Produto Orgânico do Brasil e 'eureciclo', homologando o compromisso de 
    excelência dos produtos com o mínimo de impacto ao meio ambiente.`,
    ingredients: `Cogumelo Shimeji, óleo de soja, azeite, vinagre de alcool, limão, sal, alho, louro e pimenta calabreza. 
    Não contém glúten. Alérgicos: contém derivados de soja.`,
    validate: '1 ano',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'urakami',
      categories: 'hortifruti',
    },
    price: 45.0,
    images: [hortifruti_01_img_01, hortifruti_01_img_02, hortifruti_01_img_03],
  },

  {
    id: 'hortifruti-07',
    name: 'Ovo Caipira Grande',
    producer: 'Naturegg',
    measure: '10 unidades',
    description: `A filosofia da Granja São Marcos, de onde vêm os ovos Naturegg, e o programa Certified Humane® caminham 
    na mesma direção, já que o negócio foi criado com o objetivo específico de fornecer produtos conscientes em termos 
    de saúde da família e bem-estar animal.

    Os cuidados na criação dos animais estão em primeiro lugar: a produção é livre de antibióticos preventivos, 
    promotores de crescimento e de ingredientes de origem animal.
    
    Os Ovos Caipiras são provenientes de galinhas criadas soltas, em sistema cage free, com área externa ao galpão 
    para pastoreio.`,
    ingredients: `Ovos caipiras`,
    validate: '30 dias',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'naturegg',
      categories: 'hortifruti',
    },
    price: 13.10,
    images: [hortifruti_02_img_01, hortifruti_02_img_02, hortifruti_02_img_03],
  },

  {
    id: 'hortifruti-08',
    name: 'Tomate Cocktaill',
    producer: 'Fazenda do Bem',
    measure: '250 g',
    description: `Os tomates são produzidos pela Fazenda do Bem.

    Os Tomates Coquetel da Fazenda do Bem são produzidos em cultivo protegido e chegam fresquinhos na sua casa para 
    aproveitar na sua salada ou como ingrediente culinário.`,
    ingredients: `Tomates.`,
    validate: '15 dias',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'fazenda-do-bem',
      categories: 'hortifruti',
    },
    price: 7.7,
    images: [hortifruti_03_img_01, hortifruti_03_img_02, hortifruti_03_img_03],
  },

  {
    id: 'hortifruti-09',
    name: 'Avocado Baby',
    producer: 'Jaguacy',
    measure: '800 g',
    description: `A Jaguacy Brasil é especialista na produção e comercialização do Avocado Hass no Brasil e possui 
    o selo Global G.A.P. (referencial global para as boas práticas agrícolas). O Avocado Hass surgiu na Califórnia, 
    e destaca-se pela sua alta concentração de vitaminas, minerais, proteínas e fibras. Além disso, com seu sabor, 
    textura, valor nutricional e versatilidade na culinária, o Avocado é um poderoso aliado para a saúde. Seu consumo 
    é benéfico para o coração, envelhecimento, cãibras, impotência, equilibra o colesterol e combate os radicais livres.

    O Avocado Baby é a embalagem mais fofa que a Jaguacy produz. Os Avocadinhos vem em formatos menores (de até 120 
      gramas) e são ideais para consumo individual e diário.`,
    ingredients: `Abacates`,
    validate: '15 dias',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'jaguacy',
      categories: 'hortifruti',
    },
    price: 29.99,
    images: [hortifruti_04_img_01, hortifruti_04_img_02, hortifruti_04_img_03],
  },

  {
    id: 'hortifruti-10',
    name: 'Cogumelo Shimeji Orgânico',
    producer: 'Urakami',
    measure: '200 g',
    description: `O Grupo Urakami® é referência nacional no cultivo de cogumelos in natura, com métodos 100% naturais, 
    totalmente livre de agrotóxicos e agentes externos, como insetos e poluição. Todos os cogumelos são cultivados em 
    câmaras com monitoramento eletrônico de temperatura, umidade e CO², além de serem realizadas análises microbiológicas 
    periodicamente.

    A empresa possui os selos de 'Certificação de Produto Orgânico do Brasil e 'eureciclo', homologando o compromisso de 
    excelência dos produtos com o mínimo de impacto ao meio ambiente.
    
    O Shimeji® é uma boa fonte de lisina e vitamina B1. Também possui níveis nutricionais elevados e baixo índice de 
    calorias, o que torna ideal para as dietas. Estudos mostram que o Shimeji® possui a capacidade de modular o sistema 
    imunológico, possui atividade hipoglicêmica e antitrombótica, diminui a pressão arterial e o colesterol ruim, além da 
    ação antitumoral, antinflamatória e antimicrobiana.
    
    Sugestão de Consumo: O Shimeji® possui sabor delicado e aroma aprofundado, que o torna excelente para sopas, refogados 
    e pratos de arroz. Os preparos mais comuns são: refogados na manteiga, enrolados com bacon no espeto, sushis, temakis, 
    recheios, sopas e caldos.`,
    ingredients: `Shimeji® in natura.`,
    validate: '7 dias',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'urakami',
      categories: 'hortifruti',
    },
    price: 13.5,
    images: [hortifruti_05_img_01, hortifruti_05_img_02, hortifruti_05_img_03],
  },
];