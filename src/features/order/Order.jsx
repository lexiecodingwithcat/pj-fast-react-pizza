// Test ID: IIDSAT

import {
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "../order/OrderItem";
import { useEffect } from "react";

import UpdatePriority from "./UpdatePriority";

function Order() {
  const order = useLoaderData();

  // load menu data so that we can include ingredient of each pizza in the order route
  //but without navigate to the menu route
  const fetcher = useFetcher();
  //we want to fetch this data when the page first loads
  useEffect(function () {
    //passing the name of the rout as a prama
    //and it will also have three states as we use navigation
    if (!fetcher.data && fetcher.state === "idle")
      fetcher.load("/menu");
  }, [fetcher]);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(
    estimatedDelivery,
  );

  return (
    // space can give all children a gap
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          Order #{id} Status
        </h2>
        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery:
          {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={
              fetcher.state === "loading"
            }
            ingredients={
              fetcher.data?.find(
                (el) => el.id === item.pizzaId,
              ).ingredients
            }
          />
        ))}
      </ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-small font-medium text-stone-600">
          Price pizza:
          {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-small font-medium text-stone-600">
            Price priority:
            {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery:
          {formatCurrency(
            orderPrice + priorityPrice,
          )}
        </p>
       
      </div>
      {!priority && <UpdatePriority order={order}/>}
    </div>
  );
}

//react router can distinguish the dynamic params in current routes by noticing ":
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
