import { Products } from '../../features/globalContext/types';

import t_bebidas_01_img_01 from '../../assets/images/products/bebidas/01/t_01.jpg';
import bebidas_01_img_01 from '../../assets/images/products/bebidas/01/01.jpg';
import bebidas_01_img_02 from '../../assets/images/products/bebidas/01/02.jpg';
import bebidas_01_img_03 from '../../assets/images/products/bebidas/01/03.jpg';

import t_bebidas_02_img_01 from '../../assets/images/products/bebidas/02/t_01.jpg';
import bebidas_02_img_01 from '../../assets/images/products/bebidas/02/01.jpg';
import bebidas_02_img_02 from '../../assets/images/products/bebidas/02/02.jpg';
import bebidas_02_img_03 from '../../assets/images/products/bebidas/02/03.png';

import t_bebidas_03_img_01 from '../../assets/images/products/bebidas/03/t_01.jpg';
import bebidas_03_img_01 from '../../assets/images/products/bebidas/03/01.jpg';
import bebidas_03_img_02 from '../../assets/images/products/bebidas/03/02.jpg';
import bebidas_03_img_03 from '../../assets/images/products/bebidas/03/03.png';

import t_bebidas_04_img_01 from '../../assets/images/products/bebidas/04/t_01.jpg';
import bebidas_04_img_01 from '../../assets/images/products/bebidas/04/01.jpg';
import bebidas_04_img_02 from '../../assets/images/products/bebidas/04/02.jpg';
import bebidas_04_img_03 from '../../assets/images/products/bebidas/04/03.jpg';

export const products_bebidas: Products = [
  {
    id: 'bebidas-01',
    name: 'Suco de Laranja Integral',
    producer: 'Xandô',
    measure: '1,5 l',
    description: `O Suco de Laranja Integral Xandô é feito com um único ingrediente: laranja. Por isso é gostoso, puro e 
    parece que foi espremido na hora. É sem adição de açúcar ou água, é uma importante fonte de fibras, vitamina C, potássio, 
    cálcio, ácido fólico, entre outras vitaminas e sais minerais que repõe as nossas necessidades diariamente. SEM aditivos, 
    SEM conservantes, SEM corantes e SEM aromatizantes. Não contém glutém, sua embalagem é 100% reciclável e possui 
    certificação Kosher o que o torna autorizado para consumo dentro das normas religiosas, conforme as leis judaicas.


    A Xandô, pioneira na venda do leite tipo A pasteurizado, comercializa, desde 1997, suco 100% natural, concentrado, 
    livre de conservantes, açúcar e qualquer outro aditivo. O envase é todo automatizado, cuidado desde o desenvolvimento 
    da variedade da muda, seu plantio adequado, a colheita cuidadosa e no momento certo, a seleção das melhores frutas, 
    extração e pasteurização que mantém os nutrientes da fruta e o frescor 100% natural. Todo esse cuidado garante um 
    produto puro, fresco e natural.`,
    ingredients: `Suco de laranja natural integral, não alcoólico, não fermentado e sem adição de açúcar, aditivos e 
    conservantes.`,
    validate: '2 meses',
    filters: {
      isKosher: true,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'xando',
      categories: 'bebidas',
    },
    price: 15.63,
    images: [bebidas_01_img_01, bebidas_01_img_02, bebidas_01_img_03],
    thumb: t_bebidas_01_img_01,
  },

  {
    id: 'bebidas-02',
    name: 'Chá Verde com Hibisco Dente-de-leão e Cavalinha',
    producer: 'Villa Piva',
    measure: '1 litro',
    description: `A Villa Piva é uma marca que estimula e promove uma rotina saudável de alimentação, prezando pela 
    garantia de ingredientes de origem, processos transparentes de produção e linhas de produto criativas, desenvolvidas 
    com intuito de promover uma melhor qualidade de vida aos seus consumidores.

    As frutas são colhidas manualmente, com especial atenção na qualidade, visando sempre a coleta das mais homogêneas. 
    Após colhidas, as frutas são estocadas por, no máximo, 24 horas antes de seguirem para o processamento do suco, levando 
    mais frescor para o produto final.
    
    Além do frescor e sabor das frutas do Vale dos Vinhedos, os sucos, chás e água de coco trazem diversos benefícios à 
    saúde, proporcionando alto poder antioxidante ao organismo.
    
    O Chá Verde Villa Piva a é 100% natural, sem conservantes e ingredientes artificiais, e zero adição de açucares.
    
    O chá verde possui polifenóis, catequinas e flavonoides, compostos antioxidantes que auxiliam na saúde do coração 
    e da pressão arterial, contribuindo para perda de gordura e emagrecimento. A flor de hibiscus contém antocianinas, 
    compostos altamente antioxidantes. A flor dente-de-leão contém compostos bioativos que ajudam na manutenção da 
    integridade das células do corpo humano. E a cavalinha é uma planta utilizada como diurético em casos de obesidade 
    com retenção de líquido.`,
    ingredients: `Água, Suco Concentrado de Maçã, Extratos de Chá Verde, Hibisco, Cavalinha e Dente-de-Leão e 
    Aromatizante Aroma Natural de Hibisco.`,
    validate: '9 meses',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'villa-piva',
      categories: 'bebidas',
    },
    price: 18.0,
    images: [bebidas_02_img_01, bebidas_02_img_02, bebidas_02_img_03],
    thumb: t_bebidas_02_img_01,
  },

  {
    id: 'bebidas-03',
    name: 'Suco de Uva',
    producer: 'Villa Piva',
    measure: '1 litro',
    description: `A Villa Piva é uma marca que estimula e promove uma rotina saudável de alimentação, prezando pela garantia 
    de ingredientes de origem, processos transparentes de produção e linhas de produto criativas, desenvolvidas com intuito 
    de promover uma melhor qualidade de vida aos seus consumidores.

    As frutas são colhidas manualmente, com especial atenção na qualidade, visando sempre a coleta das mais homogêneas. 
    Após colhidas, as frutas são estocadas por, no máximo, 24 horas antes de seguirem para o processamento do suco, levando 
    mais frescor para o produto final.
    
    Além do frescor e sabor das frutas do Vale dos Vinhedos, os sucos, chás e água de coco trazem diversos benefícios à 
    saúde, proporcionando alto poder antioxidante ao organismo.
    
    O Suco de Uva Villa Piva é 100% integral. É suco de uva – aproximadamente 2kg por litro – direto para a garrafa, sem 
    conservantes, sem diluição em água, e zero adição de açucares.
    
    A uva é rica em flavonoides, compostos naturais que ajudam na prevenção de diversas doenças como o câncer. Os componentes 
    do suco ajudam na prevenção de doenças cardiovasculares e na redução da pressão. O consumo diário de suco de uva 
    contribui com as necessidades diárias de cálcio, ferro, potássio, manganês, cobre e zinco, além de estimular o bom 
    funcionamento dos rins, a limpeza do fígado e eliminação do ácido úrico do organismo.`,
    ingredients: `Suco Integral de Uva Tinto.`,
    validate: '9 meses',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'villa-piva',
      categories: 'bebidas',
    },
    price: 21.0,
    images: [bebidas_03_img_01, bebidas_03_img_02, bebidas_03_img_03],
    thumb: t_bebidas_03_img_01,
  },

  {
    id: 'bebidas-04',
    name: 'Água sem Gás',
    producer: 'Água na Caixa',
    measure: '500 ml',
    description: `A Água na Caixa ® nasceu do sonho de tornar o consumo de água fora de casa mais sustentável. A tampa e o 
    topo da garrafa são feitos de cana-de-açúcar e o papel é feito com madeira de florestas certificadas.


    A embalagem é reutilizável, 82% renovável, ou seja, feita quase só de plantas (54% de papel e 28% de plástico verde) e 
    100% reciclável. `,
    ingredients: `Água Mineral Natural Fluoretada.`,
    validate: '1 ano',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'agua-na-caixa',
      categories: 'bebidas',
    },
    price: 5.99,
    images: [bebidas_04_img_01, bebidas_04_img_02, bebidas_04_img_03],
    thumb: t_bebidas_04_img_01,
  },






  {
    id: 'bebidas-05',
    name: 'Suco de Laranja Integral',
    producer: 'Xandô',
    measure: '1,5 l',
    description: `O Suco de Laranja Integral Xandô é feito com um único ingrediente: laranja. Por isso é gostoso, puro e 
    parece que foi espremido na hora. É sem adição de açúcar ou água, é uma importante fonte de fibras, vitamina C, potássio, 
    cálcio, ácido fólico, entre outras vitaminas e sais minerais que repõe as nossas necessidades diariamente. SEM aditivos, 
    SEM conservantes, SEM corantes e SEM aromatizantes. Não contém glutém, sua embalagem é 100% reciclável e possui 
    certificação Kosher o que o torna autorizado para consumo dentro das normas religiosas, conforme as leis judaicas.


    A Xandô, pioneira na venda do leite tipo A pasteurizado, comercializa, desde 1997, suco 100% natural, concentrado, 
    livre de conservantes, açúcar e qualquer outro aditivo. O envase é todo automatizado, cuidado desde o desenvolvimento 
    da variedade da muda, seu plantio adequado, a colheita cuidadosa e no momento certo, a seleção das melhores frutas, 
    extração e pasteurização que mantém os nutrientes da fruta e o frescor 100% natural. Todo esse cuidado garante um 
    produto puro, fresco e natural.`,
    ingredients: `Suco de laranja natural integral, não alcoólico, não fermentado e sem adição de açúcar, aditivos e 
    conservantes.`,
    validate: '2 meses',
    filters: {
      isKosher: true,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'xando',
      categories: 'bebidas',
    },
    price: 15.63,
    images: [bebidas_01_img_01, bebidas_01_img_02, bebidas_01_img_03],
    thumb: t_bebidas_01_img_01,
  },

  {
    id: 'bebidas-06',
    name: 'Chá Verde com Hibisco Dente-de-leão e Cavalinha',
    producer: 'Villa Piva',
    measure: '1 litro',
    description: `A Villa Piva é uma marca que estimula e promove uma rotina saudável de alimentação, prezando pela 
    garantia de ingredientes de origem, processos transparentes de produção e linhas de produto criativas, desenvolvidas 
    com intuito de promover uma melhor qualidade de vida aos seus consumidores.

    As frutas são colhidas manualmente, com especial atenção na qualidade, visando sempre a coleta das mais homogêneas. 
    Após colhidas, as frutas são estocadas por, no máximo, 24 horas antes de seguirem para o processamento do suco, levando 
    mais frescor para o produto final.
    
    Além do frescor e sabor das frutas do Vale dos Vinhedos, os sucos, chás e água de coco trazem diversos benefícios à 
    saúde, proporcionando alto poder antioxidante ao organismo.
    
    O Chá Verde Villa Piva a é 100% natural, sem conservantes e ingredientes artificiais, e zero adição de açucares.
    
    O chá verde possui polifenóis, catequinas e flavonoides, compostos antioxidantes que auxiliam na saúde do coração 
    e da pressão arterial, contribuindo para perda de gordura e emagrecimento. A flor de hibiscus contém antocianinas, 
    compostos altamente antioxidantes. A flor dente-de-leão contém compostos bioativos que ajudam na manutenção da 
    integridade das células do corpo humano. E a cavalinha é uma planta utilizada como diurético em casos de obesidade 
    com retenção de líquido.`,
    ingredients: `Água, Suco Concentrado de Maçã, Extratos de Chá Verde, Hibisco, Cavalinha e Dente-de-Leão e 
    Aromatizante Aroma Natural de Hibisco.`,
    validate: '9 meses',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'villa-piva',
      categories: 'bebidas',
    },
    price: 18.0,
    images: [bebidas_02_img_01, bebidas_02_img_02, bebidas_02_img_03],
    thumb: t_bebidas_02_img_01,
  },

  {
    id: 'bebidas-07',
    name: 'Suco de Uva',
    producer: 'Villa Piva',
    measure: '1 litro',
    description: `A Villa Piva é uma marca que estimula e promove uma rotina saudável de alimentação, prezando pela garantia 
    de ingredientes de origem, processos transparentes de produção e linhas de produto criativas, desenvolvidas com intuito 
    de promover uma melhor qualidade de vida aos seus consumidores.

    As frutas são colhidas manualmente, com especial atenção na qualidade, visando sempre a coleta das mais homogêneas. 
    Após colhidas, as frutas são estocadas por, no máximo, 24 horas antes de seguirem para o processamento do suco, levando 
    mais frescor para o produto final.
    
    Além do frescor e sabor das frutas do Vale dos Vinhedos, os sucos, chás e água de coco trazem diversos benefícios à 
    saúde, proporcionando alto poder antioxidante ao organismo.
    
    O Suco de Uva Villa Piva é 100% integral. É suco de uva – aproximadamente 2kg por litro – direto para a garrafa, sem 
    conservantes, sem diluição em água, e zero adição de açucares.
    
    A uva é rica em flavonoides, compostos naturais que ajudam na prevenção de diversas doenças como o câncer. Os componentes 
    do suco ajudam na prevenção de doenças cardiovasculares e na redução da pressão. O consumo diário de suco de uva 
    contribui com as necessidades diárias de cálcio, ferro, potássio, manganês, cobre e zinco, além de estimular o bom 
    funcionamento dos rins, a limpeza do fígado e eliminação do ácido úrico do organismo.`,
    ingredients: `Suco Integral de Uva Tinto.`,
    validate: '9 meses',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'villa-piva',
      categories: 'bebidas',
    },
    price: 21.0,
    images: [bebidas_03_img_01, bebidas_03_img_02, bebidas_03_img_03],
    thumb: t_bebidas_03_img_01,
  },

  {
    id: 'bebidas-08',
    name: 'Água sem Gás',
    producer: 'Água na Caixa',
    measure: '500 ml',
    description: `A Água na Caixa ® nasceu do sonho de tornar o consumo de água fora de casa mais sustentável. A tampa e o 
    topo da garrafa são feitos de cana-de-açúcar e o papel é feito com madeira de florestas certificadas.


    A embalagem é reutilizável, 82% renovável, ou seja, feita quase só de plantas (54% de papel e 28% de plástico verde) e 
    100% reciclável. `,
    ingredients: `Água Mineral Natural Fluoretada.`,
    validate: '1 ano',
    filters: {
      isKosher: false,
      isA2A2: false,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: true,

      producerCode: 'agua-na-caixa',
      categories: 'bebidas',
    },
    price: 5.99,
    images: [bebidas_04_img_01, bebidas_04_img_02, bebidas_04_img_03],
    thumb: t_bebidas_04_img_01,
  },
];