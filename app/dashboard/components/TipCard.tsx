interface TipCardProps {
  title: string;
  subtitle: string;
  tip: string;
}

export default function TipCard({ title, subtitle, tip }: TipCardProps) {
  return (
    <div className="bg-green-light rounded-xl p-4 flex items-center gap-4">
      <span className="text-2xl">💡</span>
      <div>
        <h3 className="font-semibold text-green-dark">{title}</h3>
        <h4 className="font-medium">{subtitle}</h4>
        <p className="text-gray-700">{tip}</p>
      </div>
    </div>
  );
}
