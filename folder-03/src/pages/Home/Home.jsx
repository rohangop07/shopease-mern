import "./Home.css";
import Button from "../../components/ui/Button";


import categories from "../../constants/categories";
import CategoryCard from "../../components/category/CategoryCard";





function Home() {
  return (
  
    <section className="hero">

      <div className="hero-content">

        <h1>
          Shop Smarter,
          <br />
          Live Better
        </h1>

        <p>
          Discover thousands of quality products at the best prices.
          Fast delivery, secure payment, and an amazing shopping experience.
        </p>

        <Button
          text="Shop Now"
          onClick={() => alert("Products page will be added soon!")}
        />

      </div>

      <div className="hero-image">

        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
          alt="Shopping"
        />




        <section className="categories">

    <h2>Shop By Category</h2>

    <div className="category-grid">

        {categories.map((category) => (

            <CategoryCard
                key={category.image}
                category={category}
            />

        ))}

       
      </div>

    </section>

  

   </div>
</section>

  );
}

export default Home;

