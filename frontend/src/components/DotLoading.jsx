import React from 'react'

const DotLoading = () => {
  return (
  <div class="flex space-x-2 py-2">
  <div class="w-1 h-1 bg-amber-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
  <div class="w-1 h-1 bg-amber-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
  <div class="w-1 h-1 bg-amber-300 rounded-full animate-bounce"></div>
</div>
  )
}

export default DotLoading