import "./CategoryCard.css";

function CategoryCard({ category }){
    return (
        <div className ="category-card">
            <div className ="category-icon">
                {category.image}
            </div>

<h3>{category.title}</h3>
        </div>
    );
}

export default CategoryCard;