import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  clearCart,
  getCart,
  getTotalCartQuantity,
} from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  //the useSelector will call the getCart function automatically
  // so no need to write getCart()
  const cart = useSelector(getCart);
  const username = useSelector(
    (state) => state.user.username,
  );
  const cartQuantity = useSelector(
    getTotalCartQuantity,
  );
  const dispatch = useDispatch();

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">
        Back to menu
      </LinkButton>

      <h2 className="mt-7 text-xl font-semibold">
        Your cart, {username}
      </h2>
      <ul className="divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem
            item={item}
            key={item.pizzaId}
          />
        ))}
      </ul>
      {cartQuantity === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mt-6 space-x-2">
          <Button to="/order/new" type="primary">
            Order pizzas
          </Button>
          <Button
            type="secondary"
            onclick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
