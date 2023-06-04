import dayjs from 'dayjs';
import matter from 'gray-matter';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import Subscribe from '../components/Subscribe/Subscribe';

export default function Blog({ allBlogs }: any) {
  return (
    <div className="text-black flex flex-col bg-black">
      <Header />
      <section className="text-gray-600 body-font px-4 flex flex-col justify-center">
        <div className="py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">
              The Crawford Genealogy Blog
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mb-0 text-white">
              Here you can find the latest updates and news surrounding our
              discoveries and explorations into genealogy.
            </p>
            <div className="mx-auto">
              <Subscribe />
            </div>
            <div className="lg:w-1/2 w-full flex flex-col gap-4 items-center justify-center mx-auto">
              {allBlogs &&
                allBlogs.length > 0 &&
                allBlogs.map(({ slug, frontmatter }: any) => (
                  <div
                    key={slug}
                    className="flex flex-col shadow hover:shadow-md w-full bg-[#212224] rounded-lg overflow-hidden">
                    <img
                      className="object-cover w-full h-48"
                      src={frontmatter.photoSrc}
                    />

                    <div className="relative p-4 items-center justify-center">
                      <h3 className="text-base font-medium text-white">
                        {frontmatter.title}
                      </h3>

                      <p className="mt-4 text-base text-white">
                        {dayjs(frontmatter.date).format('MMMM D, YYYY')}
                      </p>
                      <a
                        className="mt-6 group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                        href={`/blog/${slug}`}
                        target="_blank"
                        rel="noreferrer">
                        <span className="rounded-md absolute inset-0 border border-indigo-500 group-active:border-indigo-500"></span>
                        <span className="rounded-md block border border-indigo-500 bg-indigo-500 px-12 py-3 transition-transform active:border-indigo-500 active:bg-indigo-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                          {'Read More'}
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const webpackContext = require.context('../posts', true, /\.md$/);
  const keys = webpackContext.keys();

  const values = keys.map(webpackContext) as any;
  const posts = keys.map((key: string, index: string | number) => {
    const slug = key
      .replace(/^.*[\\\/]/, '')
      .split('.')
      .slice(0, -1)
      .join('.');

    const value = values[index];
    const document = matter(value.default);

    return {
      frontmatter: document.data,
      markdownBody: document.content,
      slug,
    };
  });

  return {
    props: {
      allBlogs: posts.filter(function (item, pos) {
        return posts.map(mapItem => mapItem.slug).indexOf(item.slug) === pos;
      }),
    },
  };
}
