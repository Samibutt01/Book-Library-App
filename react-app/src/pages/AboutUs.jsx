export default function AboutUs() {
    return (
      <div className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:text-center">
            <h2 className="text-base text-orange-600 dark:text-orange-400 font-semibold tracking-wide uppercase">About Us</h2>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Story
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 lg:mx-auto">
              Discover the passion behind BookLibrary and our mission to connect readers with great books.
            </p>
          </div>
  
          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Our Mission</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  To create the most comprehensive and accessible book database for readers worldwide. We believe in the power of literature to transform lives and want to make discovering great books easier than ever.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Our Vision</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  To become the go-to platform for book lovers, where they can explore, discover, and connect with literature that inspires them. We aim to build a global community of readers and authors.
                </p>
              </div>
            </div>
  
            <div className="mt-10 bg-gradient-to-r from-orange-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-lg shadow">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">The Team</h3>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                BookLibrary was founded by a team of book enthusiasts, developers, and designers who share a common passion for literature and technology. Our diverse team brings together expertise from various fields to create the best experience for our users.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {['Sami Butt'].map((name) => (
                  <div key={name} className="text-center">
                    <div className="h-16 w-16 mx-auto rounded-full bg-orange-100 dark:bg-gray-700 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Co-Founder</p>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Join Our Community</h3>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                We're always looking for passionate individuals to join our team or contribute to our platform. Whether you're a developer, designer, or book lover, we'd love to hear from you.
              </p>
              <div className="mt-5">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }