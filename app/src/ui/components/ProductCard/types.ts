import { Product, ProductCard } from '../../../globals/interfaces/product';

export interface IProductCardProps {
    productCard: ProductCard;
    setProduct: React.Dispatch<React.SetStateAction<null | Product>>;
};