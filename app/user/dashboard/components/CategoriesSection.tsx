import CategoryCard from "./CategoryCard";
import { useSiteContent } from "./contentStore";

export default function CategoriesSection() {
  const { content } = useSiteContent();
  const categories = content.dashboard.categories;

  return (
    <section>
      <h3 className="text-lg font-semibold text-[#2f5d3a] mb-6">
        {content.dashboard.categoriesTitle}
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            subtitle={category.subtitle}
            count={category.count}
            image={category.image}
            sideImage={category.sideImage}
            href={category.href}
          />
        ))}
      </div>
    </section>
  );
}
