import {
  Flex,
  Text,
  Box,
  Divider,
  Textarea,
  Button,
  Spinner,
  Center,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Container } from '@/layout/container';
import useSWR from 'swr';
import { fetchPostById } from '@/lib/posts';
import { fetchReplies, postReply } from '@/lib/replies';
import { useState } from 'react';
import { userStore } from '@/lib/store';
///
export default function PostPage() {
  const [value, setValue] = useState('');
  const user = userStore((state) => state.user);
  const toast = useToast();
  const router = useRouter();
  ///
  const { id } = router.query;
  const postApiUrl = `${process.env.NEXT_PUBLIC_API_URL!}/api/v1/posts/${id}`;
  const replyApiUrl = `${process.env
    .NEXT_PUBLIC_API_URL!}/api/v1/replies/${id}`;
  ///
  const { data: post, mutate: mutatePost } = useSWR(postApiUrl, fetchPostById);
  const {
    data: replies,
    isValidating: isValidatingReplies,
    mutate,
  } = useSWR(replyApiUrl, fetchReplies);
  ///

  const handleInputChange = (e: any): void => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  const onSubmit = async (): Promise<void> => {
    if (user && value) {
      const result = await postReply({
        body: value,
        author: user.id,
        postId: id as string,
      });
      if (result) {
        setValue('');
        toast({
          title: 'Reply created',
          status: 'success',
          duration: 7000,
        });
        mutate([...(replies ?? []), result]);
      }
    }
  };
  ///
  return (
    <Container title={'Post'}>
      <Box position="sticky" p="10">
        <Text fontWeight="bold" fontSize="xl">
          {post?.title}
        </Text>
        <Text fontSize="md">{post?.body}</Text>
        <Text textAlign="right" fontSize="xs">
          ~{post?.author}
        </Text>
      </Box>
      <Divider />
      <Box
        px="10"
        py="5"
        experimental_spaceY="2"
        alignContent="end"
        alignItems="end"
        flexDir="column"
        placeContent="end"
      >
        <Textarea
          borderRadius="lg"
          value={value}
          onChange={handleInputChange}
          placeholder="Write something ..."
          size="sm"
          type="submit"
        />
        <Button
          onClick={onSubmit}
          alignSelf="end"
          placeSelf="end"
          type="submit"
        >
          Submit
        </Button>
      </Box>

      <Flex
        flexDir="column"
        align="stretch"
        px="10"
        py="5"
        experimental_spaceY="5"
      >
        {!isValidatingReplies ? (
          replies?.map((e) => (
            <Box key={e.ID} borderWidth="1" borderColor="gray">
              <Text fontSize="x-small">{e.author}</Text>
              <Text fontSize="md">{e.body}</Text>
              <Divider borderColor="gray.300" py="2" />
            </Box>
          ))
        ) : (
          <Center>
            <Spinner size="xl" />
          </Center>
        )}
      </Flex>
    </Container>
  );
}
