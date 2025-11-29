'use client';

export default function ScrollingBanner() {
  const badges = [
    'CERTIFIED PROFESSIONALS',
    'LICENSED & INSURED',
    'QUALITY GUARANTEED',
    'FREE QUOTES',
    '24/7 SERVICE',
    'SATISFACTION GUARANTEED',
    'EXPERT CRAFTSMANSHIP',
  ];

  // Duplicate badges for seamless loop
  const duplicatedBadges = [...badges, ...badges];

  return (
    <section 
      className="relative border-y border-[#2f5a65]/10 overflow-hidden"
      style={{
        background: 'linear-gradient(to right, #fffffe, #fffffd, #fffffc, #fffffb, #fffffa, #fffff9, #fffff8, #fffff9, #fffffa, #fffffb, #fffffc, #fffffd, #fffffe)',
      }}
    >
      <div className="pt-4 lg:pt-5 pb-24 lg:pb-32">
        <div className="flex animate-scroll-horizontal whitespace-nowrap">
          {duplicatedBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center shrink-0"
            >
              <span className="text-sm lg:text-base font-semibold text-[#213f51] tracking-wide whitespace-nowrap px-6 lg:px-8">
                {badge}
              </span>
              <span className="text-[#2f5a65] text-lg px-2">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

