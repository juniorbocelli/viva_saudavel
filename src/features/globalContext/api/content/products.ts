import { Products } from '../../../globalContext/types';
import img_01 from '../../../../assets/images/products/leite-e-derivados/01/01.jpg';
import img_02 from '../../../../assets/images/products/leite-e-derivados/01/02.jpg';
import img_03 from '../../../../assets/images/products/leite-e-derivados/01/03.png';

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
    images: [img_01, img_02, img_03],
  },
];