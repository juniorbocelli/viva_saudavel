import { Products } from '../../features/globalContext/types';

import t_queijos_01_img_01 from '../../assets/images/products/queijos/01/t_01.jpg';
import queijos_01_img_01 from '../../assets/images/products/queijos/01/01.jpg';
import queijos_01_img_02 from '../../assets/images/products/queijos/01/02.jpg';
import queijos_01_img_03 from '../../assets/images/products/queijos/01/03.png';

import t_queijos_02_img_01 from '../../assets/images/products/queijos/02/t_01.jpg';
import queijos_02_img_01 from '../../assets/images/products/queijos/02/01.jpg';
import queijos_02_img_02 from '../../assets/images/products/queijos/02/02.jpg';
import queijos_02_img_03 from '../../assets/images/products/queijos/02/03.jpg';

import t_queijos_03_img_01 from '../../assets/images/products/queijos/03/t_01.jpg';
import queijos_03_img_01 from '../../assets/images/products/queijos/03/01.jpg';
import queijos_03_img_02 from '../../assets/images/products/queijos/03/02.jpg';
import queijos_03_img_03 from '../../assets/images/products/queijos/03/03.png';

import t_queijos_04_img_01 from '../../assets/images/products/queijos/04/t_01.jpg';
import queijos_04_img_01 from '../../assets/images/products/queijos/04/01.jpg';
import queijos_04_img_02 from '../../assets/images/products/queijos/04/02.jpg';
import queijos_04_img_03 from '../../assets/images/products/queijos/04/03.jpg';

export const products_queijos: Products = [
  {
    id: 'queijos-01',
    name: 'Queijo Minas Padrão',
    producer: 'Piracanjuba',
    measure: '430 g',
    description: `Para a Piracanjuba, qualidade e inovação são os melhores ingredientes para uma trajetória de sucesso. 
    A família de produtos agrada aos mais diferentes gostos, além de possibilitar diferentes experiências com a culinária, 
    mesmo para quem tem restrições alimentares.

    Ao ser referência em valores sólidos, como ética, valorização das pessoas e responsabilidade socioambiental, a 
    Piracanjuba tem sido protagonista em várias premiações e reconhecimentos nacionais e internacionais, que dão destaque 
    aos produtos.
    
    O Queijo Minas Piracanjuba tem textura macia e sabor ligeiramente ácido e requintado. Excelente para recheios de 
    receitas salgadas.
    
    Sugestão de Consumo: Excelente opção para receitas salgadas, como pães de queijo, quibes, tortas e massas.`,
    ingredients: `Leite pasteurizado, cloreto de sódio, cloreto de cálcio, fermento lático e coagulante.`,
    validate: '6 meses',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: false,
      isLactoseFree: false,

      producerCode: 'piracanjuba',
      category: 'queijos',
    },
    price: 28.0,
    images: [queijos_01_img_01, queijos_01_img_02, queijos_01_img_03],
    thumb: t_queijos_01_img_01,
  },

  {
    id: 'queijos-02',
    name: 'Queijo Minas Padrão',
    producer: 'Aviação',
    measure: '500 g',
    description: `O Queijo Minas Padrão Aviação é 100% produzido na fábrica da Aviação. Ele apresente menor teor de 
    gordura, baixa quantidade de sódio e pode ser uma importante fonte de proteína e cálcio. É um queijo maturado obtido 
    pela coagulação do leite padronizado e pasteurizado (por meio de coagulante) e fermentado com culturas (mesofílicas).

    A Aviação nasceu em 1920, quando as famílias Gonçalves e Salles abriramum armazém em São Paulo e um laticínio 
    em Minas Gerais, onde foi produzida a primeira manteiga em lata Aviação. Nesses 100 anos de história, a Laticínios 
    Aviação cresceu e aumentou seu portfólio de produtos, todos feitos a partir de matérias-primas selecionadas, passando 
    por rigorosos processos de fabricação, e sempre conectada ao mundo está pedindo. `,
    ingredients: `Leite pasteurizado, cloreto de sódio (sal), cloreto de cálcio INS 509, coagulante e fermento láctico.`,
    validate: '4 meses',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,

      producerCode: 'piracanjuba',
      category: 'queijos',
    },
    price: 31.81,
    images: [queijos_02_img_01, queijos_02_img_02, queijos_02_img_03],
    thumb: t_queijos_02_img_01,
  },

  {
    id: 'queijos-03',
    name: 'Queijo do Reino',
    producer: 'Piracanjuba',
    measure: '200 g',
    description: `Para a Piracanjuba, qualidade e inovação são os melhores ingredientes para uma trajetória de sucesso. 
    A família de produtos agrada aos mais diferentes gostos, além de possibilitar diferentes experiências com a culinária, 
    mesmo para quem tem restrições alimentares.

    Ao ser referência em valores sólidos, como ética, valorização das pessoas e responsabilidade socioambiental, a 
    Piracanjuba tem sido protagonista em várias premiações e reconhecimentos nacionais e internacionais, que dão destaque 
    aos produtos.
    
    O Queijo do Reino Piracanjuba tem uma coloração diferenciada e um sabor que ressalta no paladar, pois tem 
    características acentuadas, advindos da sua minuciosa produção.
    
    Sugestão de Consumo: É uma ótima opção de aperitivo e pode ser usado em várias receitas.`,
    ingredients: `Leite pasteurizado, cloreto de sódio, cloreto de cálcio, fermento lático, coagulante, conservador 
    nitrato de sódio e corante natural de urucum.`,
    validate: '6 meses',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: false,
      isLactoseFree: false,

      producerCode: 'piracanjuba',
      category: 'queijos',
    },
    price: 16.0,
    images: [queijos_03_img_01, queijos_03_img_02, queijos_03_img_03],
    thumb: t_queijos_03_img_01,
  },

  {
    id: 'queijos-04',
    name: 'Ricota Fresca',
    producer: 'Goldy',
    measure: '450 g',
    description: `A Ricota Fresca Goldy é reconhecida como a “Preferida dos Chefs”, é 100% natural e produzida a partir 
    de puro leite de vacas Jersey. Apresenta textura leve e macia, sendo, ao mesmo tempo, cremosa e com alta digestibilidade. 
    Muito nutritiva, é rica em vitaminas e minerais e contém as melhores proteínas do leite. Ideal para receitas doces e 
    salgadas.

    A dupla embalagem utilizada – sacos plásticos lacrados e acondicionados em potes de polipropileno – é singular entre 
    os lácteos frescais, conferindo aos produtos maior segurança contra riscos de contaminação e melhores condições de 
    manuseio e armazenagem.
    
    A Goldy Alimentos nasceu em 2001 com a proposta de transformar matéria prima nobre, com origem na pecuária brasileira, 
    em produtos Premium. Preservando os conceitos de sustentabilidade e respeito ao meio ambiente, a Goldy produz leite de 
    gado Jersey há mais de 40 anos, na Fazenda Limoeiro, em Itú. Reconhecidamente, a vaca Jersey é produtora do “melhor 
    leite do mundo”, muito rico em creme, proteínas e minerais, o que nos motivou a verticalizar a produção, agregando 
    valor a uma matéria prima nobre.
    
    Os produtos são processados em laticínio na própria fazenda. São referência de qualidade ao mercado e distribuídos 
    com total rastreabilidade de origem, dentro do que se convencionou chamar “Farm to Table”.`,
    ingredients: `Soro de leite, leite pasteurizado e ácido lático. Não contém glúten. Contém leite.`,
    validate: '15 dias',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: true,
      isLactoseFree: false,

      producerCode: 'goldy',
      category: 'queijos',
    },
    price: 33.35,
    images: [queijos_04_img_01, queijos_04_img_02, queijos_04_img_03],
    thumb: t_queijos_04_img_01,
  },





  {
    id: 'queijos-05',
    name: 'Queijo Minas Padrão',
    producer: 'Piracanjuba',
    measure: '430 g',
    description: `Para a Piracanjuba, qualidade e inovação são os melhores ingredientes para uma trajetória de sucesso. 
    A família de produtos agrada aos mais diferentes gostos, além de possibilitar diferentes experiências com a culinária, 
    mesmo para quem tem restrições alimentares.

    Ao ser referência em valores sólidos, como ética, valorização das pessoas e responsabilidade socioambiental, a 
    Piracanjuba tem sido protagonista em várias premiações e reconhecimentos nacionais e internacionais, que dão destaque 
    aos produtos.
    
    O Queijo Minas Piracanjuba tem textura macia e sabor ligeiramente ácido e requintado. Excelente para recheios de 
    receitas salgadas.
    
    Sugestão de Consumo: Excelente opção para receitas salgadas, como pães de queijo, quibes, tortas e massas.`,
    ingredients: `Leite pasteurizado, cloreto de sódio, cloreto de cálcio, fermento lático e coagulante.`,
    validate: '6 meses',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: false,
      isLactoseFree: false,

      producerCode: 'piracanjuba',
      category: 'queijos',
    },
    price: 28.0,
    images: [queijos_01_img_01, queijos_01_img_02, queijos_01_img_03],
    thumb: t_queijos_01_img_01,
  },

  {
    id: 'queijos-06',
    name: 'Queijo Minas Padrão',
    producer: 'Aviação',
    measure: '500 g',
    description: `O Queijo Minas Padrão Aviação é 100% produzido na fábrica da Aviação. Ele apresente menor teor de 
    gordura, baixa quantidade de sódio e pode ser uma importante fonte de proteína e cálcio. É um queijo maturado obtido 
    pela coagulação do leite padronizado e pasteurizado (por meio de coagulante) e fermentado com culturas (mesofílicas).

    A Aviação nasceu em 1920, quando as famílias Gonçalves e Salles abriramum armazém em São Paulo e um laticínio 
    em Minas Gerais, onde foi produzida a primeira manteiga em lata Aviação. Nesses 100 anos de história, a Laticínios 
    Aviação cresceu e aumentou seu portfólio de produtos, todos feitos a partir de matérias-primas selecionadas, passando 
    por rigorosos processos de fabricação, e sempre conectada ao mundo está pedindo. `,
    ingredients: `Leite pasteurizado, cloreto de sódio (sal), cloreto de cálcio INS 509, coagulante e fermento láctico.`,
    validate: '4 meses',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,

      producerCode: 'piracanjuba',
      category: 'queijos',
    },
    price: 31.81,
    images: [queijos_02_img_01, queijos_02_img_02, queijos_02_img_03],
    thumb: t_queijos_02_img_01,
  },

  {
    id: 'queijos-07',
    name: 'Queijo do Reino',
    producer: 'Piracanjuba',
    measure: '200 g',
    description: `Para a Piracanjuba, qualidade e inovação são os melhores ingredientes para uma trajetória de sucesso. 
    A família de produtos agrada aos mais diferentes gostos, além de possibilitar diferentes experiências com a culinária, 
    mesmo para quem tem restrições alimentares.

    Ao ser referência em valores sólidos, como ética, valorização das pessoas e responsabilidade socioambiental, a 
    Piracanjuba tem sido protagonista em várias premiações e reconhecimentos nacionais e internacionais, que dão destaque 
    aos produtos.
    
    O Queijo do Reino Piracanjuba tem uma coloração diferenciada e um sabor que ressalta no paladar, pois tem 
    características acentuadas, advindos da sua minuciosa produção.
    
    Sugestão de Consumo: É uma ótima opção de aperitivo e pode ser usado em várias receitas.`,
    ingredients: `Leite pasteurizado, cloreto de sódio, cloreto de cálcio, fermento lático, coagulante, conservador 
    nitrato de sódio e corante natural de urucum.`,
    validate: '6 meses',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: false,
      isLactoseFree: false,

      producerCode: 'piracanjuba',
      category: 'queijos',
    },
    price: 16.0,
    images: [queijos_03_img_01, queijos_03_img_02, queijos_03_img_03],
    thumb: t_queijos_03_img_01,
  },

  {
    id: 'queijos-08',
    name: 'Ricota Fresca',
    producer: 'Goldy',
    measure: '450 g',
    description: `A Ricota Fresca Goldy é reconhecida como a “Preferida dos Chefs”, é 100% natural e produzida a partir 
    de puro leite de vacas Jersey. Apresenta textura leve e macia, sendo, ao mesmo tempo, cremosa e com alta digestibilidade. 
    Muito nutritiva, é rica em vitaminas e minerais e contém as melhores proteínas do leite. Ideal para receitas doces e 
    salgadas.

    A dupla embalagem utilizada – sacos plásticos lacrados e acondicionados em potes de polipropileno – é singular entre 
    os lácteos frescais, conferindo aos produtos maior segurança contra riscos de contaminação e melhores condições de 
    manuseio e armazenagem.
    
    A Goldy Alimentos nasceu em 2001 com a proposta de transformar matéria prima nobre, com origem na pecuária brasileira, 
    em produtos Premium. Preservando os conceitos de sustentabilidade e respeito ao meio ambiente, a Goldy produz leite de 
    gado Jersey há mais de 40 anos, na Fazenda Limoeiro, em Itú. Reconhecidamente, a vaca Jersey é produtora do “melhor 
    leite do mundo”, muito rico em creme, proteínas e minerais, o que nos motivou a verticalizar a produção, agregando 
    valor a uma matéria prima nobre.
    
    Os produtos são processados em laticínio na própria fazenda. São referência de qualidade ao mercado e distribuídos 
    com total rastreabilidade de origem, dentro do que se convencionou chamar “Farm to Table”.`,
    ingredients: `Soro de leite, leite pasteurizado e ácido lático. Não contém glúten. Contém leite.`,
    validate: '15 dias',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: true,
      isLactoseFree: false,

      producerCode: 'goldy',
      category: 'queijos',
    },
    price: 33.35,
    images: [queijos_04_img_01, queijos_04_img_02, queijos_04_img_03],
    thumb: t_queijos_04_img_01,
  },
];