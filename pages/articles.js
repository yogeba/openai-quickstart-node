import { VStack, Heading, Text } from "@chakra-ui/react";

const ArticlesPage = ({ articles }) => {
  return (
    <VStack spacing="4">
      <Heading as="h1" size="lg">
        Articles
      </Heading>
      {articles.map((article) => (
        <article key={article.id}>
          <Heading as="h2" size="md">
            {article.title}
          </Heading>
          <Text>{article.summary}</Text>
        </article>
      ))}
    </VStack>
  );
};

export async function getStaticProps() {
  // Fetch list of articles from an API
  const response = await fetch("https://example.com/api/articles");
  const articles = await response.json();

  return {
    props: {
      articles,
    },
  };
}

export default ArticlesPage;
