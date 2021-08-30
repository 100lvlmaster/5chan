import { Container } from '@/layout/container';
import { Flex, Text, Box, Spinner, Center } from '@chakra-ui/react';
import useSWR from 'swr';
import { fetchPosts } from '@/lib/posts';
import NextLink from 'next/link';
import { PostFormButton } from '@/components/post_form_button';
import { Post } from '@/lib/types';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL!}/api/v1/posts`;
  const { data, mutate, error } = useSWR(apiUrl, fetchPosts);
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
