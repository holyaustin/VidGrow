/* pages/_app.js */
import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div >
      <nav className="border-b p-6 bg-gradient-to-r from-purple-500 to-pink-500">
        <p className="text-6xl font-bold">VidGrow</p> 
        <p className="font-bold text-color-white">..growing the community of developers</p>
        <div className="fflex mt-4 font-bold font-sans ml-8 text-center">
          <Link href="/explore">
            <a className="mr-4 text-white text-2xl">
              Home
            </a>
          </Link>
          <Link href="/upload-video">
            <a className="mr-6 text-white text-2xl">
              Upload-Video
            </a>
          </Link>
          <Link href="/go-live">
            <a className="mr-6 text-white text-2xl">
              Stream-Live
            </a>
          </Link>
          <Link href="/community">
            <a className="mr-6 text-white text-2xl">
              Our-Community
            </a>
          </Link>

          <Link href="/">
            <a className="mr-6 text-white text-2xl">
              login
            </a>
          </Link>

          <Link href="/">
            <a className="mr-6 text-white text-2xl">
              Create Profile
            </a>
          </Link>




        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp