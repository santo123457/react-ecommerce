export const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to propagate it to the calling code
  }
};

// export const fetchProducts = () => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch("http://localhost:3000/products");
//       if (!response.ok) {
//         throw new Error("Failed to fetch products");
//       }
//       const data = await response.json();
//       dispatch({ type: 'products/fetchSuccess', payload: data }); // Dispatch the data as a payload
//     } catch (error) {
//       console.error(error);
//       dispatch({ type: 'products/fetchFailure', payload: error.message }); // Dispatch an error action
//     }
//   };
// };

export const fetchProductsByFilters = async (filter, sort) => {
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCaegoryValues = categoryValues[categoryValues.length-1];
      queryString += `${key}=${lastCaegoryValues}&`;
    }
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`;
  }
  try {
    // Construct the API URL with the query parameters
    const apiUrl = `http://localhost:3000/products?${queryString}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
