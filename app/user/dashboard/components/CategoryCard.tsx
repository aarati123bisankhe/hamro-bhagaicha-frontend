interface Props {
  title: string;
  subtitle: string;
  count: string;
  image: string;
  sideImage: string;
}

export default function CategoryCard({
  title,
  subtitle,
  count,
  image,
  sideImage,
}: Props) {
  return (
    <div className="bg-[#e7efdf] rounded-2xl shadow overflow-hidden">
      <img src={image} alt={title} className="h-44 w-full object-cover" />

      <div className="p-5 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-[#2f5d3a]">{title}</h4>
            <p className="text-sm text-gray-700">{subtitle}</p>
          </div>
          <img
            src={sideImage}
            alt={`${title} side`}
            className="w-9 h-9 object-cover rounded-md ml-4"
          />
        </div>

        <div className="flex justify-between items-center pt-3 text-sm">
          <span className="text-[#2f5d3a]">{count}</span>
          <span className="font-semibold text-[#2f5d3a] cursor-pointer">
            Explore →
          </span>
        </div>
      </div>
    </div>
  );
}


