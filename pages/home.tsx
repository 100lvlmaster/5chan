import { PostFormButton } from '@/components/post_form_button';
import { Container } from '@/layout/container';
import { fetchPosts } from '@/lib/posts';
import { Post } from '@/lib/types';
import { Box, Center, Flex, Spinner, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import useSWR from 'swr';

export default function Home() {
  const apiUrl = `/posts`;
  const { data, mutate } = useSWR(apiUrl, fetchPosts);
  const onPostHandler = (e: Post) => {
    if (data) {
      mutate([...data, e]);
    }
  };
  ///
  return (
    <Container
      title={'Home'}
      navTrailing={<PostFormButton onSubmit={onPostHandler} />}
    >
      <Flex
        w="full"
        align="stretch"
        flexDir="column"
        px="10"
        py="5"
        experimental_spaceY="5"
      >
        {data ? (
          data.map((e) => (
            <NextLink href={`/posts/${e.ID}`} key={e.ID}>
              <a>
                <Box>
                  <Text fontWeight="bold" fontSize="xl">
                    {e.title}
                  </Text>
                  <Text fontSize="small">{e.body}</Text>
                  <Text textAlign="right" fontSize="xs">
                    ~{e.author}
                  </Text>
                </Box>
              </a>
            </NextLink>
          ))
        ) : (
          <Center py="20">
            <Spinner size="xl" />
          </Center>
        )}
      </Flex>
    </Container>
  );
}
