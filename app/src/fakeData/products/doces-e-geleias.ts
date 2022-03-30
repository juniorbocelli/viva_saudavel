import { Products } from '../../features/globalContext/types';

import t_doces_e_geleias_01_img_01 from '../../assets/images/products/doces-e-geleias/01/t_01.jpg';
import doces_e_geleias_01_img_01 from '../../assets/images/products/doces-e-geleias/01/01.jpg';
import doces_e_geleias_01_img_02 from '../../assets/images/products/doces-e-geleias/01/02.jpg';
import doces_e_geleias_01_img_03 from '../../assets/images/products/doces-e-geleias/01/03.jpg';

import t_doces_e_geleias_02_img_01 from '../../assets/images/products/doces-e-geleias/02/t_01.jpg';
import doces_e_geleias_02_img_01 from '../../assets/images/products/doces-e-geleias/02/01.jpg';
import doces_e_geleias_02_img_02 from '../../assets/images/products/doces-e-geleias/02/02.jpg';
import doces_e_geleias_02_img_03 from '../../assets/images/products/doces-e-geleias/02/03.png';

import t_doces_e_geleias_03_img_01 from '../../assets/images/products/doces-e-geleias/03/t_01.jpg';
import doces_e_geleias_03_img_01 from '../../assets/images/products/doces-e-geleias/03/01.jpg';
import doces_e_geleias_03_img_02 from '../../assets/images/products/doces-e-geleias/03/02.jpg';
import doces_e_geleias_03_img_03 from '../../assets/images/products/doces-e-geleias/03/03.jpg';

import t_doces_e_geleias_04_img_01 from '../../assets/images/products/doces-e-geleias/04/t_01.jpg';
import doces_e_geleias_04_img_01 from '../../assets/images/products/doces-e-geleias/04/01.jpg';
import doces_e_geleias_04_img_02 from '../../assets/images/products/doces-e-geleias/04/02.jpg';
import doces_e_geleias_04_img_03 from '../../assets/images/products/doces-e-geleias/04/03.png';

export const products_doces_e_geleias: Products = [
  {
    id: 'doces-e-geleias-01',
    name: 'Bananinha',
    producer: 'Ralston',
    measure: '30 g',
    description: `A Ralston é uma empresa familiar especializada em produtos derivados de frutas; especialmente, 
    goiaba, banana e abóbora. A Ralston combina uma produção agrícola de alta precisão e cuidado ambiental com a 
    produção de doces de alta qualidade e polpa de fruta. Os doces têm o sabor de doces caseiros, aliados com o 
    diferencial da segurança alimentar, do trabalho e das certificações vigentes.

    A Bananinha Ralston é uma releitura da bananada caseira tradicional em tamanho snack. É produzida com bananas 
    compradas de agricultores locais, amadurecidas naturalmente, selecionadas e descascadas manualmente.`,
    ingredients: `Polpa de banana, açúcar, estabilizante pectina cítrica e acidulante ácido cítrico.`,
    validate: '1 ano',
    filters: {
      isKosher: true,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'ralston',
      categories: 'doces-e-geleias',
    },
    price: 17.65,
    images: [doces_e_geleias_01_img_01, doces_e_geleias_01_img_02, doces_e_geleias_01_img_03],
    thumb: t_doces_e_geleias_01_img_01,
  },

  {
    id: 'doces-e-geleias-02',
    name: 'Goiabada Cascão Zero Adição de Açúcares Cremosa',
    producer: 'Ralston',
    measure: '300 g',
    description: `A Ralston é uma empresa familiar especializada em produtos derivados de frutas; especialmente, 
    goiaba, banana e abóbora. A Ralston combina uma produção agrícola de alta precisão e cuidado ambiental com a 
    produção de doces de alta qualidade e polpa de fruta. Os doces têm o sabor de doces caseiros, aliados com o diferencial 
    da segurança alimentar, do trabalho e das certificações vigentes.

    A Goiabada Cascão Zero Adição de Açúcares Cremosa é uma releitura da goiabada cascão cremosa caseira tradicional, 
    na versão para dietas de ingestão controlada de açúcares. Esta goiabada não tem adição de açúcares, possui apenas 
    açúcares da fruta. Possui textura cremosa, espessa e com pequenos pedaços de casca de goiaba, o que traz ao doce um 
    sabor mais intenso da goiaba. Uma opção com menos calorias que o doce tradicional. É produzida com goiabas Paluma 
    da fazenda Ralston, colhidas e selecionadas manualmente durante todo o ano. É rica em Vitamina C, fonte de Vitamina 
    A e de fibras.`,
    ingredients: `Polpa de goiaba, pedaços de goiaba, fibra solúvel polidextrose, polióis maltitol e eritritol, 
    edulcorante artificial sucralose, edulcorante natural taumatina e antioxidante ácido ascórbico.`,
    validate: '1 ano',
    filters: {
      isKosher: true,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'ralston',
      categories: 'doces-e-geleias',
    },
    price: 27.95,
    images: [doces_e_geleias_02_img_01, doces_e_geleias_02_img_02, doces_e_geleias_02_img_03],
    thumb: t_doces_e_geleias_02_img_01,
  },

  {
    id: 'doces-e-geleias-03',
    name: 'Mel Silvestre',
    producer: 'Beta Mel',
    measure: '300 g',
    description: `A Beta Mel trabalha com mel silvestre produzido por pequenos apicultores do sertão do Piauí.

    O sertão, por não ter atividade agrícola de grande escala, é um lugar especial para o cultivo de abelhas, uma vez 
    que elas não têm acesso a agrotóxicos usados nas plantações. Por isso, o mel da Beta Mel tem uma qualidade e 
    pureza dificilmente encontrados no mercado. Além disso, por ser silvestre, carrega inúmeros sabores das flores nativas 
    da caatinga, trazendo um sabor diferenciado para o consumidor.
    
    Parte do lucro do produtor é destinado as atividades da Escola Beta, que atua no sertão do Piauí com foco em 
    capacitação contextualizada e geração de renda (inclusive na atividade apícola).`,
    ingredients: `Mel Silvestre.`,
    validate: '2 anos',
    filters: {
      isKosher: true,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'beta-mel',
      categories: 'doces-e-geleias',
    },
    price: 45.5,
    images: [doces_e_geleias_03_img_01, doces_e_geleias_03_img_02, doces_e_geleias_03_img_03],
    thumb: t_doces_e_geleias_03_img_01,
  },

  {
    id: 'doces-e-geleias-04',
    name: 'Bananada em Barra',
    producer: 'Ralston',
    measure: '400 g',
    description: `A Ralston é uma empresa familiar especializada em produtos derivados de frutas; especialmente, 
    goiaba, banana e abóbora. A Ralston combina uma produção agrícola de alta precisão e cuidado ambiental com a 
    produção de doces de alta qualidade e polpa de fruta. Os doces têm o sabor de doces caseiros, aliados com o 
    diferencial da segurança alimentar, do trabalho e das certificações vigentes.

    A Bananada Ralston é uma releitura da bananada caseira tradicional. É produzida com bananas compradas de 
    agricultores locais, amadurecidas naturalmente, selecionadas e descascadas manualmente.`,
    ingredients: `Polpa de banana, açúcar, estabilizante pectina cítrica e acidulante ácido cítrico.`,
    validate: '8 meses',
    filters: {
      isKosher: true,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'ralston',
      categories: 'doces-e-geleias',
    },
    price: 5.99,
    images: [doces_e_geleias_04_img_01, doces_e_geleias_04_img_02, doces_e_geleias_04_img_03],
    thumb: t_doces_e_geleias_04_img_01,
  },






  {
    id: 'doces-e-geleias-05',
    name: 'Bananinha',
    producer: 'Ralston',
    measure: '30 g',
    description: `A Ralston é uma empresa familiar especializada em produtos derivados de frutas; especialmente, 
    goiaba, banana e abóbora. A Ralston combina uma produção agrícola de alta precisão e cuidado ambiental com a 
    produção de doces de alta qualidade e polpa de fruta. Os doces têm o sabor de doces caseiros, aliados com o 
    diferencial da segurança alimentar, do trabalho e das certificações vigentes.

    A Bananinha Ralston é uma releitura da bananada caseira tradicional em tamanho snack. É produzida com bananas 
    compradas de agricultores locais, amadurecidas naturalmente, selecionadas e descascadas manualmente.`,
    ingredients: `Polpa de banana, açúcar, estabilizante pectina cítrica e acidulante ácido cítrico.`,
    validate: '1 ano',
    filters: {
      isKosher: true,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'ralston',
      categories: 'doces-e-geleias',
    },
    price: 17.65,
    images: [doces_e_geleias_01_img_01, doces_e_geleias_01_img_02, doces_e_geleias_01_img_03],
    thumb: t_doces_e_geleias_01_img_01,
  },

  {
    id: 'doces-e-geleias-06',
    name: 'Goiabada Cascão Zero Adição de Açúcares Cremosa',
    producer: 'Ralston',
    measure: '300 g',
    description: `A Ralston é uma empresa familiar especializada em produtos derivados de frutas; especialmente, 
    goiaba, banana e abóbora. A Ralston combina uma produção agrícola de alta precisão e cuidado ambiental com a 
    produção de doces de alta qualidade e polpa de fruta. Os doces têm o sabor de doces caseiros, aliados com o diferencial 
    da segurança alimentar, do trabalho e das certificações vigentes.

    A Goiabada Cascão Zero Adição de Açúcares Cremosa é uma releitura da goiabada cascão cremosa caseira tradicional, 
    na versão para dietas de ingestão controlada de açúcares. Esta goiabada não tem adição de açúcares, possui apenas 
    açúcares da fruta. Possui textura cremosa, espessa e com pequenos pedaços de casca de goiaba, o que traz ao doce um 
    sabor mais intenso da goiaba. Uma opção com menos calorias que o doce tradicional. É produzida com goiabas Paluma 
    da fazenda Ralston, colhidas e selecionadas manualmente durante todo o ano. É rica em Vitamina C, fonte de Vitamina 
    A e de fibras.`,
    ingredients: `Polpa de goiaba, pedaços de goiaba, fibra solúvel polidextrose, polióis maltitol e eritritol, 
    edulcorante artificial sucralose, edulcorante natural taumatina e antioxidante ácido ascórbico.`,
    validate: '1 ano',
    filters: {
      isKosher: true,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'ralston',
      categories: 'doces-e-geleias',
    },
    price: 27.95,
    images: [doces_e_geleias_02_img_01, doces_e_geleias_02_img_02, doces_e_geleias_02_img_03],
    thumb: t_doces_e_geleias_02_img_01,
  },

  {
    id: 'doces-e-geleias-07',
    name: 'Mel Silvestre',
    producer: 'Beta Mel',
    measure: '300 g',
    description: `A Beta Mel trabalha com mel silvestre produzido por pequenos apicultores do sertão do Piauí.

    O sertão, por não ter atividade agrícola de grande escala, é um lugar especial para o cultivo de abelhas, uma vez 
    que elas não têm acesso a agrotóxicos usados nas plantações. Por isso, o mel da Beta Mel tem uma qualidade e 
    pureza dificilmente encontrados no mercado. Além disso, por ser silvestre, carrega inúmeros sabores das flores nativas 
    da caatinga, trazendo um sabor diferenciado para o consumidor.
    
    Parte do lucro do produtor é destinado as atividades da Escola Beta, que atua no sertão do Piauí com foco em 
    capacitação contextualizada e geração de renda (inclusive na atividade apícola).`,
    ingredients: `Mel Silvestre.`,
    validate: '2 anos',
    filters: {
      isKosher: true,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'beta-mel',
      categories: 'doces-e-geleias',
    },
    price: 45.5,
    images: [doces_e_geleias_03_img_01, doces_e_geleias_03_img_02, doces_e_geleias_03_img_03],
    thumb: t_doces_e_geleias_03_img_01,
  },

  {
    id: 'doces-e-geleias-08',
    name: 'Bananada em Barra',
    producer: 'Ralston',
    measure: '400 g',
    description: `A Ralston é uma empresa familiar especializada em produtos derivados de frutas; especialmente, 
    goiaba, banana e abóbora. A Ralston combina uma produção agrícola de alta precisão e cuidado ambiental com a 
    produção de doces de alta qualidade e polpa de fruta. Os doces têm o sabor de doces caseiros, aliados com o 
    diferencial da segurança alimentar, do trabalho e das certificações vigentes.

    A Bananada Ralston é uma releitura da bananada caseira tradicional. É produzida com bananas compradas de 
    agricultores locais, amadurecidas naturalmente, selecionadas e descascadas manualmente.`,
    ingredients: `Polpa de banana, açúcar, estabilizante pectina cítrica e acidulante ácido cítrico.`,
    validate: '8 meses',
    filters: {
      isKosher: true,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'ralston',
      categories: 'doces-e-geleias',
    },
    price: 14.45,
    images: [doces_e_geleias_04_img_01, doces_e_geleias_04_img_02, doces_e_geleias_04_img_03],
    thumb: t_doces_e_geleias_04_img_01,
  },
];