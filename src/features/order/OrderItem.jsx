/* eslint-disable no-unused-vars */

import { formatCurrency } from "../../utils/helpers";

/* eslint-disable react/prop-types */
function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-1">
      <div className="flex items-center justify-between text-sm">
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients
          ? "loading..."
          : ingredients?.join(",") }
      </p>
    </li>
  );
}

export default OrderItem;
