/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {
  useDispatch,
  useSelector,
} from "react-redux";
import { formatCurrency } from "../../utils/helpers.js";

import DeleteItem from "./DeleteItem.jsx";
import UpdateItemQuantity from "./UpdateItemQuantity.jsx";
import { getCurrentQuantityById } from "./cartSlice.js";

function CartItem({item}) {
  const { pizzaId, name, quantity, totalPrice } =
    item;
  const currentQuantity = useSelector(
    getCurrentQuantityById(pizzaId),
  );

  return (
    <li className="sm: items-center py-3 sm:flex sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">
          {formatCurrency(totalPrice)}
        </p>
    
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
