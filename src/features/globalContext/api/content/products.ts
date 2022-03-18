import { Products } from '../../../globalContext/types';

import leite_e_derivados_01_img_01 from '../../../../assets/images/products/leite-e-derivados/01/01.jpg';
import leite_e_derivados_01_img_02 from '../../../../assets/images/products/leite-e-derivados/01/02.jpg';
import leite_e_derivados_01_img_03 from '../../../../assets/images/products/leite-e-derivados/01/03.png';

import leite_e_derivados_02_img_01 from '../../../../assets/images/products/leite-e-derivados/02/01.jpg';
import leite_e_derivados_02_img_02 from '../../../../assets/images/products/leite-e-derivados/02/02.jpg';
import leite_e_derivados_02_img_03 from '../../../../assets/images/products/leite-e-derivados/02/03.jpg';

import leite_e_derivados_03_img_01 from '../../../../assets/images/products/leite-e-derivados/03/01.jpg';
import leite_e_derivados_03_img_02 from '../../../../assets/images/products/leite-e-derivados/03/02.jpg';
import leite_e_derivados_03_img_03 from '../../../../assets/images/products/leite-e-derivados/03/03.png';

export const products: Products = [
  {
    id: 'leite-e-derivados-01',
    name: 'Creme de Leite',
    producer: 'Letti A2',
    measure: '1 litro',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
        terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
        todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
        dentro da garrafa em menos de 24h, mais fresco do que nunca.
        O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
        apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
        O Creme de Leite Letti é puro, contém 35% de gordura e possui um ingrediente e mais nada: leite fresco proveniente 
        apenas de vacas A2A2, 100% produzido na Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Creme obtido a partir do leite de vaca. (35% de MG).`,
    validate: '30 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 40.5,
    images: [leite_e_derivados_01_img_01, leite_e_derivados_01_img_02, leite_e_derivados_01_img_03],
  },

  {
    id: 'leite-e-derivados-02',
    name: 'Café com Leite',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
    terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
    todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
    dentro da garrafa em menos de 24h, mais fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
    apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    O Café com Letti é o café gelado da Letti. É feito com leite Tipo A proveniente de vacas A2A2, 100% produzido na 
    Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Leite parcialmente desnatado pasteurizado, açúcar, café solúvel, soro de leite, estabilizante pectina 
    (INS 440) e conservante sorbato de potássio (INS 202).`,
    validate: '18 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: false,
      isLactoseFree: false,
    },
    price: 9.8,
    images: [leite_e_derivados_02_img_01, leite_e_derivados_02_img_02, leite_e_derivados_02_img_03],
  },

  {
    id: 'leite-e-derivados-03',
    name: 'Coalhada Integral',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros 
    por meio do respeito à terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, 
    desde a ordenha até o envase. As vacas, todas nascidas na fazenda, ficam a 30 metros do laticínio 
    e isso garante que o leite seja totalmente rastreado e esteja dentro da garrafa em menos de 24h, mais 
    fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil 
    digestão por conter apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    A Coalhada integral Letti é feita apenas com dois ingredientes: leite tipo A proveniente de vacas 
    A2A2 e fermento vivo. É 100% produzida na na Fazenda da Letti (Agrindus). A embalagem é PET, 
    totalmente reciclável.`,
    ingredients: `Leite integral e fermento lácteo`,
    validate: '54 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 20.2,
    images: [leite_e_derivados_03_img_01, leite_e_derivados_03_img_02, leite_e_derivados_03_img_03],
  },











  {
    id: 'leite-e-derivados-04',
    name: 'Creme de Leite',
    producer: 'Letti A2',
    measure: '1 litro',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
        terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
        todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
        dentro da garrafa em menos de 24h, mais fresco do que nunca.
        O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
        apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
        O Creme de Leite Letti é puro, contém 35% de gordura e possui um ingrediente e mais nada: leite fresco proveniente 
        apenas de vacas A2A2, 100% produzido na Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Creme obtido a partir do leite de vaca. (35% de MG).`,
    validate: '30 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 40.5,
    images: [leite_e_derivados_01_img_01, leite_e_derivados_01_img_02, leite_e_derivados_01_img_03],
  },

  {
    id: 'leite-e-derivados-05',
    name: 'Café com Leite',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
    terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
    todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
    dentro da garrafa em menos de 24h, mais fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
    apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    O Café com Letti é o café gelado da Letti. É feito com leite Tipo A proveniente de vacas A2A2, 100% produzido na 
    Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Leite parcialmente desnatado pasteurizado, açúcar, café solúvel, soro de leite, estabilizante pectina 
    (INS 440) e conservante sorbato de potássio (INS 202).`,
    validate: '18 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: false,
      isLactoseFree: false,
    },
    price: 9.8,
    images: [leite_e_derivados_02_img_01, leite_e_derivados_02_img_02, leite_e_derivados_02_img_03],
  },

  {
    id: 'leite-e-derivados-06',
    name: 'Coalhada Integral',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros 
    por meio do respeito à terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, 
    desde a ordenha até o envase. As vacas, todas nascidas na fazenda, ficam a 30 metros do laticínio 
    e isso garante que o leite seja totalmente rastreado e esteja dentro da garrafa em menos de 24h, mais 
    fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil 
    digestão por conter apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    A Coalhada integral Letti é feita apenas com dois ingredientes: leite tipo A proveniente de vacas 
    A2A2 e fermento vivo. É 100% produzida na na Fazenda da Letti (Agrindus). A embalagem é PET, 
    totalmente reciclável.`,
    ingredients: `Leite integral e fermento lácteo`,
    validate: '54 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 20.2,
    images: [leite_e_derivados_03_img_01, leite_e_derivados_03_img_02, leite_e_derivados_03_img_03],
  },

  {
    id: 'leite-e-derivados-07',
    name: 'Creme de Leite',
    producer: 'Letti A2',
    measure: '1 litro',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
        terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
        todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
        dentro da garrafa em menos de 24h, mais fresco do que nunca.
        O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
        apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
        O Creme de Leite Letti é puro, contém 35% de gordura e possui um ingrediente e mais nada: leite fresco proveniente 
        apenas de vacas A2A2, 100% produzido na Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Creme obtido a partir do leite de vaca. (35% de MG).`,
    validate: '30 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 40.5,
    images: [leite_e_derivados_01_img_01, leite_e_derivados_01_img_02, leite_e_derivados_01_img_03],
  },

  {
    id: 'leite-e-derivados-08',
    name: 'Café com Leite',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
    terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
    todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
    dentro da garrafa em menos de 24h, mais fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
    apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    O Café com Letti é o café gelado da Letti. É feito com leite Tipo A proveniente de vacas A2A2, 100% produzido na 
    Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Leite parcialmente desnatado pasteurizado, açúcar, café solúvel, soro de leite, estabilizante pectina 
    (INS 440) e conservante sorbato de potássio (INS 202).`,
    validate: '18 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: false,
      isLactoseFree: false,
    },
    price: 9.8,
    images: [leite_e_derivados_02_img_01, leite_e_derivados_02_img_02, leite_e_derivados_02_img_03],
  },

  {
    id: 'leite-e-derivados-09',
    name: 'Coalhada Integral',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros 
    por meio do respeito à terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, 
    desde a ordenha até o envase. As vacas, todas nascidas na fazenda, ficam a 30 metros do laticínio 
    e isso garante que o leite seja totalmente rastreado e esteja dentro da garrafa em menos de 24h, mais 
    fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil 
    digestão por conter apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    A Coalhada integral Letti é feita apenas com dois ingredientes: leite tipo A proveniente de vacas 
    A2A2 e fermento vivo. É 100% produzida na na Fazenda da Letti (Agrindus). A embalagem é PET, 
    totalmente reciclável.`,
    ingredients: `Leite integral e fermento lácteo`,
    validate: '54 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 20.2,
    images: [leite_e_derivados_03_img_01, leite_e_derivados_03_img_02, leite_e_derivados_03_img_03],
  },

  {
    id: 'leite-e-derivados-10',
    name: 'Creme de Leite',
    producer: 'Letti A2',
    measure: '1 litro',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
        terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
        todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
        dentro da garrafa em menos de 24h, mais fresco do que nunca.
        O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
        apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
        O Creme de Leite Letti é puro, contém 35% de gordura e possui um ingrediente e mais nada: leite fresco proveniente 
        apenas de vacas A2A2, 100% produzido na Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Creme obtido a partir do leite de vaca. (35% de MG).`,
    validate: '30 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 40.5,
    images: [leite_e_derivados_01_img_01, leite_e_derivados_01_img_02, leite_e_derivados_01_img_03],
  },

  {
    id: 'leite-e-derivados-11',
    name: 'Café com Leite',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
    terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
    todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
    dentro da garrafa em menos de 24h, mais fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
    apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    O Café com Letti é o café gelado da Letti. É feito com leite Tipo A proveniente de vacas A2A2, 100% produzido na 
    Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Leite parcialmente desnatado pasteurizado, açúcar, café solúvel, soro de leite, estabilizante pectina 
    (INS 440) e conservante sorbato de potássio (INS 202).`,
    validate: '18 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: false,
      isLactoseFree: false,
    },
    price: 9.8,
    images: [leite_e_derivados_02_img_01, leite_e_derivados_02_img_02, leite_e_derivados_02_img_03],
  },

  {
    id: 'leite-e-derivados-12',
    name: 'Coalhada Integral',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros 
    por meio do respeito à terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, 
    desde a ordenha até o envase. As vacas, todas nascidas na fazenda, ficam a 30 metros do laticínio 
    e isso garante que o leite seja totalmente rastreado e esteja dentro da garrafa em menos de 24h, mais 
    fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil 
    digestão por conter apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    A Coalhada integral Letti é feita apenas com dois ingredientes: leite tipo A proveniente de vacas 
    A2A2 e fermento vivo. É 100% produzida na na Fazenda da Letti (Agrindus). A embalagem é PET, 
    totalmente reciclável.`,
    ingredients: `Leite integral e fermento lácteo`,
    validate: '54 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 20.2,
    images: [leite_e_derivados_03_img_01, leite_e_derivados_03_img_02, leite_e_derivados_03_img_03],
  },


  {
    id: 'leite-e-derivados-13',
    name: 'Creme de Leite',
    producer: 'Letti A2',
    measure: '1 litro',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
        terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
        todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
        dentro da garrafa em menos de 24h, mais fresco do que nunca.
        O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
        apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
        O Creme de Leite Letti é puro, contém 35% de gordura e possui um ingrediente e mais nada: leite fresco proveniente 
        apenas de vacas A2A2, 100% produzido na Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Creme obtido a partir do leite de vaca. (35% de MG).`,
    validate: '30 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 40.5,
    images: [leite_e_derivados_01_img_01, leite_e_derivados_01_img_02, leite_e_derivados_01_img_03],
  },

  {
    id: 'leite-e-derivados-14',
    name: 'Café com Leite',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
    terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
    todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
    dentro da garrafa em menos de 24h, mais fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
    apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    O Café com Letti é o café gelado da Letti. É feito com leite Tipo A proveniente de vacas A2A2, 100% produzido na 
    Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Leite parcialmente desnatado pasteurizado, açúcar, café solúvel, soro de leite, estabilizante pectina 
    (INS 440) e conservante sorbato de potássio (INS 202).`,
    validate: '18 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: false,
      isLactoseFree: false,
    },
    price: 9.8,
    images: [leite_e_derivados_02_img_01, leite_e_derivados_02_img_02, leite_e_derivados_02_img_03],
  },

  {
    id: 'leite-e-derivados-15',
    name: 'Coalhada Integral',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros 
    por meio do respeito à terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, 
    desde a ordenha até o envase. As vacas, todas nascidas na fazenda, ficam a 30 metros do laticínio 
    e isso garante que o leite seja totalmente rastreado e esteja dentro da garrafa em menos de 24h, mais 
    fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil 
    digestão por conter apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    A Coalhada integral Letti é feita apenas com dois ingredientes: leite tipo A proveniente de vacas 
    A2A2 e fermento vivo. É 100% produzida na na Fazenda da Letti (Agrindus). A embalagem é PET, 
    totalmente reciclável.`,
    ingredients: `Leite integral e fermento lácteo`,
    validate: '54 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 20.2,
    images: [leite_e_derivados_03_img_01, leite_e_derivados_03_img_02, leite_e_derivados_03_img_03],
  },


  {
    id: 'leite-e-derivados-16',
    name: 'Creme de Leite',
    producer: 'Letti A2',
    measure: '1 litro',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
        terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
        todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
        dentro da garrafa em menos de 24h, mais fresco do que nunca.
        O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
        apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
        O Creme de Leite Letti é puro, contém 35% de gordura e possui um ingrediente e mais nada: leite fresco proveniente 
        apenas de vacas A2A2, 100% produzido na Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Creme obtido a partir do leite de vaca. (35% de MG).`,
    validate: '30 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 40.5,
    images: [leite_e_derivados_01_img_01, leite_e_derivados_01_img_02, leite_e_derivados_01_img_03],
  },

  {
    id: 'leite-e-derivados-17',
    name: 'Café com Leite',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
    terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
    todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
    dentro da garrafa em menos de 24h, mais fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
    apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    O Café com Letti é o café gelado da Letti. É feito com leite Tipo A proveniente de vacas A2A2, 100% produzido na 
    Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Leite parcialmente desnatado pasteurizado, açúcar, café solúvel, soro de leite, estabilizante pectina 
    (INS 440) e conservante sorbato de potássio (INS 202).`,
    validate: '18 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: false,
      isLactoseFree: false,
    },
    price: 9.8,
    images: [leite_e_derivados_02_img_01, leite_e_derivados_02_img_02, leite_e_derivados_02_img_03],
  },

  {
    id: 'leite-e-derivados-18',
    name: 'Coalhada Integral',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros 
    por meio do respeito à terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, 
    desde a ordenha até o envase. As vacas, todas nascidas na fazenda, ficam a 30 metros do laticínio 
    e isso garante que o leite seja totalmente rastreado e esteja dentro da garrafa em menos de 24h, mais 
    fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil 
    digestão por conter apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    A Coalhada integral Letti é feita apenas com dois ingredientes: leite tipo A proveniente de vacas 
    A2A2 e fermento vivo. É 100% produzida na na Fazenda da Letti (Agrindus). A embalagem é PET, 
    totalmente reciclável.`,
    ingredients: `Leite integral e fermento lácteo`,
    validate: '54 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 20.2,
    images: [leite_e_derivados_03_img_01, leite_e_derivados_03_img_02, leite_e_derivados_03_img_03],
  },


  {
    id: 'leite-e-derivados-19',
    name: 'Creme de Leite',
    producer: 'Letti A2',
    measure: '1 litro',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
        terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
        todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
        dentro da garrafa em menos de 24h, mais fresco do que nunca.
        O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
        apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
        O Creme de Leite Letti é puro, contém 35% de gordura e possui um ingrediente e mais nada: leite fresco proveniente 
        apenas de vacas A2A2, 100% produzido na Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Creme obtido a partir do leite de vaca. (35% de MG).`,
    validate: '30 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 40.5,
    images: [leite_e_derivados_01_img_01, leite_e_derivados_01_img_02, leite_e_derivados_01_img_03],
  },

  {
    id: 'leite-e-derivados-20',
    name: 'Café com Leite',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros por meio do respeito à 
    terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, desde a ordenha até o envase. As vacas, 
    todas nascidas na fazenda, ficam a 30 metros do laticínio e isso garante que o leite seja totalmente rastreado e esteja 
    dentro da garrafa em menos de 24h, mais fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil digestão por conter 
    apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    O Café com Letti é o café gelado da Letti. É feito com leite Tipo A proveniente de vacas A2A2, 100% produzido na 
    Fazenda da Letti (Agrindus). A embalagem é PET, totalmente reciclável.`,
    ingredients: `Leite parcialmente desnatado pasteurizado, açúcar, café solúvel, soro de leite, estabilizante pectina 
    (INS 440) e conservante sorbato de potássio (INS 202).`,
    validate: '18 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: false,
      isNatural: false,
      isLactoseFree: false,
    },
    price: 9.8,
    images: [leite_e_derivados_02_img_01, leite_e_derivados_02_img_02, leite_e_derivados_02_img_03],
  },

  {
    id: 'leite-e-derivados-21',
    name: 'Coalhada Integral',
    producer: 'Letti A2',
    measure: '600 gr',
    description: `A Letti A2 nasceu com a missão de sempre oferecer alimentos frescos e seguros 
    por meio do respeito à terra e ao bem estar animal. Todos os produtos são 100% feitos na fazenda, 
    desde a ordenha até o envase. As vacas, todas nascidas na fazenda, ficam a 30 metros do laticínio 
    e isso garante que o leite seja totalmente rastreado e esteja dentro da garrafa em menos de 24h, mais 
    fresco do que nunca.
    O leite é Tipo A, proveniente apenas de vacas A2A2, o que garante produtos naturalmente de fácil 
    digestão por conter apenas a proteína beta-caseína A2, a mesma proteína encontrada no leite materno.
    A Coalhada integral Letti é feita apenas com dois ingredientes: leite tipo A proveniente de vacas 
    A2A2 e fermento vivo. É 100% produzida na na Fazenda da Letti (Agrindus). A embalagem é PET, 
    totalmente reciclável.`,
    ingredients: `Leite integral e fermento lácteo`,
    validate: '54 dias',
    filters: {
      isKosher: true,
      isA2A2: true,
      isGlutenFree: true,
      isSugarFree: true,
      isNatural: true,
      isLactoseFree: false,
    },
    price: 20.2,
    images: [leite_e_derivados_03_img_01, leite_e_derivados_03_img_02, leite_e_derivados_03_img_03],
  },
];