import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
function UpdatePriority({ order }) {
  const fetcher = useFetcher();
  // we wrap the button into the form
  //previously, we use route Form element to POST data, but that one will cause navigation
  //while using fetcher.Form won't navigate to a new route
  return (
    <fetcher.Form
      method="PATCH"
      className="text-right"
    >
      <Button type="primary">
        Make Priority
      </Button>
    </fetcher.Form>
  );
}

export default UpdatePriority;
//params can give us information about the current URL
//so the pramas here is pizzaID
export async function action({
  request,
  params,
}) {
  const data = { priority: true };
  const id = params.orderId;
  //this is an async function so we need to await this function
  await updateOrder(id, data);

  return null;
}
