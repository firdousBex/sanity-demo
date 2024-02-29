import { Blog } from "@/app/utils/interface";
import { client, urlFor } from "@/app/utils/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

//revalidate data after 30 seconds
export const revalidate = 30;
async function getBlog(slug: string) {
  const query = `
  *[_type == "blog" && slug.current == '${slug}']{
    "currentSlug": slug.current,
    title, 
    content,
    titleImage
}[0]`;
  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: Blog = await getBlog(params.slug);
  return (
    <div className="flex items-center justify-center flex-col  mt-8 border-2">
      <h1 className="text-center">
        <span className="block text-base text-center font-semibold tracking-wide mt-5 text-blue-600 uppercase">
          Bex Money - Blog
        </span>
        <span className="mt-4 text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).toString()}
        height={300}
        width={400}
        alt="Blog Image"
        priority
      />

      <div className="mt-16 prose prose-blue prose-xl prose-li:marker:text-blue-500 ">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
