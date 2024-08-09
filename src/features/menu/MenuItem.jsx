import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  addItem,
  getCurrentQuantityById,
} from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
function MenuItem({ pizza }) {
  const {
    id,
    name,
    unitPrice,
    ingredients,
    soldOut,
    imageUrl,
  } = pizza;
  const dispatch = useDispatch();

  const currentQuantity = useSelector(
    //a getCurrentQuantityById will return another useSelector function with state as prama
    getCurrentQuantityById(id),
  );
  const isInCart = currentQuantity > 0;
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };

    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-80 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {/* only the pizza is in the cart, we present the delete button */}
          
          {isInCart && (
            <DeleteItem pizzaId={id} />
          )}
          {/* we only want to disply the add button when pizza is not sold out and is not in cart */}
          {!soldOut && !isInCart && (
            <Button
              type="small"
              onclick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
