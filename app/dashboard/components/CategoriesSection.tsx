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
        />

        <CategoryCard
          title="Pots"
          subtitle="Style your Plant beautifully with our collection."
          count="80+ designs"
          image="/images/plotsimage.jpg"
        />

        <CategoryCard
          title="Accessories"
          subtitle="Give this plant a new home make your garden greener!"
          count="150+ varieties"
          image="/images/combosimage.jpg"
        />
      </div>
    </section>
  );
}
