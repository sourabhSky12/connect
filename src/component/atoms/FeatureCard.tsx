interface FeatureCardProps {
  title: string;
  description?: string;
  list?: string[];
  bgColor?: string;
}

const FeatureCard = ({
  title,
  description,
  list,
  bgColor = 'bg-white text-black',
}: FeatureCardProps) => {
  return (
    <div className={` p-12 flex flex-col justify-between h-full ${bgColor}`}>
      <div>
        <h3 className="text-[24px] font-semibold mb-3">{title}</h3>
        {description && <p className="text-sm md:text-base leading-relaxed">{description}</p>}
      </div>
      {list && (
        <ul className="space-y-2 mt-4 text-sm">
          {list.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-green-400 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.999 7.999a1 1 0 01-1.414 0L3.293 10.293a1 1 0 011.414-1.414L8 12.172l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeatureCard;
