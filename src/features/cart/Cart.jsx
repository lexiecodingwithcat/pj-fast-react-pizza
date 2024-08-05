
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";

function Cart() {
  // const cart = fakeCart;

  return (
    <div>
      <LinkButton to="/menu">
        Back to menu
      </LinkButton>

      <h2>Your cart, %NAME%</h2>

      <div>
        
        <Button to="/order/new" type="primary">Order pizzas</Button>
        <Button>Clear Cart</Button>
      </div>
    </div>
  );
}

export default Cart;
