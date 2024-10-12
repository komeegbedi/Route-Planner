import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Route Planner',
  description: "Route Planner is a web app designed to efficiently plan the best route for picking up people from multiple addresses. It calculates the shortest or quickest route and displays it on an interactive map, saving you time and optimizing travel. Simply input the addresses, and the app handles the rest, providing a clear route and turn-by-turn directions.",
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
