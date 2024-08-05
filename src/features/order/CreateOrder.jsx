// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  // we can get access to whatever return from the action function
  //in case there is no submission
  const formErrors = useActionData();
  return (
    <div>
      <h2>Ready to order? Lets go!</h2>
      {/* action will be the path that this form will be submitted to  */}
      <Form method="POST" action="/order/new">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required className="input" />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required className="input" />
          </div>
        </div>
        {formErrors?.phone && <p>{formErrors.phone}</p>}
        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required className="input" />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {/* we use this hidden input to pass the cart data to action function since it is part of form */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
         
         <Button disabled={isSubmitting} type="primary">{isSubmitting ? "Placing order..." : "Order now"}</Button>
          
        </div>
      </Form>
    </div>
  );
}
//  as soon as we submit the form it will create a request that be intercepted by action function
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  //since we stringfy the cart object to a string
  // we need to convert it back to an object
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  //check whether the phone number is valid or not
  const errors = {};
  if (!isValidPhone(order.phone))
    //we add phone property to the error object
    errors.phone =
      "Please give us your correct phone number. We may need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  //here we need to redirect to the order/:orderId page
  //but we cant use the useNavigate hook becaus eit can only be used inside component
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
