import { useEffect, useRef } from 'react';
import './AdBanner.css';

const AD_CLIENT = 'ca-pub-3917556333305409';
const AD_SLOTS = {
  slot1: '8373360404',
  slot2: '3121033729',
  slot3: '9703188714',
};

/**
 * Google AdSense ad unit component.
 * @param {'horizontal'|'vertical'|'square'|'in-feed'|'anchor'} variant
 * @param {'slot1'|'slot2'|'slot3'} slot - Which ad slot to use
 * @param {string} className - Additional CSS class
 */
export default function AdBanner({ variant = 'horizontal', slot = 'slot1', className = '' }) {
  const adRef = useRef(null);
  const pushed = useRef(false);
  const adSlot = AD_SLOTS[slot] || AD_SLOTS.slot1;

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (adRef.current && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      }
    } catch {
      // AdSense not loaded or ad blocker active
    }
  }, []);

  if (variant === 'anchor') {
    return (
      <div className={`ad-banner ad-anchor ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
          ref={adRef}
        />
      </div>
    );
  }

  const formatMap = {
    horizontal: { format: 'auto', style: { display: 'block', minHeight: '90px' } },
    vertical: { format: 'auto', style: { display: 'block', minHeight: '250px' } },
    square: { format: 'rectangle', style: { display: 'inline-block', width: '300px', height: '250px' } },
    'in-feed': { format: 'fluid', style: { display: 'block' } },
  };

  const config = formatMap[variant] || formatMap.horizontal;

  return (
    <div className={`ad-banner ad-${variant} ${className}`}>
      <ins
        className="adsbygoogle"
        style={config.style}
        data-ad-client={AD_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={config.format}
        data-full-width-responsive="true"
        ref={adRef}
      />
    </div>
  );
}
