import React from 'react'

const Footer = () => {
  return (
<footer className="bg-gray-200 text-gray-800 rounded p-10 flex flex-col items-center space-y-6">
  <aside className="text-sm text-center">
    <p>&copy; {new Date().getFullYear()} - All rights reserved praveen kumar kaikala</p>
  </aside>
</footer>

  )
}

export default Footer