interface ReadOnlyMessageProps {
  variant: 'past' | 'future';
}

export default function ReadOnlyMessage({ variant }: ReadOnlyMessageProps) {
  return (
    <div className="p-6 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 my-4">
      <p className="text-gray-500 font-medium italic">
        {variant === 'past'
          ? '⭐️ You cannot add or edit tasks for past dates.'
          : '⭐️ Future task planning is coming soon! Focus on today.'}
      </p>
    </div>
  );
}
