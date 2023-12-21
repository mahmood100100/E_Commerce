import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Products.css";
import { Form, Link } from "react-router-dom";
export default function Products() {
  let [products, setProducts] = useState([]);
  let [pagesNumber, setPagesNumber] = useState(0);
  let [loading, setLoading] = useState(false);
  let [currentPage , setCurrentPage] = useState(0);
  let [minPrice , setMinPrice] = useState('');
  let [maxPrice , setMaxPrice] = useState('');
  const fetchProducts = async (currentPage) => {
    setLoading(true);
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=3`
    );
    setProducts(data.products);
    setLoading(false);
    console.log(data.products);
  };

  const handlePageClick = (data) => {
     setCurrentPage( data.selected + 1);
    fetchProducts(data.selected + 1);
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?page=1&limit=3`
        );
        setPagesNumber(data.total);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  let average_rating = (reviews) => {
    let ratings = 0;
    reviews.map((review) => {
      ratings += review.rating;
    });
    const divs = Array.from(
      { length: ratings / reviews.length },
      (_, index) => (
        <span className="me-2 text-danger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={16}
            width={18}
            fill="#ffdd00ec"
            viewBox="0 0 576 512"
          >
            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </span>
      )
    );
    return divs;
  };

  if (loading) {
  }
  let sortProducts = async (str) => {
    console.log(str);
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=3&sort=${str}`
    );
    setProducts(data.products);
    setLoading(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!(maxPrice =='' && minPrice =='')) {
        if((!maxPrice == '') && minPrice == '') {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=3&price[lte]=${maxPrice}`
          );
          setProducts(data.products);
          setLoading(false);
        }else if((!minPrice == '') && maxPrice == ''){
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=3&price[gte]=${minPrice}`
          );
          setProducts(data.products);
          setLoading(false);
        }else{
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=3&price[gte]=${minPrice}&price[lte]=${maxPrice}`
          );
          setProducts(data.products);
          setLoading(false);
        }
    }
    //console.log(minPrice, maxPrice)
  }

  return (
    <>
      <div className=" overflow-hidden">
        <div className="row">
          <div className="sidbar col-md-2">
            <Form onSubmit={handleSubmit}>
            <div className="minPrice">
               <label htmlFor="minPrice">minPrice</label>
              <input type="number" id="minPrice" value={minPrice} onChange={(e) =>setMinPrice(e.target.value)} />
            </div>
            <div className="maxPrice">
               <label htmlFor="maxPrice">maxPrice</label>
              <input type="number" id="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <button type="submit" >search</button>
            </Form>
            <ul className="sort mt-3">
        <li className="dropdown">
        <a className="btn btn-primary  dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          sort by
        </a>
        <ul className="dropdown-menu ">
        <li><Link className="dropdown-item" to="" onClick={()=>sortProducts("price")}>Price from low to high</Link></li>
          <li><Link className="dropdown-item" to="" onClick={()=>sortProducts("-price")}>price from high to low</Link></li>
          <li><Link className="dropdown-item" to="" onClick={()=>sortProducts("name")}>name</Link></li>
          <li><Link className="dropdown-item" to="" onClick={()=>sortProducts("-name")}>-name</Link></li>
          <li><Link className="dropdown-item" to="" onClick={()=>sortProducts("discount")}>discount</Link></li>
          <li><Link className="dropdown-item" to="" onClick={()=>sortProducts("-discount")}>-discount</Link></li>
        </ul>
      </li>
        </ul>
          </div>
          <div className="content col-md-10">
            <div className="row my-5">
              {!loading ? (
                products ? (
                  products.map((product) => {
                    return (
                      <div className="col-md-4">
                        <Link
                          className=" text-decoration-none"
                          to={`/product/${product._id}`}
                        >
                          <div
                            className="card h-100 text-center"
                            key={product._id}
                            style={{ width: "20rem" }}
                          >
                            <div className="card-header p-0 position-relative">
                              <img
                                src={product.mainImage.secure_url}
                                className="border border-1 w-100"
                                alt=""
                                style={{ height: "20rem" }}
                              />
                              <button
                                type="button"
                                className="btn position-absolute bottom-0 start-0 translate-translate-middle-x w-100"
                              >
                                see details
                              </button>
                            </div>
                            <div class="card-body p-0 p-2">
                              <p class="card-title">{product.name}</p>
                              <p class="card-text">{`$${product.price}`}</p>
                              <div className="reviews">
                                <div className="rating">
                                  {product.reviews.length ? (
                                    average_rating(product.reviews)
                                  ) : (
                                    <h2 className="text-info mt-3">
                                      no ratings available
                                    </h2>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  "no products"
                )
              ) : (
                <div className="overlay">
                  <p className=" position-absolute top-50 start-50 translate-middle p-4 bg-black text-white border">
                    Loading ...
                  </p>
                </div>
              )}
            </div>

            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pagesNumber / 3}
              onPageChange={handlePageClick}
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </>
  );
}
