import matter from 'gray-matter';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import Subscribe from '../components/Subscribe/Subscribe';

function reformatDate(fullDate: string | number | Date) {
  const date = new Date(fullDate);
  return date.toDateString().slice(4);
}

export default function Blog({ allBlogs }: any) {
  return (
    <div className="text-black flex flex-col h-screen justify-between bg-black">
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">
              The Crawford Genealogy Blog
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mb-0 text-white">
              Here you can find the latest updates and news surrounding our
              discoveries and explorations into genealogy.
            </p>
            <div className="lg:w-1/2 mx-auto">
              <Subscribe />
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 gap-4 items-center justify-center mx-auto ">
              {allBlogs &&
                allBlogs.length > 1 &&
                allBlogs.map(({ slug, frontmatter }: any) => (
                  <a key={slug} href={`/blog/${slug}`}>
                    <div className="flex flex-col shadow hover:shadow-md w-full bg-[#212224] rounded-lg overflow-hidden cursor-pointer">
                      <img
                        className="object-cover w-full h-48"
                        src={frontmatter.photoSrc}
                      />

                      <div className="relative p-4 items-center justify-center">
                        <h3 className="text-base md:text-xl font-medium text-white">
                          {frontmatter.title}
                        </h3>

                        <p className="mt-4 text-base md:text-lg text-white">
                          {reformatDate(frontmatter.date)}
                        </p>
                      </div>
                    </div>
                  </a>
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
