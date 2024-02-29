import Link from "next/link";
import { Blogcard } from "./utils/interface";
import { client, urlFor } from "./utils/sanity";
import Image from "next/image";

async function getBlogs() {
  //uery to fetch the blogs from sanity studio
  const query = `*[_type == "blog"] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
  }`;
  const data = await client.fetch(query);
  return data;
}
//revalidate the data after 30 seconds
export const revalidate = 30;

export default async function Home() {
  //call the getBlogs function to get the blogs data.
  const data: Blogcard[] = await getBlogs();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {/*Display the blog cards here*/}
      {data.map((post, idx) => (
        <div
          key={idx}
          className="max-w-md bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex flex-col"
        >
          <Link href={`/blog/${post.currentSlug}`}>
            <div className="relative h-56 overflow-hidden">
              <Image
                className="object-cover w-full h-full"
                src={urlFor(post.titleImage).toString()}
                alt="Blog Image"
                layout="fill"
              />
            </div>
          </Link>
          <div className="flex flex-col justify-between p-5 flex-grow">
            <div>
              <Link href={`/blog/${post.currentSlug}`}>
                <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {post.title}
                </h5>
              </Link>
              <p className="mb-3 text-gray-700 dark:text-gray-400">
                {post.smallDescription}
              </p>
            </div>
            <div className="text-start">
              <Link
                href={`/blog/${post.currentSlug}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-auto"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
