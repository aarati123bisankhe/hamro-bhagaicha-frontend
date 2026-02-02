import CategoryCard from "./CategoryCard";

export default function CategoriesSection() {
  return (
    <section>
      <h3 className="text-lg font-semibold text-[#2f5d3a] mb-6">
        Explore Categories
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        <CategoryCard
          title="Plants"
          subtitle="Give this plant a new home make your garden greener!"
          count="150+ varieties"
          image="/images/plantsimage1.jpg"
          sideImage="/images/cart1.png"
          
        />

        <CategoryCard
          title="Pots"
          subtitle="Style your Plant beautifully with our collection."
          count="80+ designs"
          image="/images/plotsimage.jpg"
          sideImage="/images/card2.png"
        />

        <CategoryCard
          title="Combos"
          subtitle="Give this plant a new home make your garden greener!"
          count="Plant + Pot set"
          image="/images/combosimage.jpg"
          sideImage="/images/card3.png"
        />
      </div>
    </section>
  );
}
