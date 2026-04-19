export default function CCTVBrackets({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <svg className="absolute top-0 left-0 w-10 h-10 text-[#00e5ff]" viewBox="0 0 40 40" fill="none">
        <path d="M0 20 L0 0 L20 0" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      </svg>
      <svg className="absolute top-0 right-0 w-10 h-10 text-[#00e5ff]" viewBox="0 0 40 40" fill="none">
        <path d="M40 20 L40 0 L20 0" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-10 h-10 text-[#00e5ff]" viewBox="0 0 40 40" fill="none">
        <path d="M0 20 L0 40 L20 40" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-10 h-10 text-[#00e5ff]" viewBox="0 0 40 40" fill="none">
        <path d="M40 20 L40 40 L20 40" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      </svg>
      {children}
    </div>
  )
}