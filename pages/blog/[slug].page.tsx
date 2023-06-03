import matter from 'gray-matter';
import { Header } from '../../components/Header/Header';
import glob from 'glob';
import ReactMarkdown from 'react-markdown';
import style from '../../styles/markdown-styles.module.css';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Footer } from '../../components/Footer/Footer';

export default function Blog({ frontmatter, markdownBody, siteTitle }: any) {
  //const post = allPostsData.find(post => post.id === id) as PostData;
  return (
    <div className="text-black flex flex-col h-screen justify-between bg-black">
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <div className="text-white mx-auto">
              <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
                <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl text-white">
                  {frontmatter.title}
                </h1>
                <Image
                  alt="header"
                  src={frontmatter.photoSrc}
                  width={800}
                  height={400}
                />
                <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
                  <div className="flex items-center mt-6">
                    <Image
                      alt="David Crawford"
                      height={44}
                      width={44}
                      src="/curator.jpg"
                      className="rounded-full"
                    />
                    <p className="ml-2 text-sm text-gray-300">
                      {'David Crawford / '}
                      {dayjs(frontmatter.date).format('MMMM D, YYYY')}
                    </p>
                  </div>
                </div>
                <div className="w-full mt-4 prose-dark max-w-none text-left">
                  <ReactMarkdown className={style.reactMarkDown}>
                    {markdownBody}
                  </ReactMarkdown>
                </div>
                <div className="mt-8">{/* <Subscribe /> */}</div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export async function getStaticProps(context: { params: { slug: any } }) {
  // extracting the slug from the context
  const { slug } = context.params;

  //const config = await import(`../../data/config.json`);

  // retrieving the Markdown file associated to the slug
  // and reading its data
  const content = await import(`../../posts/${slug}.md`);
  const data = matter(content.default);

  return {
    props: {
      siteTitle: 'config.title',
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}

export async function getStaticPaths() {
  // getting all .md files from the posts directory
  const blogs = glob.sync(`posts/**/*.md`);

  // converting the file names to their slugs
  const blogSlugs = blogs.map(file =>
    file.split('/')[1].replace(/ /g, '-').slice(0, -3).trim(),
  );

  // creating a path for each of the `slug` parameter
  const paths = blogSlugs.map(slug => {
    return { params: { slug: slug } };
  });

  return {
    paths,
    fallback: false,
  };
}
