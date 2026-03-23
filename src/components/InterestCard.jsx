export default function InterestCard({ icon, title, description }) {
  return (
    <div className="flex flex-row md:flex-col items-center md:text-center border border-primary-100/20 rounded-2xl p-6 gap-4">
      <div
        className="w-14 h-14 rounded-full bg-primary-100/10 border border-primary-100/20 flex items-center justify-center text-2xl shrink-0"
        role="img"
        aria-label={title}
      >
        <span aria-hidden="true">{icon}</span>
      </div>
      <div className="text-left md:text-center">
        <h3 className="font-Assistant font-bold text-[1.0625rem] leading-snug mb-1">
          {title}
        </h3>
        <p className="font-Assistant text-[1rem] leading-[1.625] text-primary">
          {description}
        </p>
      </div>
    </div>
  );
}
