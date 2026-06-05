"use client";

interface CharacterPortraitProps {
  name: string;
  alt?: string;
  className?: string;
}

export function CharacterPortrait({ name, alt, className }: CharacterPortraitProps) {
  return (
    <img
      key={name}
      src={`/assets/images/character/${name}.png`}
      alt={alt ?? name}
      className={className}
      draggable={false}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
