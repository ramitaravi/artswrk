interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isOwn: boolean;
  senderName?: string;
  senderAvatar?: string;
}

export default function MessageBubble({ content, timestamp, isOwn, senderName, senderAvatar }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        {!isOwn && (
          <div className="flex-shrink-0 mr-3">
            {senderAvatar ? (
              <img
                src={senderAvatar}
                alt={senderName}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm text-gray-500">
                  {senderName?.[0]}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Message Content */}
        <div>
          {!isOwn && senderName && (
            <div className="text-sm text-gray-500 mb-1">{senderName}</div>
          )}
          <div className="flex flex-col">
            <div
              className={`rounded-2xl px-4 py-2 ${
                isOwn
                  ? 'bg-[#ec008c] text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-base">{content}</p>
            </div>
            <span className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
              {timestamp}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 