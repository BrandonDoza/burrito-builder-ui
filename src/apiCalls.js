export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders").then((response) => response.json());
};


export const postOrder = (newOrder) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: "POST",
    body: JSON.stringify(newOrder),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (!response.ok) {
      throw new Error('there was a problem adding  you order')
    } else {
      return response.json()
    }
  })
  .catch(error => console.log(error)) 
}