export default function NoMessages({ hasMessage }) {
  return !hasMessage ? (
    <div className="text-center text-muted">
      No messages yet. Start chatting!
    </div>
  ) : null;
}
