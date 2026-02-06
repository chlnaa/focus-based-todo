interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return <p className="text-lg font-medium">{message}</p>;
}
