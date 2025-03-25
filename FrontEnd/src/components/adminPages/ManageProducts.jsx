import React, { useEffect, useState } from "react";
import ProductService from "../service/ProductService";
import Button from "../common/Button";
import Modal from "../common/Modal";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [error, setError] = useState(null);

  const getProducts = async () => {
    setError(null);
    const result = await ProductService.getAllProducts();
    if (result.error) {
      setError(result.error);
    } else {
      setProducts(result);
    }
  };

  const getProductsByName = async (searchTerm) => {
    setError(null);
    const result = await ProductService.getProductByName(searchTerm);
    if (result.error) {
      setError(result.error);
    } else {
      setProducts(result);
    }
  };

  const deleteProductService = async (idProduct) =>{
    setError(null);
    const result = await ProductService.deleteProduct(idProduct);
    if(result.error){
      setError(result.error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);


  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      getProductsByName(debouncedSearch);
    } else {
      getProducts();
    }
  }, [debouncedSearch]);

  const deleteProduct = (index,idProduct) => {
    deleteProductService(idProduct);
    const updateProducts = products.filter((_,i)=> i != index); 
    setProducts(updateProducts);
  };

  const editProduct = (idProduct) => {
    alert("I'm gonna edit this idProduct: " + idProduct); //form and new set
  };



  const handleEditProduct = () => {
    /* change state to apper and create a toogle state */ 
  }


  return (
    <>
      <div className="py-4 sm:py-6 font-sans font-medium">
        <h1 className="text-center text-4xl text-red-600 mb-3 font-serif">
          Manage Products
        </h1>
        <div className="text-center">
          <label className="text-xl mr-4">Search by product name: </label>
          <input
            type="text"
            name="searchBox"
            className=" w-40 mt-1 mb-5 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg  border-gray-300 focus:outline-none focus:border-red-800  border-2 "
            id="searchBox"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {error && (
          <Modal error={error} onClick={()=>setError(null)}></Modal>
        )}

        <h2 className="mt-8 font-bold text-cyan-600 text-3xl">Products </h2>
        <div className="overflow-x-auto mt-1">
          <table className="table-auto w-full shadow-lg rounded-lg text-center  border  border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-2 sm:px-4 md:px-6 text-gray-600 font-bold uppercase">
                  ID
                </th>
                <th className="py-2 px-2 sm:px-4 md:px-6 text-gray-600 font-bold uppercase">
                  Name
                </th>
                <th className="py-2 px-2 sm:px-4 md:px-6 text-gray-600 font-bold uppercase">
                  Price
                </th>
                <th className="py-2 px-2 sm:px-4 md:px-6 text-gray-600 font-bold uppercase">
                  Stock
                </th>
                <th className="py-2 px-2 sm:px-4 md:px-6 text-gray-600 font-bold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product,index) => (
                <tr key={index}>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {product.id}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {product.name}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {product.price}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {product.stock}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <Button onClick={() => deleteProduct(index,product.id)} variant="danger">Delete</Button>
                    <Button onClick={() => editProduct(index,product.id)} variant="success">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <Button onClick={() => createProduct()} variant="primary">Create new Product</Button>

        {/*edit */}
        <div className="">
        <form onSubmit={handleEditProduct}>
          
            {/*take values e.target.value and send and change toogle status isHidden*/}
          <button type="submit">Save</button>
        </form>
        </div>

      </div>
    </>
  );
};

export default ManageProducts;
