"use client";

import Link from "next/link";
import Image from "next/image";
import type { Address } from "viem";

interface ProviderCardProps {
  providerAddress: Address;
  name?: string;
  description?: string;
  rating?: number;
  price?: string;
  imageUrl?: string;
}

export function ProviderCard({
  providerAddress,
  name,
  description,
  rating,
  price,
  imageUrl,
}: ProviderCardProps) {
  const displayName = name || `${providerAddress.slice(0, 6)}...${providerAddress.slice(-4)}`;

  return (
    <Link href={`/book/${providerAddress}`} className="card block">
      <div className="aspect-video bg-gradient-to-br from-dark-accent/20 to-dark-accent/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={displayName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="text-4xl text-dark-accent/50">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg text-dark-text">{displayName}</h3>
          {rating && (
            <div className="flex items-center gap-1 text-dark-warning">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm">{rating}</span>
            </div>
          )}
        </div>
        
        {description && (
          <p className="text-sm text-dark-textMuted line-clamp-2">{description}</p>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <p className="font-mono text-xs text-dark-textMuted">
            {providerAddress.slice(0, 8)}...{providerAddress.slice(-6)}
          </p>
          {price && (
            <span className="text-dark-accent font-semibold">{price}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
