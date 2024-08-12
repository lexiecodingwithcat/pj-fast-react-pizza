import {
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import EmptyCart from "../cart/EmptyCart";
import Button from "../../ui/Button";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  clearCart,
  getCart,
  getTotalCartPrice,
} from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

/* eslint-disable no-unused-vars */

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  //local state
  const [withPriority, setWithPriority] =
    useState(false);

  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting";
  // we can get access to whatever return from the action function
  //in case there is no submission
  const formErrors = useActionData();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);
  const isLoadingAddress =
    addressStatus === "loading";
  const totalCartPrice = useSelector(
    getTotalCartPrice,
  );
  const priorityPrice = withPriority
    ? totalCartPrice * 0.2
    : 0;
  const totalPrice =
    totalCartPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Lets go!
      </h2>
      {/* action will be the path that this form will be submitted to  */}
      <Form method="POST" action="/order/new">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* basis is the original size of the box */}
          {/* if there is no basis then it will be auto: the original size of the content */}
          <label className="sm:basis-40">
            First Name
          </label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              required
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">
            Address
          </label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude &&
            !position.longitude && (
              <span className="sm:top=[3px] absolute right-[3px] top-[35px] z-50 sm:top-[3px] md:right-[5px] md:top-[5px]">
                <Button
                  type="small"
                  onclick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                  disabled={isLoadingAddress}
                >
                  Get position
                </Button>
              </span>
            )}
        </div>

        <div className="mb-12 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) =>
              setWithPriority(e.target.checked)
            }
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label
            htmlFor="priority"
            className="font-medium"
          >
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* we use this hidden input to pass the cart data to action function since it is part of form */}
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
          />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude &&
              position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button
            disabled={
              isSubmitting || isLoadingAddress
            }
            type="primary"
          >
            {isSubmitting
              ? "Placing order..."
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
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
    priority: data.priority === "true",
  };

  //check whether the phone number is valid or not
  const errors = {};
  if (!isValidPhone(order.phone))
    //we add phone property to the error object
    errors.phone =
      "Please give us your correct phone number. We may need it to contact you.";
  // if there is any error it will be sent back to the front as a response
  // the form will receive error as FormError
  if (Object.keys(errors).length > 0)
    return errors;

  const newOrder = await createOrder(order);
  //after placed the order the cart should be empted
  //but we cant use dispatch in regular function, that one only for react component
  store.dispatch(clearCart());

  //here we need to redirect to the order/:orderId page
  //but we cant use the useNavigate hook because it can only be used inside component
  //DO NOT OVERUSE
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
