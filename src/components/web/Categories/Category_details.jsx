import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

function Category_details() {
  const { categoryID } = useParams();

  const getCategoryDetails = async () => {
    const { data } = await axios.get(
      import.meta.env.VITE_API_URL + `/products/category/${categoryID}`
    );
    return data.products;
  };

  const { data, isLoading } = useQuery("CategoryDetails", getCategoryDetails);

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  return (
    <div className="products overflow-hidden">
      <div className="container">
        <div className="row">
          {data.length ? (
            data.map((category) => {
              return (
                <div className="col-md-4">
                  <div
                    className="category_details card h-100"
                    style={{ width: "25rem" }}
                    key={category._id}
                  >
                    <Link className="text-decoration-none" to={`/product/${category._id}`}>
                      <div className="card-image">
                        <img
                          src={category.mainImage.secure_url}
                          className=" object-fit-fill w-100"
                          style={{ height: "25rem" }}
                        />
                      </div>
                      <h3>{category.name}</h3>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>no category details</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category_details;
