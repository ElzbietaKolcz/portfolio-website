export default function InterestCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center border border-primary-100/20 rounded-2xl p-6 gap-4">
      <div className="w-14 h-14 rounded-full bg-primary-100/10 border border-primary-100/20 flex items-center justify-center text-2xl shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-Assistant font-bold text-[1.0625rem] leading-snug mb-1">
          {title}
        </p>
        <p className="font-Assistant text-[1rem] leading-[1.625] text-primary">
          {description}
        </p>
      </div>
    </div>
  );
}
