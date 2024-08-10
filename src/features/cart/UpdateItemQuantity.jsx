import {
  useDispatch,
} from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "./cartSlice";
/*eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onclick={() =>
          dispatch(decreaseItemQuantity(pizzaId))
        }
      >
        -
      </Button>
  <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onclick={() =>
          dispatch(increaseItemQuantity(pizzaId))
        }
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
