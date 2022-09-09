import { IProductData } from "../Product";

interface Props {
  each: IProductData;
}
const SimilarProducts = ({ each }: Props) => {
  console.log("HI");
  return (
    <li>
      <p>{each.description}</p>
    </li>
  );
};

export default SimilarProducts;
